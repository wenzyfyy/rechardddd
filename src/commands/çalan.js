const { MessageEmbed } = require("discord.js");

module.exports = {
  name: ["çalan", "np", "now", "nowplaying"],
  async execute(client, message, args) {

    const queue = client.distube.getQueue(message.guild.id)

    if (!message.member.voice.channel) return message.reply({
      content: '<a:hata:967431448539848754> | Bir ses kanalında değilsiniz.',
      allowedMentions: {
        repliedUser: false
      }
    })

    if (!queue)

      return message.reply({
        content: `<a:hata:967431448539848754> | Şuan birşey çalmıyor.`,
        allowedMentions: {
          repliedUser: false
        }
      });

    const part = Math.floor((queue.currentTime / queue.songs[0].duration) * 30);

    const embed = new MessageEmbed()
      .setFooter(`${message.author.tag}`, message.author.avatarURL())
      .setTimestamp()
      .setColor("AQUA")
      .setDescription(`
<a:cd:974684276748595200> | Şuan Çalıyor: [${queue.songs[0].name}](${queue.songs[0].url}) 

Ses seviyesi: **%${queue.volume}**
Tekrar modu: **${queue.repeatMode ? 'açık' : 'kapalı'}**
${queue.songs[0].user}
`)
      .setThumbnail(queue.songs[0].thumbnail)
    message.reply({
      embeds: [embed],
      allowedMentions: {
        repliedUser: false
      }
    });
  }
}
