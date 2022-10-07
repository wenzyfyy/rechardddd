const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  slash: true,
    name: ["davet"],
  description: "Botun davet linkini gönderir.",
    async execute(client, interaction) {
      
        const embed = new MessageEmbed()
        .setColor("AQUA")
        .setDescription(`[Beni Sunucuna Davet Et!](https://top.gg/bot/882730079594086440)`)  
        interaction.reply({ 
          embeds: [embed],
        ephemeral: true
        });
}
}