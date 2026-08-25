/**
 * Belirtilen milisaniye süresi boyunca sayfayı pürüzsüz biçimde aşağı kaydırır.
 * @param {import('puppeteer').Page} page
 * @param {number} durationMs Toplam kaydırma süresi (ms)
 */
async function autoScrollSmooth(page, durationMs = 5000) {
  await page.evaluate(async (duration) => {
    await new Promise((resolve) => {
      const startTime = performance.now();
      const startScrollY = window.scrollY;
      const targetScrollY = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      ) - window.innerHeight;

      if (targetScrollY <= 0) {
        setTimeout(resolve, duration);
        return;
      }

      function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Linear scroll progress
        window.scrollTo(0, startScrollY + (targetScrollY - startScrollY) * progress);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          resolve();
        }
      }

      requestAnimationFrame(step);
    });
  }, durationMs);
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
        const scrollHeight = document.body.scrollHeight;
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

