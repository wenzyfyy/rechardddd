const Discord = require("discord.js");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");
var GHz = "`2.30GHz`";
module.exports = {
    name: ["istatistik", "i"],
  async execute(client, message, args) {
      
              const button = new MessageButton()
.setLabel('Destek Sunucusu')
.setStyle('LINK')
.setURL('https://discord.gg/5nFRVX2fnR')

const button1 = new MessageButton()
.setLabel('Davet Linki')
.setStyle('LINK')
.setURL('https://top.gg/bot/882730079594086440')
const row = new MessageActionRow().addComponents(button, button1);
              
    const zaman = moment
      .duration(client.uptime)
      .format(" D [gün], H [saat], m [dakika], s [saniye]");
    const embed = new MessageEmbed()
      .setFooter(`${message.author.tag}`, message.author.avatarURL())
      .setTimestamp()
      .setColor("AQUA")
      .setTitle(
        "<a:galp:974680777977643049> Rechard <a:galp:974680777977643049>"
      )

      .addField(
        "<a:developer:976131598820982794> **Botun Sahibi**",
        `<@!564837933912293386> || wenzy.fy#4769`
      )

      .addField("<:gold:974682632170377216> **Cpu Çalışma Hızı**:", `${GHz}`)

      .addField(
        "<a:zil:974683471152824320> **Toplam Emoji Sayısı**",
        `${client.emojis.cache.size.toLocaleString()}`
      )

      .addField(
        "<a:cd:974684276748595200> **Sunucu Sayısı**",
        client.guilds.cache.size.toLocaleString(),
        true
      )

      .addField(
        "<a:tac:974685069220409394> **Toplam Kullanıcı Sayısı**",
        client.guilds.cache
          .reduce((a, b) => a + b.memberCount, 0)
          .toLocaleString(),
        true
      )

      .addField(
        "<a:yildiz:974687984874045490> **Kanal Sayısı**",
        client.channels.cache.size.toLocaleString(),
        true
      )

      .addField(
        "<a:uptime:974689238492774441> **Ne Kadar Süredir Aktif**",
        zaman,
        true
      )

      .addField(
        "<a:moderasyon:974687263390834689> **Sistem Bilgileri**",

        `\`\`\`md\nİşletim Sistemi: ${os.platform()}

CPU: ${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``,
        true
      )

      .addField(
        "<a:ping:974690256098033754> **Ping**",
        client.ws.ping + " ms"
      )

      .addField(
        "<a:alev:974690680058314842> **Versiyonlar**",

        `\`\`\`md\nNode.js Versiyonu: ${process.version}

Discord.js Versiyonu: ${Discord.version}\`\`\``,
        true
      )

      .addField(
        "<a:alev:974690680058314842> **Bellek Kullanımı**",
        (process.memoryUsage().heapUsed / 1024 / 512).toFixed(2) + " MB",
        true
      );
    return message.reply({ 
          embeds: [embed],
      components: [row],
        allowedMentions: {
        repliedUser: false
        }
        });
            }
  }
