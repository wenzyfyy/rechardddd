const { Permissions } = require("discord.js");
const { MessageEmbed } = require("discord.js")
module.exports = {
  slash: false,
  name: ["oynat", "pplay", "p", "play", "çal"],
  async execute(client, message, args) {

    const { channel } = message.member.voice;
    if (!channel) return message.reply({
      content: "<a:hata:967431448539848754> | Bir ses kanalında değilsiniz.",
      allowedMentions: {
        repliedUser: false
      }
    })
    if (!message.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return message.reply({
      content: "<a:hata:967431448539848754> | Benim yeterli izinlerim yok!                               Ses kanalı izinleri: ``Kanalı Görüntüle, Bağlan, Konuş, Ses Eylemini Kullan``",
      allowedMentions: {
        repliedUser: false
      }
    })
    if (!message.guild.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return message.reply({
      content: "<a:hata:967431448539848754> | Benim yeterli izinlerim yok!                               Ses kanalı izinleri: ``Kanalı Görüntüle, Bağlan, Konuş, Ses Eylemini Kullan``",
      allowedMentions: {
        repliedUser: false
      }
    })

    const string = args.join(" ");
    if (!string) {
      return message.reply({
        content: "<a:hata:967431448539848754> | Çalmam için birşey belirtmedin!",
        allowedMentions: {
          repliedUser: false
        }
      });
    }

    const options = {
      member: message.member,
      textChannel: message.channel,
      message
    }

    client.distube.play(message.member.voice.channel, string, options);
  }
}
