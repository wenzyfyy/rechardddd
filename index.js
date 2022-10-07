const { DisTube } = require("distube");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { SpotifyPlugin } = require("@distube/spotify");
const { YtDlpPlugin } = require("@distube/yt-dlp")
const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const discord = require("discord.js");
const db = require("inflames.db")
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_VOICE_STATES", "DIRECT_MESSAGES"], partials: ["CHANNEL"] });
require("./src/base/app.js")(client)

//

client.distube = new DisTube(client, {
  searchSongs: 0,
  searchCooldown: 0,
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: true,
  youtubeDL: false,
  leaveOnEmpty: false,
  emptyCooldown: 0,
  leaveOnFinish: true,
  updateYouTubeDL: true,
  plugins: [
    new SoundCloudPlugin(),
    new SpotifyPlugin({
  parallel: true,
  emitEventsAfterFetching: false,
  api: {
    clientId: "05e0ad4f848b4b3fb370424340a5eb6d",
    clientSecret: "67606907b2db432c804789d5e0030f9a",
  },
}),
    new YtDlpPlugin(),
  ],
});

//

const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => res.send('Power By FastUptime'));

app.listen(port, () =>

    console.log(`Bot bu adres üzerinde çalışıyor: http://localhost:${port}`)

);

//
client.config = require("./src/base/settings.json");
//Dm
client.on('messageCreate', message => {

    if (message.author.bot) return;

    const attachment = message.attachments.first()

    if (message.channel.type === 'DM') {
        console.log(message.content)

        const dmLogEmbed = new MessageEmbed()
        .setTitle(`${client.user.username} Dm`)
        .setTimestamp()
        .setColor("AQUA")
        .setThumbnail(`${message.author.avatarURL()}`)
        .addField("Gönderen", message.author.tag)
        .addField("Gönderen ID", message.author.id)
        .addField("Gönderilen Mesaj", message.content);


        if (message.attachments.size !== 0) {
            dmLogEmbed.setImage(attachment.url)

        }

        client.users.fetch("564837933912293386").then((channel) => {

            channel.send({ embeds: [dmLogEmbed] })

        })
    }

});
//Distube addSong Komutu

client.distube.on("addSong", (queue, song) => {
  const { MessageEmbed } = require("discord.js")
  const embed = new MessageEmbed()
      .setColor("AQUA")
  .setDescription(`<:liste:973937322049548332> | Listeye Eklendi:
**${song.name}**
**Süre:** ${song.formattedDuration}`)
  .setTimestamp()
  
  queue.textChannel.send({
 embeds: [embed],
  });
});

//Distube playSong Komutu

  client.distube.on("playSong", (queue, song, nowTrack) => {
    var  newQueue = client.distube.getQueue(queue.id);
  const { MessageEmbed } = require("discord.js")
  const embed = new MessageEmbed()

    .addField("🎵 | Şarkı Adı", `\n**[${song.name}](${song.url})**\n`)

    .setImage(song.thumbnail)

    .addField(

      "<:YouTube:967436296907812874> | Şarkı Kanalı",

      `\n**[${song.uploader.name}](${song.uploader.url})**\n`

    )

    .addField(":timer: | Şarkı Süresi", `\n**${song.formattedDuration}**\n`)

    .addField("<:ses:973599879609868378> | Ses Seviyesi", `%${newQueue.volume}`, true)

      .setColor("AQUA")
    setTimeout(() => {
  queue.textChannel.send({ embeds: [embed], })
    }, 2000)
})

//Distube finish Komutu

client.distube.on("finish", queue => {
  const embed = new MessageEmbed()
        .setDescription(`
<a:destroyer:971145379527680040> | Tüm çalma listesi bitti, sanırım biraz daha müzik dinlemek size iyi gelebilir. <:kedyuzgun:969344668137582643>
[Komutları sınırlandırmak yerine şuraya bir destek linki bırakıyorum](https://top.gg/bot/882730079594086440/vote)
`)
        .setColor('AQUA')

    queue.textChannel.send({ embeds: [embed] })
})

//

.on("initQueue", (queue) => {
    queue.volume = 100;
  });

//

client.distube.on("searchNoResult", (message, query) => message.reply({
  content: "<a:hata:967431448539848754> | Aradığın şarkıyı bulamadım!",
  allowedMentions: {
    repliedUser: false
  }
}));

client.login(process.env.token);
