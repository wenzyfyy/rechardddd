// Gerekli paketleri yükleyin
const { Client, GatewayIntentBits, Partials, EmbedBuilder } = require('discord.js');
const { DisTube } = require("distube");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { SpotifyPlugin } = require("@distube/spotify");
const { YtDlpPlugin } = require("@distube/yt-dlp");
const db = require("inflames.db");
require('dotenv').config();

// Discord client ayarları
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages
  ],
  partials: [Partials.Channel]
});

// DisTube ayarları
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
        clientSecret: "88ba1be765944535878fc5cd892a9591",
      },
    }),
    new YtDlpPlugin(),
  ],
});

// Express.js sunucu
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Power By FastUptime'));
app.listen(port, () => console.log(`Bot şu adreste çalışıyor: http://localhost:${port}`));

// DM mesajları kaydetme
client.on('messageCreate', message => {
  if (message.author.bot) return;

  const attachment = message.attachments.first();
  if (message.channel.type === 'DM') {
    console.log(message.content);

    const dmLogEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} Dm`)
      .setTimestamp()
      .setColor("AQUA")
      .setThumbnail(`${message.author.displayAvatarURL()}`)
      .addFields(
        { name: "Gönderen", value: message.author.tag },
        { name: "Gönderen ID", value: message.author.id },
        { name: "Gönderilen Mesaj", value: message.content }
      );

    if (message.attachments.size !== 0) {
      dmLogEmbed.setImage(attachment.url);
    }

    client.users.fetch("564837933912293386").then((user) => {
      user.send({ embeds: [dmLogEmbed] });
    });
  }
});

// DisTube olayları
client.distube
  .on("addSong", (queue, song) => {
    const embed = new EmbedBuilder()
      .setColor("AQUA")
      .setDescription(`<:liste:973937322049548332> | Listeye Eklendi:
      **${song.name}**
      **Süre:** ${song.formattedDuration}`)
      .setTimestamp();

    queue.textChannel.send({ embeds: [embed] });
  })

  .on("playSong", (queue, song) => {
    const newQueue = client.distube.getQueue(queue.id);
    const embed = new EmbedBuilder()
      .addFields(
        { name: "🎵 | Şarkı Adı", value: `\n**[${song.name}](${song.url})**\n` },
        { name: "<:YouTube:967436296907812874> | Şarkı Kanalı", value: `\n**[${song.uploader.name}](${song.uploader.url})**\n` },
        { name: ":timer: | Şarkı Süresi", value: `\n**${song.formattedDuration}**\n` },
        { name: "<:ses:973599879609868378> | Ses Seviyesi", value: `%${newQueue.volume}`, inline: true }
      )
      .setImage(song.thumbnail)
      .setColor("AQUA");

    setTimeout(() => {
      queue.textChannel.send({ embeds: [embed] });
    }, 2000);
  })

  .on("finish", (queue) => {
    const embed = new EmbedBuilder()
      .setDescription(`
      <a:destroyer:971145379527680040> | Tüm çalma listesi bitti. Müzik dinlemeye devam edebilirsin! <:kedyuzgun:969344668137582643>
      [Daha fazlası için buraya tıkla!](https://top.gg/bot/882730079594086440/vote)
      `)
      .setColor("AQUA");

    queue.textChannel.send({ embeds: [embed] });
  })

  .on("initQueue", (queue) => {
    queue.volume = 100;
  })

  .on('error', (channel, error) => {
    console.error(error);
    channel.send(`Bir hata oluştu: ${error.message.slice(0, 1979)}`);
  })

  .on("searchNoResult", (message) => {
    message.reply({
      content: "<a:hata:967431448539848754> | Aradığın şarkıyı bulamadım!",
      allowedMentions: { repliedUser: false },
    });
  });

client.login(process.env.TOKEN);
