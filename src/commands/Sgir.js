const { MessageEmbed, Permissions } = require("discord.js");
module.exports = {
  slash: true,
  name: ["gir"],
  description: "Botun bulunduğunuz kanala girmesine yarar.",
  async execute(client, interaction, args) {

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
        content: "<a:hata:967431448539848754> | Benim yeterli izinlerim yok!                               Ses kanalı izinleri: ``Kanalı Görüntüle, Bağlan, Konuş, Ses Eylemini Kullan``",
        ephemeral: true
      });
    if (
      !interaction.guild.me
        .permissionsIn(channel)
        .has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])
    )
      return interaction.reply({
        content: "<a:hata:967431448539848754> | Benim yeterli izinlerim yok!                               Ses kanalı izinleri: ``Kanalı Görüntüle, Bağlan, Konuş, Ses Eylemini Kullan``",
        ephemeral: true
      });
    const memberVoice = interaction.member.voice.channel;


    if (memberVoice) {
      client.distube.voices.join(memberVoice)
        .then(voice => {
          return interaction.reply({
            content: "<a:onay:967432355960745985>",
            ephemeral: true
          });
        })

        .catch(error => {

          console.log(error);

        })
    }
  }
}