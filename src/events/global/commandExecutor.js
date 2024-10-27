const { Events } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(client, interaction) {
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) return console.error(`No command matching ${interaction.commandName} was found.`);
      
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
      }
    } 
  },
};
