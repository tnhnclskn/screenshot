const puppeteer = require('puppeteer');
const config = require('../config');

/**
 * Puppeteer ile URL veya HTML'den ekran görüntüsü alma servisi
 */
async function captureScreenshot(options) {
  let {
    url,
    html,
    element,
    fullPage = false,
    format = 'png',
    quality,
    width = 1920,
    height = 1080,
    deviceScaleFactor = 1,
    waitUntil,
    delay = 0,
    waitForSelector,
  } = options;

  if (!url && !html) {
    const error = new Error('Lütfen "url" veya "html" parametresinden en az birini belirtin.');
    error.statusCode = 400;
    throw error;
  }

  // Format kontrolü
  const validFormats = ['png', 'jpeg', 'webp'];
  const imageFormat = validFormats.includes(format?.toLowerCase()) ? format.toLowerCase() : 'png';

  let browser = null;

  try {
    const launchOptions = {
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
    };

    if (config.puppeteerExecutablePath) {
      launchOptions.executablePath = config.puppeteerExecutablePath;
    }

    browser = await puppeteer.launch(launchOptions);

    const page = await browser.newPage();

    // Viewport ayarı
    await page.setViewport({
      width: parseInt(width, 10) || 1920,
      height: parseInt(height, 10) || 1080,
      deviceScaleFactor: parseFloat(deviceScaleFactor) || 1,
    });

    // İçeriği yükle: HTML string mi yoksa URL mi?
    if (html && typeof html === 'string' && html.trim() !== '') {
      await page.setContent(html, {
        waitUntil: waitUntil || 'networkidle0',
        timeout: config.defaultTimeout,
      });
    } else {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `https://${url}`;
      }
      await page.goto(url, {
        waitUntil: waitUntil || 'networkidle2',
        timeout: config.defaultTimeout,
      });
    }

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
