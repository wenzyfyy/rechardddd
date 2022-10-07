const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
    name: ["ses", "vol", "v", "volume"],
    async execute(client, message, args) {
      
      const queue = client.distube.getQueue(message.guild.id)
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
        });
      
      if (!queue)
    return message.reply({
        content: `<a:hata:967431448539848754> | Şuan birşey çalmıyor.`,
      allowedMentions: {
        repliedUser: false
      }
    });
      
        const volume = parseInt(args[0]);

        if (!volume) {
            const embed = new MessageEmbed()
                .setColor("#000001")
                .setDescription(`Bir değer girmelisin! örneğin; \`${client.prefix}ses 75\` `);

            return message.reply({ 
              embeds: [embed],
            allowedMentions: {
        repliedUser: false
            }
            });
        }

        if (Number(volume) < 1 || Number(volume) > 100) return message.reply(`Lütfen **1** ile **100** arasında bir sayı girin.`)

        client.distube.setVolume(message, volume);

        const embed = new MessageEmbed()
            .setFooter(`${message.author.tag}`, message.author.avatarURL())
      .setTimestamp()
      .setColor("AQUA")
            .setDescription(`Ses seviyesi \`%${args[0]}\` olarak ayarlandı.`)

        message.reply({ embeds: [embed],
                      allowedMentions: {
        repliedUser: false
                      }
                      });
    }
}