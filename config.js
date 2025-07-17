module.exports = {
  // List of stock codes to monitor
  stocks: ['ACI', 'SQURPHARMA', 'GP', 'BRACBANK'],

  // Frequency in minutes to check stock data
  frequencyMinutes: 2,

  // Discord config reads from Render environment variables
  discord: {
    enabled: true,
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.DISCORD_CLIENT_ID,
    channelId: process.env.DISCORD_CHANNEL_ID
  },

  // Telegram (disabled)
  telegram: {
    enabled: false,
    token: '',
    chatId: ''
  },

  // OpenAI (disabled)
  openai: {
    enabled: false,
    apiKey: '',
    model: 'gpt-4'
  }
};
