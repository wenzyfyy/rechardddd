const discord = require('discord.js')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const db = require('inflames.db')
module.exports = {
  name: ["prefix"],

  async execute(client, message, args) {
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({
      content: "<a:hata:967431448539848754> | Bu komudu kullanabilmek için `Yönetici` yetkisine sahip olman gerekli.",
      allowedMentions: {
        repliedUser: false
      }
    })
    let prefix = args[0]
    var p = db.fetch(`prefix_${message.guild.id}`) || "r!"
    if (!prefix) return message.reply({
      content: `<a:hata:967431448539848754> | Lütfen prefix belirlemek için bir simge seçin. Örneğin: \`${p}\``,
      allowedMentions: {
        repliedUser: false
      }
    })
    if (prefix.length > 2) return message.reply({
      content: "<a:hata:967431448539848754> | Lütfen prefix uzunluğunu 2 karakter sınırında tutunuz.",
      allowedMentions: {
        repliedUser: false
      }
    })

    const eskiprefix = db.has("prefix_" + message.guild.id) ? db.fetch("prefix_" + message.guild.id) : "Yok"
    if (eskiprefix == args.join(" ")) return message.reply({
      content: "<a:hata:967431448539848754> | Yeni prefix eski prefix ile aynı olamaz!",
      allowedMentions: {
        repliedUser: false
      }
    })


    db.yaz(`prefix_${message.guild.id}`, prefix)

    const button = new MessageButton()
      .setLabel('Destek Sunucusu')
      .setStyle('LINK')
      .setURL('https://discord.gg/5nFRVX2fnR')

    const button1 = new MessageButton()
      .setLabel('Davet Linki')
      .setStyle('LINK')
      .setURL('https://top.gg/bot/882730079594086440')
    const row = new MessageActionRow().addComponents(button, button1);

    const embed = new MessageEmbed()
      .setFooter(`Rechard ❤️ ${message.guild.name}`)
      .setTimestamp()
      .setColor("AQUA")
      .setAuthor({ name: "Rechard", iconURL: "https://cdn.discordapp.com/avatars/882730079594086440/26e00712a3e76d4c16ae359962a6e160.jpg?size=4096" })
      .setDescription(`
**${message.guild.name}** *prefix değiştirme işlemi*;

**Eski Prefix:** ${eskiprefix}
**Yeni Prefix:** ${prefix}

Eski prefixe dönmek isterseniz de ${prefix}prefix-sıfırla
    `)
    return message.reply({
      embeds: [embed],
      components: [row],
      allowedMentions: {
        repliedUser: false
      }
    });
  }

}