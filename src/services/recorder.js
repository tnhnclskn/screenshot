const puppeteer = require('puppeteer');
const path = require('path');
const os = require('os');
const fs = require('fs');
const crypto = require('crypto');
const config = require('../config');
const { autoScrollSmooth } = require('../utils/autoscroll');

/**
 * Puppeteer ile URL veya doğrudan HTML'den video/screencast kaydı alır.
 *
 * @param {Object} options - Kayıt parametreleri
 * @param {string} [options.url] - Kaydedilecek URL
 * @param {string} [options.html] - Kaydedilecek ham HTML içeriği
 * @param {number} [options.duration=5] - Kayıt süresi (saniye, 1-60)
 * @param {number} [options.fps] - Kare hızı (1-60, varsayılan 30, gif için 15)
 * @param {string} [options.format='mp4'] - Çıktı formatı ('mp4' | 'webm' | 'gif')
 * @param {number} [options.width=1920] - Viewport genişliği (px)
 * @param {number} [options.height=1080] - Viewport yüksekliği (px)
 * @param {number} [options.deviceScaleFactor=1] - Retina / DPR ölçeği
 * @param {boolean} [options.scroll=false] - Kayıt süresince sayfayı pürüzsüz kaydırma
 * @param {number} [options.delay=0] - Kayda başlamadan önce bekleme süresi (ms)
 * @param {string} [options.waitForSelector] - Kayıt öncesi beklenecek CSS seçici
 * @param {boolean} [options.darkMode=false] - Dark mode emülasyonu
 * @param {Object} [options.headers] - Özel HTTP istek başlıkları
 * @param {Array} [options.cookies] - Sayfaya eklenecek çerezler
 * @param {string} [options.userAgent] - Özel User-Agent dizesi
 * @param {string|string[]} [options.hideSelectors] - Gizlenecek (visibility:hidden) CSS seçicileri
 * @param {string|string[]} [options.removeSelectors] - DOM'dan silinecek (display:none) CSS seçicileri
 * @param {number} [options.quality] - CRF kalite değeri (0-63, düşük = yüksek kalite)
 * @param {number} [options.scale] - Video ölçekleme çarpanı
 * @param {number} [options.speed] - Video hızlandırma/yavaşlatma çarpanı
 * @returns {Promise<{ buffer: Buffer, contentType: string, format: string, duration: number }>}
 */
