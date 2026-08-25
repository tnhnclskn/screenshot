/**
 * Belirtilen milisaniye süresi boyunca sayfayı pürüzsüz biçimde aşağı kaydırır.
 * Node.js kontrollü frame döngüsü sayesinde headless tarayıcılarda rAF throttling'i engeller,
 * tüm olası scrollable elementleri (window, html, body, scrollingElement) senkronize kaydırır.
 *
 * @param {import('puppeteer').Page} page
 * @param {number} durationMs Toplam kaydırma süresi (ms)
 * @param {number} [fps=30] Hedef kare hızı
 */
async function autoScrollSmooth(page, durationMs = 5000, fps = 30) {
  // 1. Sayfadaki çakışan scroll-behavior'ı devre dışı bırak
  await page.evaluate(() => {
    try {
      const style = document.createElement('style');
      style.id = '__autoscroll_override_style__';
      style.textContent = '* { scroll-behavior: auto !important; }';
      document.head.appendChild(style);
    } catch (_) {}
  }).catch(() => {});

  const intervalMs = Math.max(16, Math.round(1000 / (fps || 30)));
  const startTime = Date.now();

  while (true) {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / durationMs, 1);

    await page.evaluate((prog) => {
      // En güncel toplam scrollable yüksekliği bul
      const docHeight = Math.max(
        document.body ? document.body.scrollHeight : 0,
        document.documentElement ? document.documentElement.scrollHeight : 0,
        document.body ? document.body.offsetHeight : 0,
        document.documentElement ? document.documentElement.offsetHeight : 0,
        document.body ? document.body.clientHeight : 0,
        document.documentElement ? document.documentElement.clientHeight : 0
      );

      const maxScroll = Math.max(0, docHeight - window.innerHeight);
      const currentTargetY = maxScroll * prog;

      // Tüm olası scroll hedeflerini kaydır
      window.scrollTo(0, currentTargetY);
      if (document.documentElement) document.documentElement.scrollTop = currentTargetY;
      if (document.body) document.body.scrollTop = currentTargetY;
      if (document.scrollingElement) document.scrollingElement.scrollTop = currentTargetY;

      // Frame raster invalidation için hafif opacity toggle
      if (document.body) {
        document.body.style.opacity = (Math.round(prog * 100) % 2 === 0) ? '0.999' : '1';
      }
    }, progress).catch(() => {});

    if (progress >= 1 || elapsed >= durationMs) {
      break;
    }

    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
}

/**
 * Adım adım basit scroll fonksiyonu
 * @param {import('puppeteer').Page} page
 */
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body ? document.body.scrollHeight : 1000;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

module.exports = {
  autoScroll,
  autoScrollSmooth,
};
