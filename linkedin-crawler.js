const puppeteer = require('puppeteer');
const fs = require('fs');
require('dotenv').config();

const LINKEDIN_URL = process.env.LINKEDIN_URL;

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [
      '--window-position=2920,0',
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });

  const page = await browser.newPage();

  // Load cookies
  const cookies = JSON.parse(fs.readFileSync('./converted-cookies.json', 'utf8'));
  await page.setCookie(...cookies);

  // Sử dụng userAgent
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36');
  await page.setExtraHTTPHeaders({
    'Accept-Language': 'ja-JP,ja;q=0.9,en;q=0.8'
  });

  try {
    // Mở trang
    await page.goto(LINKEDIN_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    console.log('✅ Accessed to the page.');

    const fullText = await page.evaluate(() => {
      return document.body.innerText;
    });
    console.log(fullText);

    console.log('🎉 Finished!');
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    // await browser.close();
  }
})();