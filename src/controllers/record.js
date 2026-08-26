const { recordPage } = require('../services/recorder');
const config = require('../config');

/**
 * Web sayfası veya HTML içeriğini video/GIF formatında kaydeden controller
 */
async function handleRecord(req, res, next) {
  try {
    let url;
    let html;
    let duration;
    let fps;
    let format;
    let width;
    let height;
    let deviceScaleFactor;
    let scroll;
    let delay;
    let waitForSelector;
    let clickSelector;
    let element;
    let quality;
    let crf;
    let darkMode;
    let headers;
    let cookies;
    let userAgent;
    let hideSelectors;
    let removeSelectors;
    let waitUntil;

    if (typeof req.body === 'string') {
      html = req.body;
      ({
        url,
        duration,
        fps,
        format,
        width,
        height,
        deviceScaleFactor,
        scroll,
        delay,
        waitForSelector,
        clickSelector,
        element,
        quality,
        crf,
        darkMode,
        headers,
        cookies,
        userAgent,
        hideSelectors,
        removeSelectors,
        waitUntil,
      } = req.query);
    } else if (req.body && typeof req.body === 'object') {
      const source = { ...req.query, ...req.body };
      ({
        url,
        html,
        duration,
        fps,
        format,
        width,
        height,
        deviceScaleFactor,
        scroll,
        delay,
        waitForSelector,
        clickSelector,
        element,
        quality,
        crf,
        darkMode,
        headers,
        cookies,
        userAgent,
        hideSelectors,
        removeSelectors,
        waitUntil,
      } = source);
    } else {
      ({
        url,
        html,
        duration,
        fps,
        format,
        width,
        height,
        deviceScaleFactor,
        scroll,
        delay,
        waitForSelector,
        clickSelector,
        element,
        quality,
        crf,
        darkMode,
        headers,
        cookies,
        userAgent,
        hideSelectors,
        removeSelectors,
        waitUntil,
      } = req.query);
    }

    // 1. url veya html varlık kontrolü
    const hasUrl = typeof url === 'string' && url.trim() !== '';
    const hasHtml = typeof html === 'string' && html.trim() !== '';

    if (!hasUrl && !hasHtml) {
      return res.status(400).json({
        success: false,
        error: 'Bad Request',
        message: 'Lütfen geçerli bir "url" veya "html" parametresi belirtin.',
      });
    }

    // 2. duration kontrolü
    if (duration !== undefined && duration !== null && duration !== '') {
      const durNum = Number(duration);
      if (isNaN(durNum) || durNum < 1 || durNum > config.maxRecordingDuration) {
        return res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: `Kayıt süresi (duration) 1 ile ${config.maxRecordingDuration} saniye arasında olmalıdır.`,
        });
      }
    }

    // 3. format kontrolü
    if (format !== undefined && format !== null && format !== '') {
      const validFormats = ['mp4', 'webm', 'gif'];
      if (!validFormats.includes(format.toString().toLowerCase())) {
        return res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: 'Geçersiz format. Desteklenen formatlar: mp4, webm, gif',
        });
      }
    }

    // 4. fps kontrolü
    if (fps !== undefined && fps !== null && fps !== '') {
      const fpsNum = Number(fps);
      if (isNaN(fpsNum) || fpsNum < 1 || fpsNum > 60) {
        return res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: 'FPS değeri 1 ile 60 arasında olmalıdır.',
        });
      }
    }

    const result = await recordPage({
      url: hasUrl ? url.trim() : null,
      html: hasHtml ? html.trim() : null,
      duration,
      fps,
      format,
      width,
      height,
      deviceScaleFactor,
      scroll: scroll === true || scroll === 'true' || scroll === '1',
      delay,
      waitForSelector,
      clickSelector: clickSelector && typeof clickSelector === 'string' ? clickSelector.trim() : null,
      element: element && typeof element === 'string' ? element.trim() : null,
      quality,
      crf,
      darkMode: darkMode === true || darkMode === 'true' || darkMode === '1',
      headers,
      cookies,
      userAgent,
      hideSelectors,
      removeSelectors,
      waitUntil,
    });

    if (res.destroyed || res.writableEnded) {
      return;
    }

    const filename = `record-${Date.now()}.${result.format}`;
    res.set({
      'Content-Type': result.contentType,
      'Content-Length': result.buffer.length,
      'Content-Disposition': `inline; filename="${filename}"`,
      'Cache-Control': 'no-cache',
    });

    return res.end(result.buffer);
  } catch (error) {
    if (!res.destroyed && !res.headersSent) {
      next(error);
    }
  }
}

module.exports = {
  handleRecord,
};
