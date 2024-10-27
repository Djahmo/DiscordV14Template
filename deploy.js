const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
require("dotenv").config();
const db = require("./src/api/db");

global.data = require("./config.json");

const commands = [];
const commandsInfo = [];
const foldersPath = path.join(__dirname, "src/commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command && "info" in command) {
      commands.push(command.data.toJSON());
      commandsInfo.push([command.info, folder]);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
  try {
    console.log(`Started setup database.`);
    await db.initDB();
    console.log(`Successfully setup database.`);
  }
  catch (error) {
    console.error(error);
  }
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID),
      { body: commands }
    );
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } 
  catch (error) {
    console.error(error);
  }

  try {
    console.log(`Started refreshing ${commandsInfo.length} application (/) commands info on database.`);
    for (const commandInfo of commandsInfo) {
      // commandInfo[0] is the command info
      // exemple of adding command info to database
      // await db.addCommand(commandInfo[0]);
    }
    console.log(`Successfully reloaded ${commandsInfo.length} application (/) commands info on database.`);
  }
  catch (error) {
    console.error(error);
  } 
})();
