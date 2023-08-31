const { MessageEmbed, Permissions } = require("discord.js");
module.exports = {
  name: ["gir", "katıl", "join"],
  async execute(client, message, args) {

    const { channel } = message.member.voice;
    if (!channel)
      return message.reply({
        content: "<a:hata:967431448539848754> | Bir ses kanalında değilsiniz.",
        allowedMentions: {
          repliedUser: false
        }
      });
    if (
      !message.guild.me.permissions.has([
        Permissions.FLAGS.CONNECT,
        Permissions.FLAGS.SPEAK,
      ])
    )
      return message.reply({
        content: "<a:hata:967431448539848754> | Benim yeterli izinlerim yok!                               Ses kanalı izinleri: ``Kanalı Görüntüle, Bağlan, Konuş, Ses Eylemini Kullan``",
        allowedMentions: {
          repliedUser: false
        }
      });
    if (
      !message.guild.me
        .permissionsIn(channel)
        .has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])
    )
      return message.reply({
        content: "<a:hata:967431448539848754> | Benim yeterli izinlerim yok!                               Ses kanalı izinleri: ``Kanalı Görüntüle, Bağlan, Konuş, Ses Eylemini Kullan``",
        allowedMentions: {
          repliedUser: false
        }
      });
    const memberVoice = message.member.voice.channel;


    if (memberVoice) {
      client.distube.voices.join(memberVoice)
        .then(voice => {
          return message.react("967432355960745985");
        })

        .catch(error => {

          console.log(error);

        })
    }
  }
}