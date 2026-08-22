require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  apiKey: process.env.API_KEY || null,
  nodeEnv: process.env.NODE_ENV || 'development',
  defaultTimeout: parseInt(process.env.DEFAULT_TIMEOUT || '30000', 10),
  puppeteerHeadless: process.env.PUPPETEER_HEADLESS !== 'false',
};
