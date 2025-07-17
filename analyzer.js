const axios = require('axios');
const { sendAlert } = require('./alert');
const { suggestWithAI } = require('./aiAdvisor');
const { openai } = require('./config');

async function fetchStock(code) {
  try {
    const url = `https://www.amarstock.com/latest/price/${code}?_=${Date.now()}`;
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error(`❌ Fetch failed for ${code}:`, err.message);
  }
}

async function analyzeStock(code) {
  const data = await fetchStock(code);
  if (!data) return;

  const name = data.scrip;
  const price = parseFloat(data.ltp);
  const change = parseFloat(data.changePercentage);

  let message = `📊 ${name} (${code}) · ৳${price} (${change}%)`;

  if (Math.abs(change) >= 5) {
    message += `\n🚨 Significant movement!`;
    sendAlert(message);
  }

  if (Math.abs(change) >= 10) {
    message += `\n🔥 Emergency Alert: Big spike!`;
    sendAlert(message);
  }

  if (openai.enabled) {
    const aiAdvice = await suggestWithAI(name, price, change);
    message += `\n🤖 AI Advice: ${aiAdvice}`;
    sendAlert(message);
  }

  console.log(message);
}

module.exports = { analyzeStock };
