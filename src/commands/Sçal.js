const Discord = require("discord.js");
const { Permissions } = require("discord.js");
const { MessageEmbed } = require("discord.js")
module.exports = {
  slash: true,
  name: ["çal"],
  description: "İstediğiniz müziği çalmaya yarar.",
  option: [
    {
      //2. option
      name: "müzik",
      description: "Müzik adı giriniz.",
      type: "string", //options türünü yukarda numara olarak tanımlamıştık burada yazı olarak tanımladık
      require: true, //burada bu optionu isteğe bağlı olara kayarladım
    },
  ],
  async execute(client, interaction) {

    const { channel } = interaction.member.voice;
    if (!channel) return interaction.reply({
      content: "<a:hata:967431448539848754> | Bir ses kanalında değilsiniz.",
      ephemeral: true
    })

    if (!interaction.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return interaction.reply({
      content: "<a:hata:967431448539848754> | Benim yeterli izinlerim yok!                               Ses kanalı izinleri: ``Kanalı Görüntüle, Bağlan, Konuş, Ses Eylemini Kullan``",
      ephemeral: true
    })
    if (!interaction.guild.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return interaction.reply({
      content: "<a:hata:967431448539848754> | Benim yeterli izinlerim yok!                               Ses kanalı izinleri: ``Kanalı Görüntüle, Bağlan, Konuş, Ses Eylemini Kullan``",
      ephemeral: true
    })

    const müzik = interaction.options.getString("müzik")

    const options = {
      textChannel: interaction.channel,
      member: interaction.member,
    };
    interaction.client.distube.play(
      interaction.member.voice.channel,
      müzik,
      options
    );

    const embed = new MessageEmbed()
      .setColor("AQUA")
      .setDescription("<a:yuklendi:967530127556771893> | İstediğiniz parça eklendi...")
    interaction.reply({
      embeds: [embed],
      ephemeral: true,
    })
  },
};
