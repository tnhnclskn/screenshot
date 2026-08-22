/**
 * Modern, interaktif ve şık API Dokümantasyon Sayfası (HTML/CSS/JS)
 */
function renderDocsPage(config) {
  const isAuthEnabled = Boolean(config.apiKey);

  return `<!DOCTYPE html>
<html lang="tr" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Screenshot API — Puppeteer ile Web Ekran Görüntüsü Servisi</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #090d16;
      --card-bg: rgba(18, 24, 38, 0.75);
      --card-border: rgba(255, 255, 255, 0.08);
      --primary: #6366f1;
      --primary-hover: #4f46e5;
      --primary-glow: rgba(99, 102, 241, 0.25);
      --accent: #06b6d4;
      --accent-green: #10b981;
      --text: #f1f5f9;
      --text-muted: #94a3b8;
      --code-bg: #0d1117;
      --border: #1e293b;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: var(--bg);
      color: var(--text);
      line-height: 1.6;
      min-height: 100vh;
      background-image: 
        radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.12) 0px, transparent 50%),
        radial-gradient(at 100% 0%, rgba(6, 182, 212, 0.08) 0px, transparent 50%),
        radial-gradient(at 50% 100%, rgba(139, 92, 246, 0.08) 0px, transparent 50%);
      background-attachment: fixed;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1.5rem 4rem;
    }

    /* Header */
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 2rem;
      border-bottom: 1px solid var(--border);
      margin-bottom: 2.5rem;
    }

    .logo-group {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .logo-icon {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, #6366f1, #06b6d4);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      box-shadow: 0 4px 15px var(--primary-glow);
    }

    .logo-text h1 {
      font-size: 1.4rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .logo-text p {
      font-size: 0.85rem;
      color: var(--text-muted);
    }

    .header-links {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .badge-success {
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.3);
    }

    .badge-auth {
      background: ${isAuthEnabled ? 'rgba(99, 102, 241, 0.15)' : 'rgba(234, 179, 8, 0.15)'};
      color: ${isAuthEnabled ? '#818cf8' : '#facc15'};
      border: 1px solid ${isAuthEnabled ? 'rgba(99, 102, 241, 0.3)' : 'rgba(234, 179, 8, 0.3)'};
    }

    .btn-link {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.9rem;
      font-weight: 500;
      padding: 0.5rem 0.85rem;
      border-radius: 8px;
      border: 1px solid var(--border);
      background: rgba(255,255,255,0.03);
      transition: all 0.2s ease;
    }

    .btn-link:hover {
      color: var(--text);
      border-color: rgba(255,255,255,0.2);
      background: rgba(255,255,255,0.06);
    }

    /* Hero */
    .hero {
      text-align: center;
      margin-bottom: 3.5rem;
    }

    .hero-tag {
      display: inline-block;
      padding: 0.35rem 1rem;
      background: rgba(99, 102, 241, 0.1);
      border: 1px solid rgba(99, 102, 241, 0.25);
      border-radius: 20px;
      color: #818cf8;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 1.25rem;
    }

    .hero h2 {
      font-size: 2.75rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.2;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #ffffff 40%, #94a3b8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero p {
      font-size: 1.15rem;
      color: var(--text-muted);
      max-width: 680px;
      margin: 0 auto;
    }

    /* Grid Layout */
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      margin-bottom: 3rem;
    }

    @media (max-width: 900px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }

    /* Card */
    .card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 1.75rem;
      backdrop-filter: blur(12px);
      box-shadow: 0 10px 30px rgba(0,0,0,0.25);
      transition: transform 0.2s ease, border-color 0.2s ease;
    }

    .card:hover {
      border-color: rgba(255, 255, 255, 0.15);
    }

    .card-title {
      font-size: 1.25rem;
      font-weight: 700;
      margin-bottom: 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }

    /* Playground */
    .form-group {
      margin-bottom: 1.15rem;
    }

    .form-group label {
      display: block;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-muted);
      margin-bottom: 0.4rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    input, select {
      width: 100%;
      padding: 0.7rem 0.9rem;
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid var(--border);
      border-radius: 8px;
      color: var(--text);
      font-family: inherit;
      font-size: 0.9rem;
      transition: all 0.2s;
    }

    input:focus, select:focus {
      outline: none;
      border-color: var(--primary);
      box-shadow: 0 0 0 3px var(--primary-glow);
    }

    .btn-submit {
      width: 100%;
      padding: 0.85rem;
      background: linear-gradient(135deg, var(--primary), var(--primary-hover));
      color: #fff;
      border: none;
      border-radius: 10px;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      transition: all 0.2s;
      box-shadow: 0 4px 14px var(--primary-glow);
    }

    .btn-submit:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px var(--primary-glow);
    }

    .btn-submit:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    /* Live Preview Result */
    #previewContainer {
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid var(--border);
      display: none;
    }

    .preview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }

    .preview-img {
      max-width: 100%;
      border-radius: 8px;
      border: 1px solid var(--border);
      box-shadow: 0 8px 24px rgba(0,0,0,0.4);
      display: block;
      background: #111;
    }

    /* Code Blocks */
    .code-container {
      position: relative;
      background: var(--code-bg);
      border: 1px solid var(--border);
      border-radius: 10px;
      overflow: hidden;
      margin: 1rem 0;
    }

    .code-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem 1rem;
      background: rgba(255, 255, 255, 0.03);
      border-bottom: 1px solid var(--border);
      font-size: 0.8rem;
      color: var(--text-muted);
    }

    .copy-btn {
      background: transparent;
      border: 1px solid var(--border);
      color: var(--text-muted);
      border-radius: 6px;
      padding: 0.25rem 0.6rem;
      font-size: 0.75rem;
      cursor: pointer;
      transition: all 0.2s;
    }

    .copy-btn:hover {
      color: var(--text);
      border-color: rgba(255,255,255,0.3);
    }

    pre {
      padding: 1rem;
      overflow-x: auto;
      font-family: 'Fira Code', monospace;
      font-size: 0.85rem;
      color: #e2e8f0;
      line-height: 1.5;
    }

    /* Endpoint Method Badges */
    .method-badge {
      font-family: 'Fira Code', monospace;
      font-weight: 700;
      font-size: 0.75rem;
      padding: 0.25rem 0.5rem;
      border-radius: 6px;
      margin-right: 0.5rem;
    }

    .method-post {
      background: rgba(16, 185, 129, 0.18);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.4);
    }

    .method-get {
      background: rgba(6, 182, 212, 0.18);
      color: #38bdf8;
      border: 1px solid rgba(6, 182, 212, 0.4);
    }

    /* Table */
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 1rem;
      font-size: 0.875rem;
    }

    th, td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid var(--border);
    }

    th {
      color: var(--text-muted);
      font-weight: 600;
      background: rgba(255,255,255,0.02);
    }

    td code {
      font-family: 'Fira Code', monospace;
      color: #a5b4fc;
      background: rgba(99, 102, 241, 0.12);
      padding: 0.15rem 0.35rem;
      border-radius: 4px;
      font-size: 0.8rem;
    }

    /* Tabs */
    .tab-nav {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
      border-bottom: 1px solid var(--border);
      padding-bottom: 0.5rem;
    }

    .tab-btn {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 0.85rem;
      font-weight: 600;
      padding: 0.35rem 0.75rem;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .tab-btn.active {
      color: #fff;
      background: rgba(99, 102, 241, 0.2);
    }

    /* Footer */
    footer {
      margin-top: 4rem;
      padding-top: 2rem;
      border-top: 1px solid var(--border);
      text-align: center;
      color: var(--text-muted);
      font-size: 0.9rem;
    }

    footer a {
      color: #818cf8;
      text-decoration: none;
      transition: color 0.2s;
    }

    footer a:hover {
      color: #c7d2fe;
      text-decoration: underline;
    }

    .spinner {
      display: inline-block;
      width: 18px;
      height: 18px;
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top-color: #fff;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div class="container">
    
    <!-- Top Bar -->
    <header>
      <div class="logo-group">
        <div class="logo-icon">📸</div>
        <div class="logo-text">
          <h1>Screenshot API</h1>
          <p>Puppeteer Tabanlı Ekran Görüntüsü Mikroservisi</p>
        </div>
      </div>
      <div class="header-links">
        <span class="badge badge-success">● v1.0.0</span>
        <span class="badge badge-auth">${isAuthEnabled ? '🔒 Auth Aktif' : '🔓 Public Mode'}</span>
        <a href="https://github.com/tnhnclskn/screenshot" target="_blank" class="btn-link">GitHub ↗</a>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-tag">⚡ Yüksek Performanslı & Docker Uyumlu</div>
      <h2>Web Ekran Görüntülerini Anında Alın</h2>
      <p>İster tüm sayfayı, ister CSS seçicisiyle (selector) spesifik bir elementi yakalayın. Header kimlik doğrulaması ve zengin parametre desteği ile hazır.</p>
    </section>

    <div class="grid">
      
      <!-- Interactive Playground -->
      <div class="card">
        <div class="card-title">🧪 Canlı Test Alanı (Playground)</div>
        <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 1.25rem;">
          Aşağıdaki formu kullanarak anında canlı ekran görüntüsü isteği oluşturup test edebilirsiniz.
        </p>

        <form id="playgroundForm">
          <div class="form-group">
            <label for="pUrl">Hedef URL *</label>
            <input type="text" id="pUrl" placeholder="https://tunahancaliskan.com" required value="https://tunahancaliskan.com">
          </div>

          <div class="form-group">
            <label for="pElement">Element CSS Seçicisi (Opsiyonel)</label>
            <input type="text" id="pElement" placeholder="h1, .hero, #main (Tüm sayfa için boş bırakın)">
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="pFormat">Format</label>
              <select id="pFormat">
                <option value="png" selected>PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="webp">WEBP</option>
              </select>
            </div>
            <div class="form-group">
              <label for="pFullPage">Tüm Sayfa (Full Page)</label>
              <select id="pFullPage">
                <option value="false" selected>Hayır (Viewport)</option>
                <option value="true">Evet (Full Scroll)</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="pApiKey">API Key Header ${isAuthEnabled ? '<span style="color:#f87171;">(Zorunlu)</span>' : '<span style="color:#94a3b8;">(İsteğe bağlı)</span>'}</label>
            <input type="password" id="pApiKey" placeholder="X-API-Key veya Bearer Token">
          </div>

          <button type="submit" class="btn-submit" id="btnSubmit">
            <span id="btnText">Ekran Görüntüsü Al</span>
          </button>
        </form>

        <div id="previewContainer">
          <div class="preview-header">
            <span style="font-size: 0.85rem; font-weight: 600; color: #34d399;">✓ Görüntü Başarıyla Alındı</span>
            <a id="downloadLink" href="#" download="screenshot.png" class="btn-link" style="padding: 0.2rem 0.6rem; font-size: 0.75rem;">İndir 📥</a>
          </div>
          <img id="previewImage" class="preview-img" src="" alt="Screenshot Önizleme">
        </div>

        <div id="errorContainer" style="display:none; margin-top: 1rem; padding: 0.75rem; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; color: #fca5a5; font-size: 0.85rem;"></div>
      </div>

      <!-- Quick Auth & Docs -->
      <div class="card">
        <div class="card-title">🔐 Kimlik Doğrulama (Auth)</div>
        <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 1rem;">
          Sunucuda <code>API_KEY</code> ortam değişkeni tanımlandığında, isteklerinizde aşağıdaki başlıklardan birini göndermeniz gerekmektedir:
        </p>

        <div class="code-container">
          <div class="code-header">
            <span>Header Yapısı</span>
            <button class="copy-btn" onclick="copyCode('authCode')">Kopyala</button>
          </div>
          <pre id="authCode"><code>X-API-Key: YOUR_SECRET_API_KEY
# veya
Authorization: Bearer YOUR_SECRET_API_KEY</code></pre>
        </div>

        <div class="card-title" style="margin-top: 1.5rem;">🔌 API Endpoint'leri</div>
        
        <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.75rem;">
          <div style="padding: 0.75rem; background: rgba(0,0,0,0.25); border: 1px solid var(--border); border-radius: 8px; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <span class="method-badge method-post">POST</span>
              <code>/screenshot</code> <span style="color: var(--text-muted); font-size: 0.8rem;">(veya <code>/api/screenshot</code>)</span>
            </div>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Görsel Döndürür</span>
          </div>

          <div style="padding: 0.75rem; background: rgba(0,0,0,0.25); border: 1px solid var(--border); border-radius: 8px; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <span class="method-badge method-get">GET</span>
              <code>/up</code> <span style="color: var(--text-muted); font-size: 0.8rem;">(veya <code>/health</code>)</span>
            </div>
            <span style="font-size: 0.75rem; color: #34d399;">Health Status</span>
          </div>

          <div style="padding: 0.75rem; background: rgba(0,0,0,0.25); border: 1px solid var(--border); border-radius: 8px; display: flex; align-items: center; justify-content: space-between;">
            <div>
              <span class="method-badge method-get">GET</span>
              <code>/</code>
            </div>
            <span style="font-size: 0.75rem; color: #38bdf8;">Bu Dokümantasyon</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Parameter Reference Card -->
    <div class="card" style="margin-bottom: 3rem;">
      <div class="card-title">📋 <code>POST /screenshot</code> Parametre Referansı</div>
      <p style="color: var(--text-muted); font-size: 0.875rem;">
        İsteklerinizi <code>application/json</code> veya <code>application/x-www-form-urlencoded</code> formatında gönderebilirsiniz.
      </p>

      <table>
        <thead>
          <tr>
            <th>Parametre</th>
            <th>Tip</th>
            <th>Zorunlu?</th>
            <th>Varsayılan</th>
            <th>Açıklama</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>url</code></td>
            <td>string</td>
            <td><strong style="color: #34d399;">Evet</strong></td>
            <td>-</td>
            <td>Görüntülenecek web sitesi adresi (örn: <code>https://tunahancaliskan.com</code>).</td>
          </tr>
          <tr>
            <td><code>element</code></td>
            <td>string</td>
            <td>Hayır</td>
            <td><code>null</code></td>
            <td>Spesifik bir öğeyi yakalamak için CSS seçicisi (örn: <code>.hero-header</code>, <code>#pricing</code>).</td>
          </tr>
          <tr>
            <td><code>fullPage</code></td>
            <td>boolean</td>
            <td>Hayır</td>
            <td><code>false</code></td>
            <td>Sayfanın tamamını (kaydırılabilir tüm boyutta) yakalamak için <code>true</code> verin.</td>
          </tr>
          <tr>
            <td><code>format</code></td>
            <td>string</td>
            <td>Hayır</td>
            <td><code>png</code></td>
            <td>Görsel formatı: <code>png</code>, <code>jpeg</code>, veya <code>webp</code>.</td>
          </tr>
          <tr>
            <td><code>quality</code></td>
            <td>number</td>
            <td>Hayır</td>
            <td>-</td>
            <td>JPEG ve WEBP formatları için kalite değeri (1 - 100 arası).</td>
          </tr>
          <tr>
            <td><code>width</code> / <code>height</code></td>
            <td>number</td>
            <td>Hayır</td>
            <td><code>1920</code> / <code>1080</code></td>
            <td>Tarayıcı ekran çözünürlüğü boyutları (piksel).</td>
          </tr>
          <tr>
            <td><code>delay</code></td>
            <td>number</td>
            <td>Hayır</td>
            <td><code>0</code></td>
            <td>Çekim öncesi bekleme süresi (milisaniye cinsinden, maks 10000ms).</td>
          </tr>
          <tr>
            <td><code>waitForSelector</code></td>
            <td>string</td>
            <td>Hayır</td>
            <td>-</td>
            <td>Çekimden önce sayfada yüklenmesi beklenecek DOM element seçicisi.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Code Examples -->
    <div class="card">
      <div class="card-title">💻 Entegrasyon Kod Örnekleri</div>
      
      <div class="tab-nav">
        <button class="tab-btn active" onclick="showTab('curlTab', this)">cURL</button>
        <button class="tab-btn" onclick="showTab('jsTab', this)">JavaScript (Fetch)</button>
        <button class="tab-btn" onclick="showTab('pyTab', this)">Python</button>
        <button class="tab-btn" onclick="showTab('phpTab', this)">PHP</button>
        <button class="tab-btn" onclick="showTab('nodeTab', this)">Node.js (Axios)</button>
      </div>

      <!-- cURL -->
      <div id="curlTab" class="tab-content">
        <div class="code-container">
          <div class="code-header">
            <span>Terminal / cURL</span>
            <button class="copy-btn" onclick="copyCode('curlSnippet')">Kopyala</button>
          </div>
          <pre id="curlSnippet"><code>curl -X POST http://localhost:${config.port}/screenshot \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: YOUR_API_KEY" \\
  -d '{
    "url": "https://tunahancaliskan.com",
    "element": "body",
    "format": "png",
    "fullPage": false
  }' \\
  --output screenshot.png</code></pre>
        </div>
      </div>

      <!-- JS -->
      <div id="jsTab" class="tab-content" style="display:none;">
        <div class="code-container">
          <div class="code-header">
            <span>JavaScript (Browser / Node)</span>
            <button class="copy-btn" onclick="copyCode('jsSnippet')">Kopyala</button>
          </div>
          <pre id="jsSnippet"><code>const response = await fetch('http://localhost:${config.port}/screenshot', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'YOUR_API_KEY'
  },
  body: JSON.stringify({
    url: 'https://tunahancaliskan.com',
    element: '.hero',
    format: 'png'
  })
});

const blob = await response.blob();
const imageUrl = URL.createObjectURL(blob);</code></pre>
        </div>
      </div>

      <!-- Python -->
      <div id="pyTab" class="tab-content" style="display:none;">
        <div class="code-container">
          <div class="code-header">
            <span>Python (requests)</span>
            <button class="copy-btn" onclick="copyCode('pySnippet')">Kopyala</button>
          </div>
          <pre id="pySnippet"><code>import requests

url = "http://localhost:${config.port}/screenshot"
headers = {
    "Content-Type": "application/json",
    "X-API-Key": "YOUR_API_KEY"
}
payload = {
    "url": "https://tunahancaliskan.com",
    "format": "webp",
    "fullPage": True
}

response = requests.post(url, json=payload, headers=headers)
if response.status_code == 200:
    with open("screenshot.webp", "wb") as f:
        f.write(response.content)</code></pre>
        </div>
      </div>

      <!-- PHP -->
      <div id="phpTab" class="tab-content" style="display:none;">
        <div class="code-container">
          <div class="code-header">
            <span>PHP (cURL)</span>
            <button class="copy-btn" onclick="copyCode('phpSnippet')">Kopyala</button>
          </div>
          <pre id="phpSnippet"><code>&lt;?php
$ch = curl_init('http://localhost:${config.port}/screenshot');
$data = json_encode([
    'url' => 'https://tunahancaliskan.com',
    'format' => 'png'
]);

curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'X-API-Key: YOUR_API_KEY'
]);

$result = curl_exec($ch);
file_put_contents('screenshot.png', $result);
curl_close($ch);
?&gt;</code></pre>
        </div>
      </div>

      <!-- Node Axios -->
      <div id="nodeTab" class="tab-content" style="display:none;">
        <div class="code-container">
          <div class="code-header">
            <span>Node.js (Axios)</span>
            <button class="copy-btn" onclick="copyCode('nodeSnippet')">Kopyala</button>
          </div>
          <pre id="nodeSnippet"><code>const axios = require('axios');
const fs = require('fs');

async function getScreenshot() {
  const response = await axios.post('http://localhost:${config.port}/screenshot', {
    url: 'https://tunahancaliskan.com',
    format: 'png'
  }, {
    headers: { 'X-API-Key': 'YOUR_API_KEY' },
    responseType: 'arraybuffer'
  });

  fs.writeFileSync('screenshot.png', response.data);
}

getScreenshot();</code></pre>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <footer>
      <p>Geliştirici: <strong>Tunahan Çalışkan</strong></p>
      <p style="margin-top: 0.5rem; display: flex; justify-content: center; gap: 1.5rem;">
        <a href="https://tunahancaliskan.com" target="_blank">tunahancaliskan.com ↗</a>
        <a href="https://tunahancaliskan.com.tr" target="_blank">tunahancaliskan.com.tr ↗</a>
        <a href="https://github.com/tnhnclskn" target="_blank">GitHub ↗</a>
        <a href="mailto:mail@tunahancaliskan.com">İletişim ✉️</a>
      </p>
    </footer>

  </div>

  <script>
    // Tab Değişimi
    function showTab(tabId, el) {
      document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
      document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
      document.getElementById(tabId).style.display = 'block';
      el.classList.add('active');
    }

    // Kod Kopyalama
    function copyCode(elementId) {
      const text = document.getElementById(elementId).innerText;
      navigator.clipboard.writeText(text).then(() => {
        alert('Panoya kopyalandı!');
      });
    }

    // Canlı Form Gönderimi
    document.getElementById('playgroundForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const btn = document.getElementById('btnSubmit');
      const btnText = document.getElementById('btnText');
      const previewContainer = document.getElementById('previewContainer');
      const previewImage = document.getElementById('previewImage');
      const downloadLink = document.getElementById('downloadLink');
      const errorContainer = document.getElementById('errorContainer');

      errorContainer.style.display = 'none';
      previewContainer.style.display = 'none';

      btn.disabled = true;
      btnText.innerHTML = '<span class="spinner"></span> Ekran Görüntüsü Alınıyor...';

      const payload = {
        url: document.getElementById('pUrl').value,
        element: document.getElementById('pElement').value || undefined,
        format: document.getElementById('pFormat').value,
        fullPage: document.getElementById('pFullPage').value === 'true'
      };

      const headers = {
        'Content-Type': 'application/json'
      };

      const apiKey = document.getElementById('pApiKey').value;
      if (apiKey) {
        headers['X-API-Key'] = apiKey;
      }

      try {
        const res = await fetch('/screenshot', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(payload)
        });

        if (!res.ok) {
          let errorMsg = 'Hata oluştu (' + res.status + ')';
          try {
            const errJson = await res.json();
            errorMsg = errJson.message || errJson.error || errorMsg;
          } catch(e) {}
          throw new Error(errorMsg);
        }

        const blob = await res.blob();
        const objectUrl = URL.createObjectURL(blob);

        previewImage.src = objectUrl;
        downloadLink.href = objectUrl;
        downloadLink.download = 'screenshot.' + payload.format;
        previewContainer.style.display = 'block';

      } catch (err) {
        errorContainer.innerText = err.message;
        errorContainer.style.display = 'block';
      } finally {
        btn.disabled = false;
        btnText.innerText = 'Ekran Görüntüsü Al';
      }
    });
  </script>
</body>
</html>`;
}

module.exports = {
  renderDocsPage,
};
