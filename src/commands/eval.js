const discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const fs = require("fs");
const db = require('inflames.db')

module.exports = {
  name: ["eval"],
  async execute(client, message, args) {
    if (message.author.id !== "564837933912293386") return message.reply({
      content: "Sahibime özel komut!",
      allowedMentions: {
        repliedUser: false
      }
    });
    try {
      var code = args.join(" ");
      var evaled = eval(code);
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
      let Embed = new discord.MessageEmbed()
        .setFooter(`${message.author.tag}`, message.author.avatarURL())
        .setTimestamp()
        .setColor("AQUA")
        .addField("Giriş", "```js\n" + code + "```")
        .setDescription("```js\n" + clean(evaled) + "```");
      if (Embed.description.length >= 2048)
        Embed.description = Embed.description.substr(0, 2042) + "```...";
      return message.reply({
        embeds: [Embed],
        allowedMentions: {
          repliedUser: false
        }
      });
    } catch (err) {
      message.reply({
        content: `\`\`js\nHATA\` \`\`\`xl\n${clean(err)}\n\`\`\``,
        allowedMentions: {
          repliedUser: false
        }
      });
    }
    function clean(text) {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    }
  }
};