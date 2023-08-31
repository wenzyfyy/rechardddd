const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: ["davet", "invite"],
  async execute(client, message, args) {

    const embed = new MessageEmbed()
      .setColor("AQUA")
      .setDescription(`[Beni Sunucuna Davet Et!](https://top.gg/bot/882730079594086440)`)
    message.reply({
      embeds: [embed],
      allowedMentions: {
        repliedUser: false
      }
    });
  }
}