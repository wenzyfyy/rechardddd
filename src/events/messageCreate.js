//burasının ne olduğunu bilmiyorsanız lütfen hiç bir koda dokunmayın.
const { MessageEmbed } = require('discord.js')
const db = require('inflames.db')
module.exports = {
  name: "messageCreate",
  async execute(message, client) {

    if (!message.guild) {
      var prefix = "r!"
    } else if (db.kontrol(`prefix_${message.guild.id}`)) {
      var prefix = db.bul(`prefix_${message.guild.id}`)
    } else {
      var prefix = "r!"
    }

    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(mention)) {

      var prefix = db.fetch(`prefix_${message.guild.id}`) || "r!"
      const embed = new MessageEmbed()
        .setDescription(`
<a:hello:975778630439424121> | Merhaba;
❓ | Yardım menüm: **${prefix}yardım**
<a:developer:976131598820982794> | Sahibim: **wenzy.fy#4769**
🌐 Destek sunucum: [Sende Katıl!](https://discord.gg/5nFRVX2fnR)
`)
      message.channel.send({ embeds: [embed] })
    };
    //
    const lib = require('lib')({ token: process.env.token });
    const lyricsFinder = require('lyrics-finder');

    if (message.content.startsWith('r!lyrics')) {
      const args = message.content.split(' ').slice(1);
      if (!args.length)
        return message.reply({
          channel_id: `${message.channel_id}`,
          content: `Please provide the song name!`,
          allowedMentions: {
            repliedUser: false
          }
        });

      let lyrics = (await lyricsFinder(null, args.join(' '))) || 'Not Found!';
      const embed = new MessageEmbed()
        .setColor('AQUA')
        .setDescription(`${lyrics}`)
      await message.reply({
        channel_id: `${message.channel_id}`,
        embeds: [embed],
        allowedMentions: {
          repliedUser: false
        }
      });
    }
    //
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    let command = message.content.split(" ")[0].slice(prefix.length);
    let args = message.content.split(" ").slice(1);
    let cmd = client.commands.get(command)
    if (!cmd) return;
    cmd.execute(client, message, args);
  },
};
