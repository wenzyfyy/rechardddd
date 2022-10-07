const { MessageEmbed } = require("discord.js");

module.exports = {
        name: ["kapat", "leave", "ayrıl", "disconnected", "disconnect"],
    async execute(client, message, args) {
      
        const queue = client.distube.getQueue(message.guild.id)
        const clientVoice = message.guild.me.voice.channel;
        const memberVoice = message.member.voice.channel;
    if (!message.member.voice.channel) return message.reply({
      content: '<a:hata:967431448539848754> | Bir ses kanalında değilsiniz.',
      allowedMentions: {
        repliedUser: false
      }
    })
              
               if (!queue) {

     return message.reply({
        content: `<a:hata:967431448539848754> | Şuan birşey çalmıyor.`,
        allowedMentions: {
          repliedUser: false
        }
     });
               }
        if (clientVoice === memberVoice) {
          if (queue) {
                client.distube.stop(message);
                client.distube.voices.leave(message.guild)
          } else {
                client.distube.voices.leave(message.guild)
          }
           message.reply({
              content: "<:kedyuzgun:969344668137582643> | Kanaldan çıktım.",
              allowedMentions: {
                repliedUser: false
              }
            });
        }
    }
}
