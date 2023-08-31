const { MessageEmbed } = require("discord.js");
const pagequeue = require("../pagequeue.js");

module.exports = {
  slash: true,
  name: ["kuyruk"],
  description: "Şarkı kuyruğunu gösterir.",
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

    if (queue.songs.length === 1)
      return interaction.reply({
        content: `<a:hata:967431448539848754> | Kuyrukta şarkı yok !`,
        ephemeral: true
      })
    //   const pagesNum = Math.ceil(queue.songs.length / 10);
    // if (pagesNum === 0) pagesNum = 1;

    // const qduration = queue.formattedDuration;

    // const songStrings = [];
    // for (let i = 1; i < queue.songs.length; i++) {
    // const song = queue.songs[i];
    // songStrings.push(
    //    `**${i}.** [${song.name}](${song.url}) \`[${song.formattedDuration}]\` • ${song.user}
    //`
    //);
    // }

    // let mention = message.mentions.users.first();
    // const pages = [];
    // for (let i = 0; i < pagesNum; i++) {
    // const str = songStrings.slice(i * 10, i * 10 + 10).join("");

    ///const embed = new MessageEmbed()

    //.setTitle(
    // `Sunucu Müzik Kuyruğu - ${message.guild.name} 
    //<:loop:973627205605290024>`
    // )
    //.setFooter(`${message.author.tag}`, message.author.avatarURL())
    // .setTimestamp()
    // .setColor("AQUA")
    // .setDescription(`
    //Şuan Çalıyor: [${queue.songs[0].name}](${queue.songs[0].url})
    //Sıradaki Şarkı: [${queue.songs[1].name}](${queue.songs[1].url})
    //Listede **${queue.songs.length}** şarkı var`
    //)
    const embed = new MessageEmbed()
      .setFooter(`${interaction.user.tag}`, interaction.user.avatarURL())
      .setTimestamp()
      .setColor("AQUA")
      .setTitle(`
Sunucu Müzik Kuyruğu - **${interaction.guild.name}** <:loop:973627205605290024>
`)
      .setDescription(`
${queue.songs.map(
        (song, id) =>
          `${id ? id : 'Şuan Çalıyor'} - [${song.name}](${song.url})`,
      ).slice(0, 5)
          .join(`\n\n`)}`,)
    //message.reply({
    //content: `Current queue:\n${queue.songs
    // .map(
    //  (song, id) =>
    //    `**${id ? id : 'Playing'}**. ${
    //       song.name
    //    } - \`${song.formattedDuration}\``,
    //  )
    // .slice(0, 10)
    // .join('\n')}`,
    interaction.reply({
      embeds: [embed],
      ephemeral: true
    });

    //if (!args[0]) {
    //  if (pages.length == pagesNum && queue.songs.length > 10)
    //  pagequeue(client, message, pages, 60000, queue.songs.length, qduration);
    // else return message.channel.send({ embeds: [pages[0]] });
    // } else {
    // if (isNaN(args[0])) return message.channel.send("Page must be a number.");
    //  if (args[0] > pagesNum)
    //  return message.channel.send(
    //  `There are only ${pagesNum} pages available.`
    // );
    //  const pageNum = args[0] == 0 ? 1 : args[0] - 1;
    // return message.channel.send({ embeds: [pages[pageNum]] });
    // }
    //},
  }
};