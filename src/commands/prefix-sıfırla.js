const { MessageEmbed } = require('discord.js')
const db = require('inflames.db')

module.exports = {
  name: ["prefix-sıfırla"],
  async execute(client, message, args) {

    if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({
      content: "<a:hata:967431448539848754> | Bu komudu kullanabilmek için `Yönetici` yetkisine sahip olman gerekli.",
      allowedMentions: {
        repliedUser: false
      }
    })

    if (!db.has(`prefix_${message.guild.id}`)) return message.reply({
      content: "<a:hata:967431448539848754> | Prefix sıfırlamak için önce bir prefix oluşturmalısınız.",
      allowedMentions: {
        repliedUser: false
      }
    })

    db.sil("prefix_" + message.guild.id)
    const embed = new MessageEmbed()
      .setTitle("Başarıyla Prefix Sıfırlandı")
      .setColor("AQUA")
      .setDescription("Başarıyla Prefix'iniz Sıfırlandı. Yeni Prefix'iniz **r!**")
      .setFooter({ text: "Prefix Değiştirmek İçin r!prefix Yazabilirsiniz" })
    message.reply({
      embeds: [embed],
      allowedMentions: {
        repliedUser: false
      }
    })


  }
}