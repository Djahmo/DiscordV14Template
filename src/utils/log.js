const { EmbedBuilder } = require("discord.js");
const fc = require("./fc");
const axios = require("axios");

const log = async (channel, action) => {
    if (!channel) return;

    const embed = new EmbedBuilder()
    .setColor(0xFF0000)
    .setDescription(action)

    await channel.send({ embeds: [embed] });
}

const info = (client, action) => {
    log(client.channels.cache.get(global.data.infoLogChannel), action);
}

const dev = async(error) => {

    const embed = new EmbedBuilder()
    .setColor(0xFFFF00)
    .setDescription(error)
    .setFooter({text: fc.formatDateFrançaise()});

    await axios.post(global.data.webhookDevLog, { embeds: [embed.toJSON()] });
}

module.exports = {
    info,
    dev,
};