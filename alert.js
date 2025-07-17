const axios = require('axios');
const { discord, telegram } = require('./config');

async function sendDiscord(message) {
  if (!discord.enabled) return;
  try {
    await axios.post(
      `https://discord.com/api/channels/${discord.channelId}/messages`,
      { content: message },
      { headers: { Authorization: `Bot ${discord.token}` } }
    );
  } catch (e) {
    console.error('Discord alert failed:', e.message);
  }
}

async function sendTelegram(message) {
  if (!telegram.enabled) return;
  try {
    await axios.post(
      `https://api.telegram.org/bot${telegram.token}/sendMessage`,
      { chat_id: telegram.chatId, text: message }
    );
  } catch (e) {
    console.error('Telegram alert failed:', e.message);
  }
}

function sendAlert(msg) {
  sendDiscord(msg);
  sendTelegram(msg);
}

module.exports = { sendAlert };
