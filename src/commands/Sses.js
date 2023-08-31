const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  slash: true,
  name: ["ses"],
  description: "Müziğin ses seviyesini ayarlamanızı sağlar.",
  option: [{
    name: "ses",
    description: "Ses düzeyini yazınız.",
    type: "number",
    require: true
  }],
  async execute(client, interaction, args) {

    const queue = client.distube.getQueue(interaction.guild.id)
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
    });

    if (!queue)
      return interaction.reply({
        content: `<a:hata:967431448539848754> | Şuan birşey çalmıyor.`,
        ephemeral: true
      });

    const volume = parseInt(interaction.options.getNumber("ses"));

    if (!volume) {
      const embed = new MessageEmbed()
        .setColor("#000001")
        .setDescription(`Bir değer girmelisin! örneğin; \`${client.prefix}ses 75\` `);

      return interaction.reply({
        embeds: [embed],
        ephemeral: true
      });
    }

    if (Number(volume) < 1 || Number(volume) > 100) return interaction.reply(`Lütfen **1** ile **100** arasında bir sayı girin.`)

    client.distube.setVolume(interaction, volume);

    const embed = new MessageEmbed()
      .setFooter(`${interaction.user.tag}`, interaction.user.avatarURL())
      .setTimestamp()
      .setColor("AQUA")
      .setDescription(`Ses seviyesi \`%${interaction.options.getNumber("ses")}\` olarak ayarlandı.`)

    interaction.reply({
      embeds: [embed],
      ephemeral: true
    });
  }
}
