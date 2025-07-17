const { Client, GatewayIntentBits, REST, Routes, Events } = require('discord.js');
const fs = require('fs');
const path = require('path');
const { discord } = require('../config');
const prefixPath = path.join(__dirname, 'prefix.json');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

function getPrefix() {
  try {
    const data = JSON.parse(fs.readFileSync(prefixPath));
    return data.prefix || '!';
  } catch {
    return '!';
  }
}

// Register slash commands
const slashCommands = [{ name: 'help', description: 'Show commands' }];
const rest = new REST({ version: '10' }).setToken(discord.token);

(async () => {
  try {
    await rest.put(Routes.applicationCommands(discord.clientId), { body: slashCommands });
    console.log('✅ Slash commands registered.');
  } catch (err) {
    console.error('Slash registration error:', err);
  }
})();

client.on('messageCreate', (msg) => {
  if (msg.author.bot) return;
  const prefix = getPrefix();
  if (!msg.content.startsWith(prefix)) return;

  const [cmd, ...args] = msg.content.slice(prefix.length).trim().split(/\s+/);

  if (cmd === 'help') {
    msg.channel.send(`Commands:\n• \`${prefix}prefix <new>\`\n• \`${prefix}help\``);
  }

  if (cmd === 'prefix') {
    const newP = args[0];
    if (!newP) return msg.reply('⚠️ Provide a new prefix.');
    fs.writeFileSync(prefixPath, JSON.stringify({ prefix: newP }, null, 2));
    msg.reply(`✅ Prefix changed to \`${newP}\``);
  }
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'help') {
    await interaction.reply({
      content: `Commands:\n• \`${getPrefix()}prefix <new>\`\n• \`/help\``,
      ephemeral: true
    });
  }
});

client.login(discord.token);
