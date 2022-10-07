const { MessageEmbed } = require("discord.js");

module.exports = {
        name: ["geç", "s", "skip", "atla", "atlat"],
    async execute(client, message, args) {
      
        const queue = client.distube.getQueue(message.guild.id)

    if (!message.member.voice.channel) return message.reply({
      content: '<a:hata:967431448539848754> | Bir ses kanalında değilsiniz.',
      allowedMentions: {
        repliedUser: false
    }
    })

    if (!queue)
     return message.reply({
        content: `<a:hata:967431448539848754> | Şuan birşey çalmıyor.`,
       allowedMentions: {
        repliedUser: false
       }
     });
              
                if (queue.songs.length === 1) {
       return message.reply({ 
         content: "<a:hata:967431448539848754> | Kuyrukta müzik yok.",
       allowedMentions: {
        repliedUser: false
       }
       })
       }
        
        if(!args[0]){
client.distube.jump(message, parseInt(1))
            return message.reply({
                content: '<a:onay:967432355960745985> | Müzik atlandı.',
              allowedMentions: {
        repliedUser: false
              }
              })
          
        } else {
          
client.distube.jump(message, parseInt(args[0]))
            return message.reply({
                content: '<a:onay:967432355960745985> | Müzik atlandı.',
              allowedMentions: {
        repliedUser: false
              }
              })
        }
        }
}