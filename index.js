const cron = require('node-cron');
const { stocks, frequencyMinutes } = require('./config');
const { analyzeStock } = require('./analyzer');
require('./discord/bot');

console.log('📈 Stock Bot Started...');

cron.schedule(`*/${frequencyMinutes} * * * *`, async () => {
  console.log('⏱️ Checking stocks at', new Date().toLocaleTimeString());
  for (const code of stocks) {
    await analyzeStock(code);
  }
});
