require('dotenv').config(); // Loads .env variables

module.exports = {
  // List of stock codes to monitor (add or remove as needed)
  stocks: ['ACI', 'SQURPHARMA', 'GP', 'BRACBANK'],

  // Frequency in minutes to check stock data
  frequencyMinutes: 2,

  // Discord configuration (from .env)
  discord: {
    enabled: true,
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.DISCORD_CLIENT_ID,
    channelId: process.env.DISCORD_CHANNEL_ID
  },

  // Telegram (disabled since you chose Discord only)
  telegram: {
    enabled: false,
    token: '',
    chatId: ''
  },

  // OpenAI (disabled for now, enable if needed)
  openai: {
    enabled: false,
    apiKey: '',
    model: 'gpt-4'
  }
};
