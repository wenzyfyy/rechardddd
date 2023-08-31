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
  slash: true,
  name: ["ara"],
  description: "İstediğiniz müziği arayarak bulmanızı sağlar.",
  option: [
    {
      //2. option
      name: "müzik",
      description: "Müzik adı giriniz.",
      type: "string", //options türünü yukarda numara olarak tanımlamıştık burada yazı olarak tanımladık
      require: true, //burada bu optionu isteğe bağlı olara kayarladım
    },
  ],
  /**
   *
   * @param {JUGNU} client
   * @param {Message} message
   * @param {String[]} args
   * @param {String} prefix
   * @param {Queue} queue
   */
  async execute(client, interaction, queue) {
    // Code
    try {
      const { channel } = interaction.member.voice;

      if (!channel)
        return interaction.reply({
          content: "<a:hata:967431448539848754> | Bir ses kanalında değilsiniz.",
          ephemeral: true
        });

      if (
        !interaction.guild.me.permissions.has([
          Permissions.FLAGS.CONNECT,
          Permissions.FLAGS.SPEAK,
        ])
      )
        return interaction.reply({
          content:
            "<a:hata:967431448539848754> | Benim yeterli izinlerim yok!                                    Ses kanalı izinleri: ``Kanalı Görüntüle, Bağlan, Konuş, Ses Eylemini Kullan``",
          ephemeral: true
        });

      if (
        !interaction.guild.me
          .permissionsIn(channel)
          .has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])
      )
        return interaction.reply({
          content:
            "<a:hata:967431448539848754> | Benim yeterli izinlerim yok!                                    Ses kanalı izinleri: ``Kanalı Görüntüle, Bağlan, Konuş, Ses Eylemini Kullan``",
          ephemeral: true
        });

      const müzik = interaction.options.getString("müzik")

      let res = await client.distube.search(müzik, {
        limit: 10,
        retried: true,
        safeSearch: true,
        type: "video",
      });
      let tracks = res
        .map((song, index) => {
          return `${index + 1}) [${song.name}](${song.url})`;
        })
        .join("\n");

      let embed = new MessageEmbed()
        .setFooter(`${interaction.user.tag}`, interaction.user.avatarURL())
        .setTimestamp()
        .setColor("AQUA")
        .setTitle(`Aranan Parça: \`${müzik}\``)
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
      interaction
        .reply({
          embeds: [embed],
          components: [menuraw],
          ephemeral: true
        })
      let filter = (i) => i.user.id === interaction.user.id;
      let collector = await interaction.channel.createMessageComponentCollector({
        filter: filter,
      });
      collector.on("collect", async (interaction) => {
        if (interaction.isSelectMenu()) {
          await interaction.deferUpdate().catch((e) => { });
          if (interaction.customId === "search") {
            let song = interaction.values[0];
            client.distube.play(channel, song, {
              member: interaction.member,
              textChannel: interaction.channel,
            });
          }
        }
      });
    } catch (err) {
      interaction.reply({
        content: "<a:hata:967431448539848754> | Aradığın şarkıyı bulamadım!",
        ephemeral: true
      })
    }
  },
}