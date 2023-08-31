const discord = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const fs = require("fs");
const db = require('inflames.db')

module.exports = {
  slash: true,
  name: ["eval"],
  description: "Eval komutu",
  option: [{
    name: "eval",
    description: "eval",
    type: "string",
    require: true
  }],
  async execute(client, interaction, args) {
    if (interaction.user.id !== "564837933912293386") return interaction.reply({
      content: "Sahibime özel komut!",
      ephemeral: true
    });
    try {
      var code = interaction.options.getString("eval")
      var evaled = eval(code);
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
      let Embed = new discord.MessageEmbed()
        .setFooter(`${interaction.user.tag}`, interaction.user.avatarURL())
        .setTimestamp()
        .setColor("AQUA")
        .addField("Giriş", "```js\n" + code + "```")
        .setDescription("```js\n" + clean(evaled) + "```");
      if (Embed.description.length >= 2048)
        Embed.description = Embed.description.substr(0, 2042) + "```...";
      return interaction.reply({
        embeds: [Embed],
        ephemeral: true
      });
    } catch (err) {
      interaction.reply({
        content: `\`\`js\nHATA\` \`\`\`xl\n${clean(err)}\n\`\`\``,
        ephemeral: true
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