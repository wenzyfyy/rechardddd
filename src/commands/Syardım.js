const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { readdirSync } = require("fs");
const { stripIndents } = require("common-tags");
const chalk = require("chalk");
const db = require('inflames.db')
module.exports = {
  slash: true,
  name: ["yardım"],
  description: "Botun yardım menüsünü görmenizi sağlar.",
  async execute(client, interaction, args) {
    var prefix = db.fetch(`prefix_${interaction.guild.id}`) || "r!"

    console.log(chalk.magenta(`[COMMAND] Help used by ${interaction.user.tag} from ${interaction.guild.name}`));
    const embed = new MessageEmbed()

    embed.setTitle(`Lütfen Botumu Yargılamayınız <:rte:975477128135069738>`)
    embed.setURL('https://discord.gg/5nFRVX2fnR')
    embed.setDescription(`
<a:cd:974684276748595200>\`\`${prefix}çal\`\` 》İstediğiniz müziği çalmaya yarar.
<a:cd:974684276748595200>\`\`${prefix}ara\`\` 》İstediğiniz müziği arayarak bulmanızı sağlar.
<a:cd:974684276748595200>\`\`${prefix}gir\`\` 》Botun bulunduğunuz kanala girmesine yarar.
<a:cd:974684276748595200>\`\`${prefix}ses\`\` 》Müziğin ses seviyesini ayarlamanızı sağlar.
<a:cd:974684276748595200>\`\`${prefix}dur\`\` 》Çalan müziği durdurur.
<a:cd:974684276748595200>\`\`${prefix}devam\`\` 》Durdurulan müziği devam ettirir.
<a:cd:974684276748595200>\`\`${prefix}geç\`\` 》Çalan müziği atlar. (${prefix}geç | ${prefix}geç [sayı])
<a:cd:974684276748595200>\`\`${prefix}çalan\`\` 》Şuanda çalan müziği gösterir.
<a:cd:974684276748595200>\`\`${prefix}kuyruk\`\` 》Şarkı kuyruğunu gösterir.
<a:cd:974684276748595200>\`\`${prefix}döngü\`\` 》Dinlediğiniz şarkıyı veya şarkı kuyruğunu tekrar oynatır.
<a:cd:974684276748595200>\`\`${prefix}kapat\`\` 》Çalan şarkıyı durdurup botu kanaldan çıkarır.
<a:cd:974684276748595200>\`\`${prefix}istatistik\`\` 》Botun İstatistik bilgilerini gösterir.
<a:cd:974684276748595200>\`\`${prefix}davet\`\` 》Botun davet linkini gönderir.
<a:cd:974684276748595200>\`\`${prefix}prefix\`\` 》Botun prefini değiştirmenizi sağlar.
<a:cd:974684276748595200>\`\`${prefix}prefix-sıfırla\`\` 》Oluşturduğunuz prefixi eski haline döndürmenize yarar.

:postbox: __Sahibime iletmek istediğiniz mesajları bana DM'den yazınız.__
    `)
    embed.setFooter(`${interaction.user.tag}`, interaction.user.avatarURL())
    embed.setTimestamp()
    embed.setColor("AQUA")

    const button = new MessageButton()
      .setLabel('Destek Sunucusu')
      .setStyle('LINK')
      .setURL('https://discord.gg/5nFRVX2fnR')

    const button1 = new MessageButton()
      .setLabel('Davet Linki')
      .setStyle('LINK')
      .setURL('https://top.gg/bot/882730079594086440')
    const row = new MessageActionRow().addComponents(button, button1);

    return interaction.reply({
      embeds: [embed],
      components: [row],
      ephemeral: true
    });
  }
}