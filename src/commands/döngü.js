const { MessageEmbed } = require('discord.js')
const db = require("inflames.db")
module.exports = {
  name: ["döngü", "loop"],

  async execute(client, message, args) {

    const queue = client.distube.getQueue(message.guild.id)
    var prefix = db.fetch(`prefix_${message.guild.id}`) || "r!"


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

    let loopmode = args[0];
    let mods = ["parça", "kuyruk", "kapat"];
    if (!mods.includes(loopmode)) {
      return message.reply({
        content: `Kullanım: \`\`${prefix}döngü [kuyruk, parça, kapat]\`\``,
        allowedMentions: {
          repliedUser: false
        }
      });
    }
    if (loopmode === "kapat" || loopmode === "off") {
      await queue.setRepeatMode(0);
      return message.reply({
        content: `Döngü modu: **Kapalı**, olarak ayarlandı. <:loop:973627205605290024>`,
        allowedMentions: {
          repliedUser: false
        }
      });
    } else if (loopmode === "parça" || loopmode === "song") {
      await queue.setRepeatMode(1);
      return message.reply({
        content: `Döngü modu: **Aktif**, mevcut müzik sürekli olarak tekrarlanacak. <:loopone:973627258663235594>`,
        allowedMentions: {
          repliedUser: false
        }
      });
    } else if (loopmode === "kuyruk" || loopmode === "queue") {
      if (queue.songs.length === 1) {
        return message.reply({
          content: "<a:hata:967431448539848754> | Kuyrukta müzik yok.",
          allowedMentions: {
            repliedUser: false
          }
        });
        await queue.setRepeatMode(2);
        return message.reply({
          content: `Döngü modu: **Aktif**, olarak ayarlandı. <:loop:973627205605290024>`,
          allowedMentions: {
            repliedUser: false
          }
        });
      }
    }
  }
}