async function recordPage(options = {}) {
  let {
    url,
    html,
    duration = config.defaultRecordingDuration || 5,
    fps,
    format = 'mp4',
    width = 1920,
    height = 1080,
    deviceScaleFactor = 1,
    scroll = false,
    delay = 0,
    waitForSelector,
    darkMode = false,
    headers,
    cookies,
    userAgent,
    hideSelectors,
    removeSelectors,
    quality,
    scale,
    speed,
  } = options;

  if (!url && !html) {
    const error = new Error('Lütfen "url" veya "html" parametresinden en az birini belirtin.');
    error.statusCode = 400;
    throw error;
  }

  // Format kontrolü ve normalizasyon
  const validFormats = ['mp4', 'webm', 'gif'];
  const videoFormat = validFormats.includes(format?.toLowerCase()) ? format.toLowerCase() : 'mp4';

  // Duration sınırlandırması (1 ile maxRecordingDuration arası)
  const maxDuration = config.maxRecordingDuration || 60;
  let recDuration = parseFloat(duration) || config.defaultRecordingDuration || 5;
  if (recDuration < 1 || recDuration > maxDuration) {
    const error = new Error(`Kayıt süresi 1 ile ${maxDuration} saniye arasında olmalıdır.`);
    error.statusCode = 400;
    throw error;
  }

  // FPS yapılandırması
  let targetFps = parseInt(fps, 10);
  if (!targetFps || targetFps < 1 || targetFps > 60) {
    targetFps = videoFormat === 'gif' ? 15 : (config.defaultRecordingFps || 30);
  }

  const durationMs = Math.round(recDuration * 1000);
  const tempFilename = `rec-${Date.now()}-${crypto.randomBytes(8).toString('hex')}.${videoFormat}`;
  const tempFilePath = path.join(os.tmpdir(), tempFilename);

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

    let targetWidth = parseInt(width, 10) || 1920;
    let targetHeight = parseInt(height, 10) || 1080;
    targetWidth = targetWidth - (targetWidth % 2);
    targetHeight = targetHeight - (targetHeight % 2);

    // Viewport ayarı
    await page.setViewport({
      width: targetWidth,
      height: targetHeight,
      deviceScaleFactor: parseFloat(deviceScaleFactor) || 1,
    });

    // Dark Mode emülasyonu
    if (darkMode) {
      await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
    }

    // Özel User-Agent
    if (userAgent && typeof userAgent === 'string') {
      await page.setUserAgent(userAgent);
    }

    // Özel HTTP Headers
    if (headers && typeof headers === 'object') {
      await page.setExtraHTTPHeaders(headers);
    }

    // Çerezler
    if (Array.isArray(cookies) && cookies.length > 0) {
      await page.setCookie(...cookies);
    }

    // İçeriği yükle
    if (html && typeof html === 'string' && html.trim() !== '') {
      await page.setContent(html, {
        waitUntil: 'networkidle0',
        timeout: config.defaultTimeout,
      });
    } else {
      let targetUrl = url.trim();
      if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        targetUrl = `https://${targetUrl}`;
      }
      await page.goto(targetUrl, {
        waitUntil: 'networkidle2',
        timeout: config.defaultTimeout,
      });
    }

    // Ekstra bekleme süresi
    if (delay > 0) {
      const waitTime = Math.min(parseInt(delay, 10), 10000);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    // Özel element bekleme
    if (waitForSelector) {
      await page.waitForSelector(waitForSelector, { timeout: 10000 });
    }

    // Element gizleme / silme
    if (hideSelectors || removeSelectors) {
      await page.evaluate((hideList, removeList) => {
        const normalize = (val) => (Array.isArray(val) ? val : [val]);
        if (hideList) {
          normalize(hideList).forEach((sel) => {
            document.querySelectorAll(sel).forEach((el) => {
              el.style.visibility = 'hidden';
            });
          });
        }
        if (removeList) {
          normalize(removeList).forEach((sel) => {
            document.querySelectorAll(sel).forEach((el) => {
              el.style.display = 'none';
            });
          });
        }
      }, hideSelectors, removeSelectors);
    }

    // Tıklanacak element (clickSelector)
    if (options.clickSelector && typeof options.clickSelector === 'string' && options.clickSelector.trim() !== '') {
      const clickTarget = options.clickSelector.trim();
      await page.waitForSelector(clickTarget, { timeout: 10000 });
      await page.click(clickTarget);
    }

    // Element (Crop) Desteği
    let crop = undefined;
    if (options.element && typeof options.element === 'string' && options.element.trim() !== '') {
      const elSelector = options.element.trim();
      await page.waitForSelector(elSelector, { timeout: 10000 });
      const elementHandle = await page.$(elSelector);
      if (!elementHandle) {
        const error = new Error(`Belirtilen element bulunamadı: "${elSelector}"`);
        error.statusCode = 400;
        throw error;
      }

      await page.evaluate((el) => {
        if (el && typeof el.scrollIntoView === 'function') {
          el.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        }
      }, elementHandle).catch(() => {});

      const boundingBox = await elementHandle.boundingBox();
      if (!boundingBox || boundingBox.width <= 0 || boundingBox.height <= 0) {
        const error = new Error(`Belirtilen element görünür bir alana sahip değil: "${elSelector}"`);
        error.statusCode = 400;
        throw error;
      }

      const cropX = Math.max(0, Math.floor(boundingBox.x));
      const cropY = Math.max(0, Math.floor(boundingBox.y));
      const cropWidth = Math.min(Math.floor(boundingBox.width), targetWidth - cropX);
      const cropHeight = Math.min(Math.floor(boundingBox.height), targetHeight - cropY);

      if (cropWidth <= 0 || cropHeight <= 0) {
        const error = new Error(`Belirtilen element viewport sınırları içinde değil: "${elSelector}"`);
        error.statusCode = 400;
        throw error;
      }

      crop = {
        x: cropX,
        y: cropY,
        width: cropWidth,
        height: cropHeight,
      };
    }

    // Screencast seçenekleri
    const screencastOptions = {
      path: tempFilePath,
      fps: targetFps,
      ffmpegPath: config.ffmpegPath,
    };
    if (crop) screencastOptions.crop = crop;

    if (quality !== undefined) {
      const q = parseInt(quality, 10);
      if (!isNaN(q) && q >= 0 && q <= 63) {
        screencastOptions.quality = q;
      }
    }

    if (scale !== undefined) {
      const s = parseFloat(scale);
      if (!isNaN(s) && s > 0 && s <= 4) {
        screencastOptions.scale = s;
      }
    }

    if (speed !== undefined) {
      const sp = parseFloat(speed);
      if (!isNaN(sp) && sp > 0 && sp <= 10) {
        screencastOptions.speed = sp;
      }
    }

    // Kaydı Başlat
    const recorder = await page.screencast(screencastOptions);

    // Kayıt süresi boyunca scroll veya pürüzsüz frame üretimi
    if (scroll === true || scroll === 'true') {
      await autoScrollSmooth(page, durationMs, targetFps);
    } else {
      const frameInterval = Math.max(20, Math.round(1000 / targetFps));
      const startTime = Date.now();
      let frameIndex = 0;
      while (Date.now() - startTime < durationMs) {
        frameIndex++;
        await page.evaluate((f) => {
          document.body.style.opacity = (f % 2 === 0) ? '0.999' : '1';
        }, frameIndex).catch(() => {});
        await new Promise((resolve) => setTimeout(resolve, frameInterval));
      }
    }

    // Kaydı Durdur
    try {
      await recorder.stop();
    } catch (_) {}

    // Üretilen video dosyasını oku
    const buffer = await fs.promises.readFile(tempFilePath);

    let contentType = 'video/mp4';
    if (videoFormat === 'webm') {
      contentType = 'video/webm';
    } else if (videoFormat === 'gif') {
      contentType = 'image/gif';
    }

    return {
      buffer,
      contentType,
      format: videoFormat,
      duration: recDuration,
    };
  } finally {
    // Geçici dosyayı ve browser oturumunu temizle
    if (fs.existsSync(tempFilePath)) {
      await fs.promises.unlink(tempFilePath).catch(() => {});
    }
    if (browser) {
      await browser.close().catch(() => {});
    }
  }
}

module.exports = {
  recordPage,
};
