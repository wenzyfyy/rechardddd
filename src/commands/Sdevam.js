const { MessageEmbed } = require("discord.js");

module.exports = {
  slash: true,
  name: ["devam"],
  description: "Durdurulan müziği devam ettirir.",
  async execute(client, interaction, args) {

    const queue = client.distube.getQueue(interaction.guild.id)
    if (!interaction.member.voice.channel) return interaction.reply({
      content: '<a:hata:967431448539848754> | Bir ses kanalında değilsiniz.',
      ephemeral: true
    })
    if (!queue)
      interaction.reply({
        content: `<a:hata:967431448539848754> | Şuan birşey çalmıyor.`,
        ephemeral: true
      });

    if (queue.paused) {
      client.distube.resume(interaction);

      interaction.reply({
        content: "<a:onay:967432355960745985> | Müzik devam ediyor.",
        ephemeral: true
      });
    }
  }
}
