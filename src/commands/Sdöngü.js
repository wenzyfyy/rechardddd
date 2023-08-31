const { MessageEmbed } = require('discord.js')
const db = require("inflames.db")
module.exports = {
  slash: true,
  name: ["döngü"],
  description: "Dinlediğiniz şarkıyı veya şarkı kuyruğunu tekrar oynatır.",
  option: [{
    name: "döngü",
    description: "Kullanım: /döngü [kuyruk, parça, kapat]",
    type: "string",
    require: true
  }],
  async execute(client, interaction, args) {

    const queue = client.distube.getQueue(interaction.guild.id)
    var prefix = db.fetch(`prefix_${interaction.guild.id}`) || "r!"


    if (!interaction.member.voice.channel) return interaction.reply({
      content: '<a:hata:967431448539848754> | Bir ses kanalında değilsiniz.',
      ephemeral: true,
    })

    if (!queue)

      return interaction.reply({
        content: `<a:hata:967431448539848754> | Şuan birşey çalmıyor.`,
        ephemeral: true,
      });

    let loopmode = interaction.options.getString("döngü")
    let mods = ["parça", "kuyruk", "kapat"];
    if (!mods.includes(loopmode)) {
      return interaction.reply({
        content: `Kullanım: \`\`/döngü [kuyruk, parça, kapat]\`\``,
        ephemeral: true
      });
    }

    if (loopmode === "kapat" || loopmode === "off") {
      await queue.setRepeatMode(0);
      return interaction.reply({
        content: `Döngü modu: **Kapalı**, olarak ayarlandı. <:loop:973627205605290024>`,
        ephemeral: true
      });
    } else if (loopmode === "parça" || loopmode === "song") {
      await queue.setRepeatMode(1);
      return interaction.reply({
        content: `Döngü modu: **Aktif**, mevcut müzik sürekli olarak tekrarlanacak. <:loopone:973627258663235594>`,
        ephemeral: true
      });
    } else if (loopmode === "kuyruk" || loopmode === "queue") {
      if (queue.songs.length === 1) {
        return interaction.reply({
          content: "<a:hata:967431448539848754> | Kuyrukta müzik yok.",
          ephemeral: true
        });
        await queue.setRepeatMode(2);
        return interaction.reply({
          content: `Döngü modu: **Aktif**, olarak ayarlandı. <:loop:973627205605290024>`,
          ephemeral: true
        });
      }
    }
  }
}