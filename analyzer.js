const axios = require('axios');
const cheerio = require('cheerio');
const { sendAlert } = require('./alert');

async function fetchStockDataDSE(code) {
  try {
    const url = 'https://www.dsebd.org/latest_share_price_scroll_l.php';
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let stockData = null;

    $('table#dataTable tr').each((i, row) => {
      const tds = $(row).find('td');
      if (tds.length > 0) {
        const stockCode = $(tds[1]).text().trim();
        if (stockCode === code) {
          stockData = {
            code: stockCode,
            name: $(tds[0]).text().trim(),
            lastTradePrice: parseFloat($(tds[2]).text().trim()) || 0,
            high: parseFloat($(tds[3]).text().trim()) || 0,
            low: parseFloat($(tds[4]).text().trim()) || 0,
            closePrice: parseFloat($(tds[5]).text().trim()) || 0,
            ycp: parseFloat($(tds[6]).text().trim()) || 0, // yesterday close price
            change: parseFloat($(tds[7]).text().trim()) || 0,
            trade: $(tds[8]).text().trim(),
            valueInLakh: $(tds[9]).text().trim(),
            volume: $(tds[10]).text().trim(),
            marketCap: $(tds[11]).text().trim()
          };
          return false; // break loop
        }
      }
    });

    if (!stockData) {
      console.log(`Stock code ${code} not found on DSE.`);
      return null;
    }

    return stockData;
  } catch (err) {
    console.error('Error fetching from DSE:', err.message);
    return null;
  }
}

async function analyzeStock(code) {
  const stock = await fetchStockDataDSE(code);
  if (!stock) return;

  const { name, lastTradePrice, change } = stock;

  let message = `📊 **${name} (${code})**\nPrice: ৳${lastTradePrice.toFixed(2)}\nChange: ${change}%`;

  if (Math.abs(change) >= 5) {
    message += `\n🚨 Significant movement detected!`;
    sendAlert(message);
  }

  if (Math.abs(change) >= 10) {
    message += `\n🔥 Emergency Alert: Big spike!`;
    sendAlert(message);
  }

  console.log(message);
}

module.exports = { analyzeStock };
