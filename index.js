const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const cron = require("node-cron");
require("dotenv").config();

global.log = require('./src/utils/log');
global.fc = require('./src/utils/fc');
global.data = require("./config.json");

const db = require("./src/api/db");

const client = new Client({
  shards: 0,
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
  ]
});

client.commands = new Collection();
const commandFoldersPath = path.join(__dirname, "src/commands");
const commandFolders = fs.readdirSync(commandFoldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(commandFoldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

const eventFoldersPath = path.join(__dirname, "src/events");
const eventFolders = fs.readdirSync(eventFoldersPath);

for (const folder of eventFolders) {
  const eventsPath = path.join(eventFoldersPath, folder);
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));
    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const event = require(filePath);
      if (event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
      } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
      }
    }
}

const taskFoldersPath = path.join(__dirname, "src/tasks");
const taskFiles = fs
  .readdirSync(taskFoldersPath)
  .filter((file) => file.endsWith(".js"));

for (const file of taskFiles) {
  const filePath = path.join(taskFoldersPath, file);
  const task = require(filePath);

  cron.schedule(task.schedule, () => task.execute(client));
}

// Login
client.login(process.env.TOKEN);

["SIGINT", "SIGTERM", "SIGUSR1", "SIGUSR2", "unhandledRejection", "uncaughtException"].forEach((event) => {
  process.on(event, async (error) => {
    console.log("Shutting down...");
    if (error instanceof Error) {
      await global.log.dev(error.message || "An error occurred.");
      console.error(error);
    }
    await global.log.dev("Redémarrage du bot...");
    await client.destroy();
    process.exit(0);
  });
});
