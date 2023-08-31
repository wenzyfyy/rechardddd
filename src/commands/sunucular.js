const Discord = require('discord.js');


exports.execute = (client, message) => {
  if (message.author.id !== "564837933912293386") return;
  const list = client.guilds.cache.sort((a, b) => a.memberCount - b.memberCount).map(guild => `${guild.name} - ${guild.id} - ${guild.memberCount}`)

  const embeds = [
    new Discord.MessageEmbed()
      .setTitle("Bulunduğum Sunucular:")
      .setDescription(list.slice(0, 60).join("\n")),

    new Discord.MessageEmbed()

      .setDescription(list.slice(60, 120).join("\n") || "Boş")
  ]

  return message.reply({ embeds });



};
exports.name = ["sunucular"]
