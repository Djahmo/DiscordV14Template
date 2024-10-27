const { Events, ActivityType } = require("discord.js");

const db = require("../../api/db");

module.exports = {
  name: Events.ClientReady,
  once: true,
  async execute(client) {
    const guildId = process.env.GUILDID;
    const botName = process.env.BOTNAME;
    const guild = client.guilds.cache.get(guildId);
    if(!guild) return console.log("Server not found with ID : " + guildId);
    console.log("Server found with id : " + guildId);
    console.log(`${botName} online !`);
    await global.log.dev(`${botName} is online !`);
    client.user.setActivity(`${botName} work hard !`, { type: ActivityType.Watching });
    await db.initDB(client)
  },
};
