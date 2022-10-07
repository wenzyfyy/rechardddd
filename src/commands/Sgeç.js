const { MessageEmbed } = require("discord.js");

module.exports = {
  slash: true,
  name: ["geç"],
  description: "Çalan müziği atlar. (/geç | /geç [sayı])",

  option: [{
    name: "sayı",
    description: "Geçmek istediğiniz şarkı sayısını yazınız",
    type: "number",
    require: false
  }],
    async execute(client, interaction, args) {
      
        const queue = client.distube.getQueue(interaction.guild.id)

    if (!interaction.member.voice.channel) return interaction.reply({
      content: '<a:hata:967431448539848754> | Bir ses kanalında değilsiniz.',
      ephemeral: true
    })

    if (!queue)
     return interaction.reply({
        content: `<a:hata:967431448539848754> | Şuan birşey çalmıyor.`,
        ephemeral: true
     });
              
                if (queue.songs.length === 1) {
       return interaction.reply({ 
         content: "<a:hata:967431448539848754> | Kuyrukta müzik yok.",
         ephemeral: true
       })
       }
     let option = interaction.options.getNumber("sayı")   
        if(!option){
client.distube.jump(interaction, parseInt(1))
            return interaction.reply({
                content: '<a:onay:967432355960745985> | Müzik atlandı.',
                ephemeral: true
              })
          
        } else {
          
client.distube.jump(interaction, parseInt(option))
            return interaction.reply({
                content: '<a:onay:967432355960745985> | Müzik atlandı.',
                ephemeral: true
              })
        }
        }
}