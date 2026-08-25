const { captureScreenshot } = require('../services/puppeteer');

/**
 * Screenshot alma controller'ı (URL ve HTML desteği)
 */
async function handleScreenshot(req, res, next) {
  try {
    let url;
    let html;
    let element;
    let fullPage;
    let format;
    let quality;
    let width;
    let height;
    let deviceScaleFactor;
    let waitUntil;
    let delay;
    let waitForSelector;

    // Eğer body doğrudan string olarak gelmişse (text/html)
    if (typeof req.body === 'string') {
      html = req.body;
      // Query parametrelerinden opsiyonları al
      element = req.query.element;
      fullPage = req.query.fullPage === 'true';
      format = req.query.format;
      quality = req.query.quality;
      width = req.query.width;
      height = req.query.height;
      deviceScaleFactor = req.query.deviceScaleFactor;
      waitUntil = req.query.waitUntil;
      delay = req.query.delay;
      waitForSelector = req.query.waitForSelector;
    } else if (req.body && typeof req.body === 'object') {
      ({
        url,
        html,
        element,
        fullPage,
        format,
        quality,
        width,
        height,
        deviceScaleFactor,
        waitUntil,
        delay,
        waitForSelector,
      } = req.body);
    }

    if ((!url || url.trim() === '') && (!html || html.trim() === '')) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Lütfen geçerli bir "url" veya "html" parametresi belirtin.',
      });
    }

    const result = await captureScreenshot({
      url: url ? url.trim() : null,
      html: html ? html.trim() : null,
      element: element ? element.trim() : null,
      fullPage: fullPage === true || fullPage === 'true',
      format,
      quality,
      width,
      height,
      deviceScaleFactor,
      waitUntil,
      delay,
      waitForSelector,
    });

    res.set({
      'Content-Type': result.contentType,
      'Content-Length': result.buffer.length,
      'Cache-Control': 'public, max-age=60',
    });

    return res.end(result.buffer);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  handleScreenshot,
};
