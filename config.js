module.exports = {
  stocks: ['ACI', 'SQURPHARMA', 'GP', 'BRACBANK'], // add stock codes you want to track
  frequencyMinutes: 2,

  discord: {
    enabled: true,
    token: process.env.DISCORD_TOKEN,
    clientId: process.env.DISCORD_CLIENT_ID,
    channelId: process.env.DISCORD_CHANNEL_ID
  },

  telegram: {
    enabled: false,
    token: '',
    chatId: ''
  },

  openai: {
    enabled: false,
    apiKey: '',
    model: 'gpt-4'
  }
};
