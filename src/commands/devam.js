const { MessageEmbed } = require("discord.js");

module.exports = {
  slash: false,
  name: ["devam", "re", "resume"],
  async execute(client, message, args) {

    const queue = client.distube.getQueue(message.guild.id)
    if (!message.member.voice.channel) return message.channel.send('<a:hata:967431448539848754> | Bir ses kanalında değilsiniz.')
    if (!queue)
      message.reply({
        content: `<a:hata:967431448539848754> | Şuan birşey çalmıyor.`,
        allowedMentions: {
          repliedUser: false
        }
      });

    if (queue.paused) {
      client.distube.resume(message);

      message.reply({
        content: "<a:onay:967432355960745985> | Müzik devam ediyor.",
        allowedMentions: {
          repliedUser: false
        }
      });
    }
  }
}
