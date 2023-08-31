const { MessageEmbed } = require("discord.js");

module.exports = {
  name: ["duraklat", "pa", "stop", "pause", "dur", "durdur"],

  async execute(client, message, args, track) {

    const queue = client.distube.getQueue(message.guild.id)
    if (!message.member.voice.channel) return message.reply({
      content: '<a:hata:967431448539848754> | Bir ses kanalında değilsiniz.',
      allowedMentions: {
        repliedUser: false
      }
    })
    if (!queue)
      message.reply({
        content: `<a:hata:967431448539848754> | Şuan birşey çalmıyor.`,
        allowedMentions: {
          repliedUser: false
        }
      });

    if (queue.paused) {
    } else {
      client.distube.pause(message);

      message.reply({
        content: `<a:onay:967432355960745985> | Müzik durduruldu.`,
        allowedMentions: {
          repliedUser: false
        }
      });
    }
  }
};
