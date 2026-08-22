const { captureScreenshot } = require('../services/puppeteer');

/**
 * Screenshot alma controller'ı
 */
async function handleScreenshot(req, res, next) {
  try {
    const {
      url,
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
    } = req.body;

    if (!url || typeof url !== 'string' || url.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Lütfen geçerli bir "url" parametresi belirtin.',
      });
    }

    const result = await captureScreenshot({
      url: url.trim(),
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

    return res.send(result.buffer);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  handleScreenshot,
};
