const puppeteer = require('puppeteer');
const config = require('../config');

/**
 * Puppeteer ile ekran görüntüsü alma servisi
 */
async function captureScreenshot(options) {
  let {
    url,
    element,
    fullPage = false,
    format = 'png',
    quality,
    width = 1920,
    height = 1080,
    deviceScaleFactor = 1,
    waitUntil = 'networkidle2',
    delay = 0,
    waitForSelector,
  } = options;

  // URL formatını doğrula
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }

  // Format kontrolü
  const validFormats = ['png', 'jpeg', 'webp'];
  const imageFormat = validFormats.includes(format.toLowerCase()) ? format.toLowerCase() : 'png';

  let browser = null;

  try {
    browser = await puppeteer.launch({
      headless: config.puppeteerHeadless ? 'new' : false,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
      ],
    });

    const page = await browser.newPage();

    // Viewport ayarı
    await page.setViewport({
      width: parseInt(width, 10) || 1920,
      height: parseInt(height, 10) || 1080,
      deviceScaleFactor: parseFloat(deviceScaleFactor) || 1,
    });

    // Sayfaya git
    await page.goto(url, {
      waitUntil: waitUntil || 'networkidle2',
      timeout: config.defaultTimeout,
    });

    // Ekstra gecikme gerekiyorsa
    if (delay > 0) {
      const waitTime = Math.min(parseInt(delay, 10), 10000); // Maksimum 10 saniye
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    // Özel bir selector beklenmesi istenmişse
    if (waitForSelector) {
      await page.waitForSelector(waitForSelector, {
        timeout: 10000,
      });
    }

    // Screenshot parametreleri
    const screenshotOptions = {
      type: imageFormat,
    };

    if ((imageFormat === 'jpeg' || imageFormat === 'webp') && quality) {
      const q = parseInt(quality, 10);
      if (q >= 1 && q <= 100) {
        screenshotOptions.quality = q;
      }
    }

    let buffer;

    // Element seçici belirtilmişse sadece o elementi yakala
    if (element && element.trim() !== '') {
      await page.waitForSelector(element, { timeout: 10000 });
      const elementHandle = await page.$(element);
      if (!elementHandle) {
        const error = new Error(`Belirtilen element bulunamadı: "${element}"`);
        error.statusCode = 400;
        throw error;
      }
      buffer = await elementHandle.screenshot(screenshotOptions);
    } else {
      // Sayfanın tamamı veya viewport
      screenshotOptions.fullPage = Boolean(fullPage);
      buffer = await page.screenshot(screenshotOptions);
    }

    return {
      buffer,
      contentType: `image/${imageFormat}`,
      format: imageFormat,
    };
  } finally {
    if (browser) {
      await browser.close().catch(() => {});
    }
  }
}

module.exports = {
  captureScreenshot,
};
