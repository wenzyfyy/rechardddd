const fs = require("node:fs");
const path = require("node:path");
const { REST, Routes, Collection, SlashCommandBuilder } = require('discord.js');
const { botid } = require("./settings.json");

const commands = [];
const eventsPath = path.join(__dirname, "../events");
const commandsPath = path.join(__dirname, "../commands");

const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith(".js"));
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

module.exports = (client) => {
  client.commands = new Collection();
  client.slashcommands = new Collection();

  // Eventleri yükleme
  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
  }

  // Komutları yükleme
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    // Slash komutlarını işleme
    if (command.slash) {
      client.slashcommands.set(command.name[0], command);
      const slashCommand = new SlashCommandBuilder()
        .setName(command.name[0])
        .setDescription(command.description);

      if (command.options) {
        for (let i = 0; i < command.options.length; i++) {
          const option = command.options[i];
          switch (option.type.toLowerCase()) {
            case 'string':
              slashCommand.addStringOption(opt => 
                opt.setName(option.name).setDescription(option.description).setRequired(option.required));
              break;
            case 'integer':
              slashCommand.addIntegerOption(opt => 
                opt.setName(option.name).setDescription(option.description).setRequired(option.required));
              break;
            case 'number':
              slashCommand.addNumberOption(opt => 
                opt.setName(option.name).setDescription(option.description).setRequired(option.required));
              break;
            case 'boolean':
              slashCommand.addBooleanOption(opt => 
                opt.setName(option.name).setDescription(option.description).setRequired(option.required));
              break;
            case 'user':
              slashCommand.addUserOption(opt => 
                opt.setName(option.name).setDescription(option.description).setRequired(option.required));
              break;
            case 'channel':
              slashCommand.addChannelOption(opt => 
                opt.setName(option.name).setDescription(option.description).setRequired(option.required));
              break;
            case 'role':
              slashCommand.addRoleOption(opt => 
                opt.setName(option.name).setDescription(option.description).setRequired(option.required));
              break;
            case 'mentionable':
              slashCommand.addMentionableOption(opt => 
                opt.setName(option.name).setDescription(option.description).setRequired(option.required));
              break;
            default:
              console.warn(`Geçersiz seçenek türü: ${option.type}`);
          }
        }
      }
      commands.push(slashCommand.toJSON());
    }

    // Normal (prefixli) komutları işleme
    if (!command.slash) {
      for (let i = 0; i < command.name.length; i++) {
        client.commands.set(command.name[i], command);
      }
    }
  }
};

// REST API'yi kullanarak komutları Discord'a yükleme
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

client.once('ready', async () => {
  try {
    console.log('Komutlar Discord API\'ye yükleniyor...');
    await rest.put(Routes.applicationCommands(botid), { body: commands });
    console.log('Tüm komutlar başarıyla yüklendi.');
  } catch (error) {
    console.error('Komutlar yüklenirken bir hata oluştu:', error);
  }
});
