const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const commandName = "command2";
const commandInfo = "command short description";
const commandDescription = "command long description";

module.exports = {
  info: { commandName, commandInfo, commandDescription },
  data: new SlashCommandBuilder()
    .setName(commandName)
    .setDescription(commandInfo)
    .addIntegerOption((option) =>
      option
        .setName("option1")
        .setDescription("option 1 description")
        .setRequired(true)
    ),
  async execute(interaction) {
    const embed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle(`Title`)
        .setDescription(`Description`);
    interaction.reply({ embeds: [embed]});
  },
};
