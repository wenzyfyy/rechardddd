const {
  Message,
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed,
  Permissions,
} = require("discord.js");
const { Queue } = require("distube");
var numberEmojis = [
  `0️⃣`,
  `<:Numara_1:976216637529268295>`,
  `<:Numara_2:976216656344924200>`,
  `<:Numara_3:976216677299654707>`,
  `<:Numara_4:976216695414878308>`,
  `<:Numara_5:976216717401403423>`,
  `<:Numara_6:976216736028327977>`,
  `<:Numara_7:976216756299386921>`,
  `<:Numara_8:976216775018553344>`,
  `<:Numara_9:976216791892234381>`,
  `<:Numara_10:976216806450667531>`,
];
module.exports = {
  slash: false,
  name: ["ara", "sr", "find", "search"],
  /**
   *
   * @param {JUGNU} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   * @param {Queue} queue
   */
  async execute(client, message, args, prefix, queue) {
    // Code
    try {
      const { channel } = message.member.voice;

      if (!channel)
        return message.reply({
          content: "<a:hata:967431448539848754> | Bir ses kanalında değilsiniz.",
          allowedMentions: {
            repliedUser: false,
          },
        });

      if (
        !message.guild.me.permissions.has([
          Permissions.FLAGS.CONNECT,
          Permissions.FLAGS.SPEAK,
        ])
      )
        return message.reply({
          content:
            "<a:hata:967431448539848754> | Benim yeterli izinlerim yok!                                    Ses kanalı izinleri: ``Kanalı Görüntüle, Bağlan, Konuş, Ses Eylemini Kullan``",
          allowedMentions: {
            repliedUser: false,
          },
        });

      if (
        !message.guild.me
          .permissionsIn(channel)
          .has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])
      )
        return message.reply({
          content:
            "<a:hata:967431448539848754> | Benim yeterli izinlerim yok!                                    Ses kanalı izinleri: ``Kanalı Görüntüle, Bağlan, Konuş, Ses Eylemini Kullan``",
          allowedMentions: {
            repliedUser: false,
          },
        });

      const string = args.join(" ");

      if (!string) {
        return message.reply({
          content:
            "<a:hata:967431448539848754> | Çalmam için birşey belirtmedin!",
          allowedMentions: {
            repliedUser: false,
          },
        });
      }

      let res = await client.distube.search(string, {
        limit: 10,
        retried: true,
        safeSearch: true,
        type: "video",
      });

      client.distube.on("error", (message, e) => {
        console.error(e)
        message.channel.send("An error encountered: " + e);
      })

      let tracks = res
        .map((song, index) => {
          return `${index + 1}) [${song.name}](${song.url})`;
        })
        .join("\n");

      let embed = new MessageEmbed()
        .setFooter(`${message.author.tag}`, message.author.avatarURL())
        .setTimestamp()
        .setColor("AQUA")
        .setTitle(`Aranan Parça: \`${string}\``)
        .setDescription(tracks.substring(0, 2500));
      //   .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))

      let menuraw = new MessageActionRow().addComponents([
        new MessageSelectMenu()
          .setCustomId("search")
          .setPlaceholder(`1 ile 10 arasında bir şarkı seçin.`)
          .addOptions(
            res.map((song, index) => {
              return {
                label: song.name.substring(0, 50),
                value: song.url,
                description: `Tıkla şarkıyı başlat.`,
                emoji: numberEmojis[index + 1],
              };
            })
          ),
      ]);
      message
        .reply({
          embeds: [embed],
          components: [menuraw],
          allowedMentions: {
            repliedUser: false,
          },
        })
        .then(async (msg) => {
          let filter = (i) => i.user.id === message.author.id;
          let collector = await msg.createMessageComponentCollector({
            filter: filter,
          });
          collector.on("collect", async (interaction) => {
            if (interaction.isSelectMenu()) {
              await interaction.deferUpdate().catch((e) => { });
              if (interaction.customId === "search") {
                let song = interaction.values[0];
                client.distube.play(channel, song, {
                  member: message.member,
                  textChannel: message.channel,
                });
              }
            }
          });
        })
    } catch (err) {
      message.reply({
        content: "<a:hata:967431448539848754> | Aradığın şarkıyı bulamadım!",
        allowedMentions: {
          repliedUser: false
        }
      })
    }
  },
}