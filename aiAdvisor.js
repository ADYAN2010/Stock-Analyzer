const axios = require('axios');
const { openai } = require('./config');

async function suggestWithAI(name, price, change) {
  if (!openai.enabled) return 'AI is disabled.';
  try {
    const res = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: openai.model,
        messages: [
          {
            role: 'user',
            content: `Provide a concise stock insight for ${name}, currently at ৳${price} with a change of ${change}%.`
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${openai.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return res.data.choices[0].message.content.trim();
  } catch (err) {
    return 'AI Error: ' + err.message;
  }
}

module.exports = { suggestWithAI };
