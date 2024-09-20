const {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");
const { Queue } = require("distube");

const numberEmojis = [
  "0️⃣",
  "<:Numara_1:976216637529268295>",
  "<:Numara_2:976216656344924200>",
  "<:Numara_3:976216677299654707>",
  "<:Numara_4:976216695414878308>",
  "<:Numara_5:976216717401403423>",
  "<:Numara_6:976216736028327977>",
  "<:Numara_7:976216756299386921>",
  "<:Numara_8:976216775018553344>",
  "<:Numara_9:976216791892234381>",
  "<:Numara_10:976216806450667531>",
];

module.exports = {
  slash: true,
  name: ["ara"],
  description: "İstediğiniz müziği arayarak bulmanızı sağlar.",
  option: [
    {
      name: "müzik",
      description: "Müzik adı giriniz.",
      type: "STRING",
      required: true,
    },
  ],
  async execute(client, interaction, queue) {
    try {
      const { channel } = interaction.member.voice;

      if (!channel)
        return interaction.reply({
          content: "<a:hata:967431448539848754> | Bir ses kanalında değilsiniz.",
          ephemeral: true,
        });

      if (!interaction.guild.members.me.permissions.has([
        PermissionsBitField.Flags.Connect,
        PermissionsBitField.Flags.Speak,
      ])) {
        return interaction.reply({
          content: "<a:hata:967431448539848754> | Benim yeterli izinlerim yok! Ses kanalı izinleri: ``Kanalı Görüntüle, Bağlan, Konuş, Ses Eylemini Kullan``",
          ephemeral: true,
        });
      }

      if (!interaction.guild.members.me.permissionsIn(channel).has([
        PermissionsBitField.Flags.Connect,
        PermissionsBitField.Flags.Speak,
      ])) {
        return interaction.reply({
          content: "<a:hata:967431448539848754> | Benim yeterli izinlerim yok! Ses kanalı izinleri: ``Kanalı Görüntüle, Bağlan, Konuş, Ses Eylemini Kullan``",
          ephemeral: true,
        });
      }

      const müzik = interaction.options.getString("müzik");

      let res = await client.distube.search(müzik, {
        limit: 10,
        retried: true,
        safeSearch: true,
        type: "video",
      });
      
      let tracks = res
        .map((song, index) => `${index + 1}) [${song.name}](${song.url})`)
        .join("\n");

      let embed = new EmbedBuilder()
        .setFooter({ text: `${interaction.user.tag}`, iconURL: interaction.user.avatarURL() })
        .setTimestamp()
        .setColor("Aqua")
        .setTitle(`Aranan Parça: \`${müzik}\``)
        .setDescription(tracks.substring(0, 2048));

      let menuraw = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("search")
          .setPlaceholder("1 ile 10 arasında bir şarkı seçin.")
          .addOptions(
            res.map((song, index) => ({
              label: song.name.substring(0, 50),
              value: song.url,
              description: "Tıkla şarkıyı başlat.",
              emoji: numberEmojis[index + 1],
            }))
          )
      );

      await interaction.reply({
        embeds: [embed],
        components: [menuraw],
        ephemeral: true,
      });

      let filter = (i) => i.user.id === interaction.user.id;
      let collector = interaction.channel.createMessageComponentCollector({ filter });

      collector.on("collect", async (i) => {
        if (i.isSelectMenu()) {
          await i.deferUpdate().catch(() => { });
          let song = i.values[0];
          client.distube.play(channel, song, {
            member: interaction.member,
            textChannel: interaction.channel,
          });
        }
      });
    } catch (err) {
      console.error(err);
      interaction.reply({
        content: "<a:hata:967431448539848754> | Aradığın şarkıyı bulamadım!",
        ephemeral: true,
      });
    }
  },
};
