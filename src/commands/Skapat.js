const { MessageEmbed } = require("discord.js");

module.exports = {
  slash: true,
        name: ["kapat"],
  description: "Çalan şarkıyı durdurup botu kanaldan çıkarır.",
    async execute(client, interaction, args) {
      
        const queue = client.distube.getQueue(interaction.guild.id)
        const clientVoice = interaction.guild.me.voice.channel;
        const memberVoice = interaction.member.voice.channel;
    if (!interaction.member.voice.channel) return interaction.reply({
      content: '<a:hata:967431448539848754> | Bir ses kanalında değilsiniz.',
      ephemeral: true
    })
              
               if (!queue) {

     return interaction.reply({
        content: `<a:hata:967431448539848754> | Şuan birşey çalmıyor.`,
        ephemeral: true
     });
               }
        if (clientVoice === memberVoice) {
          if (queue) {
                client.distube.stop(interaction);
                client.distube.voices.leave(interaction.guild)
          } else {
                client.distube.voices.leave(interaction.guild)
          }
           interaction.reply({
              content: "<:kedyuzgun:969344668137582643> | Kanaldan çıktım.",
              ephemeral: true
            });
        }
    }
}
