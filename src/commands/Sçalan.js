const { MessageEmbed } = require("discord.js");

module.exports = {
  slash: true,
  name: ["çalan"],
  description: "Şuanda çalan müziği gösterir.",
  async execute(client, interaction, args) {

    const queue = client.distube.getQueue(interaction.guild.id)

    if (!interaction.member.voice.channel) return interaction.reply({
      content: '<a:hata:967431448539848754> | Bir ses kanalında değilsiniz.',
      ephemeral: true
    })

    if (!queue)

      return interaction.reply({
        content: `<a:hata:967431448539848754> | Şuan birşey çalmıyor.`,
        ephemeral: true
      });

    const part = Math.floor((queue.currentTime / queue.songs[0].duration) * 30);

    const embed = new MessageEmbed()
      .setFooter(`${interaction.user.tag}`, interaction.user.avatarURL())
      .setTimestamp()
      .setColor("AQUA")
      .setDescription(`
<a:cd:974684276748595200> | Şuan Çalıyor: [${queue.songs[0].name}](${queue.songs[0].url}) 

Ses seviyesi: **%${queue.volume}**
Tekrar modu: **${queue.repeatMode ? 'açık' : 'kapalı'}**
${queue.songs[0].user}
`)
      .setThumbnail(queue.songs[0].thumbnail)
    interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }
}
