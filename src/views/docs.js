/**
 * Modern, interaktif ve şık API Dokümantasyon Sayfası (HTML/CSS/JS)
 * Web & HTML Screenshot & Screen Recording API
 */
function renderDocsPage(config) {
  const isAuthEnabled = Boolean(config.apiKey);
  const port = config.port || 3000;

  return '<!DOCTYPE html>' +
'<html lang="tr" class="dark">' +
'<head>' +
'  <meta charset="UTF-8">' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">' +
'  <title>Screenshot & Screen Recording API — Puppeteer ile Web & HTML Görsel ve Video Servisi</title>' +
'  <link rel="preconnect" href="https://fonts.googleapis.com">' +
'  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
'  <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">' +
'  <style>' +
'    :root {' +
'      --bg: #090d16;' +
'      --card-bg: rgba(18, 24, 38, 0.75);' +
'      --card-border: rgba(255, 255, 255, 0.08);' +
'      --primary: #6366f1;' +
'      --primary-hover: #4f46e5;' +
'      --primary-glow: rgba(99, 102, 241, 0.25);' +
'      --accent: #06b6d4;' +
'      --accent-purple: #a855f7;' +
'      --accent-green: #10b981;' +
'      --text: #f1f5f9;' +
'      --text-muted: #94a3b8;' +
'      --code-bg: #0d1117;' +
'      --border: #1e293b;' +
'    }' +
'    * {' +
'      box-sizing: border-box;' +
'      margin: 0;' +
'      padding: 0;' +
'    }' +
'    body {' +
'      font-family: \'Inter\', -apple-system, BlinkMacSystemFont, sans-serif;' +
'      background-color: var(--bg);' +
'      color: var(--text);' +
'      line-height: 1.6;' +
'      min-height: 100vh;' +
'      background-image:' +
'        radial-gradient(at 0% 0%, rgba(99, 102, 241, 0.12) 0px, transparent 50%),' +
'        radial-gradient(at 100% 0%, rgba(6, 182, 212, 0.08) 0px, transparent 50%),' +
'        radial-gradient(at 50% 100%, rgba(168, 85, 247, 0.08) 0px, transparent 50%);' +
'      background-attachment: fixed;' +
'    }' +
'    .container {' +
'      max-width: 1200px;' +
'      margin: 0 auto;' +
'      padding: 2rem 1.5rem 4rem;' +
'    }' +
'    header {' +
'      display: flex;' +
'      justify-content: space-between;' +
'      align-items: center;' +
'      padding-bottom: 2rem;' +
'      border-bottom: 1px solid var(--border);' +
'      margin-bottom: 2.5rem;' +
'      flex-wrap: wrap;' +
'      gap: 1rem;' +
'    }' +
'    .logo-group {' +
'      display: flex;' +
'      align-items: center;' +
'      gap: 1rem;' +
'    }' +
'    .logo-icon {' +
'      width: 48px;' +
'      height: 48px;' +
'      background: linear-gradient(135deg, #6366f1, #a855f7, #06b6d4);' +
'      border-radius: 14px;' +
'      display: flex;' +
'      align-items: center;' +
'      justify-content: center;' +
'      font-size: 1.6rem;' +
'      box-shadow: 0 4px 18px var(--primary-glow);' +
'    }' +
'    .logo-text h1 {' +
'      font-size: 1.35rem;' +
'      font-weight: 700;' +
'      letter-spacing: -0.02em;' +
'    }' +
'    .logo-text p {' +
'      font-size: 0.85rem;' +
'      color: var(--text-muted);' +
'    }' +
'    .header-links {' +
'      display: flex;' +
'      align-items: center;' +
'      gap: 0.6rem;' +
'      flex-wrap: wrap;' +
'    }' +
'    .badge {' +
'      display: inline-flex;' +
'      align-items: center;' +
'      gap: 0.4rem;' +
'      padding: 0.25rem 0.75rem;' +
'      border-radius: 9999px;' +
'      font-size: 0.75rem;' +
'      font-weight: 600;' +
'      text-transform: uppercase;' +
'      letter-spacing: 0.05em;' +
'    }' +
'    .badge-success {' +
'      background: rgba(16, 185, 129, 0.15);' +
'      color: #34d399;' +
'      border: 1px solid rgba(16, 185, 129, 0.3);' +
'    }' +
'    .badge-video {' +
'      background: rgba(168, 85, 247, 0.15);' +
'      color: #c084fc;' +
'      border: 1px solid rgba(168, 85, 247, 0.3);' +
'    }' +
'    .badge-auth {' +
'      background: ' + (isAuthEnabled ? 'rgba(99, 102, 241, 0.15)' : 'rgba(234, 179, 8, 0.15)') + ';' +
'      color: ' + (isAuthEnabled ? '#818cf8' : '#facc15') + ';' +
'      border: 1px solid ' + (isAuthEnabled ? 'rgba(99, 102, 241, 0.3)' : 'rgba(234, 179, 8, 0.3)') + ';' +
'    }' +
'    .btn-link {' +
'      color: var(--text-muted);' +
'      text-decoration: none;' +
'      font-size: 0.85rem;' +
'      font-weight: 500;' +
'      padding: 0.45rem 0.85rem;' +
'      border-radius: 8px;' +
'      border: 1px solid var(--border);' +
'      background: rgba(255,255,255,0.03);' +
'      transition: all 0.2s ease;' +
'      display: inline-flex;' +
'      align-items: center;' +
'      gap: 0.35rem;' +
'    }' +
'    .btn-link:hover {' +
'      color: var(--text);' +
'      border-color: rgba(255,255,255,0.2);' +
'      background: rgba(255,255,255,0.06);' +
'    }' +
'    .hero {' +
'      text-align: center;' +
'      margin-bottom: 3.5rem;' +
'    }' +
'    .hero-tag {' +
'      display: inline-flex;' +
'      align-items: center;' +
'      gap: 0.5rem;' +
'      padding: 0.35rem 1rem;' +
'      background: rgba(99, 102, 241, 0.1);' +
'      border: 1px solid rgba(99, 102, 241, 0.25);' +
'      border-radius: 20px;' +
'      color: #818cf8;' +
'      font-size: 0.85rem;' +
'      font-weight: 600;' +
'      margin-bottom: 1.25rem;' +
'    }' +
'    .hero h2 {' +
'      font-size: 2.6rem;' +
'      font-weight: 800;' +
'      letter-spacing: -0.03em;' +
'      line-height: 1.2;' +
'      margin-bottom: 1rem;' +
'      background: linear-gradient(135deg, #ffffff 30%, #c7d2fe 70%, #a5b4fc 100%);' +
'      -webkit-background-clip: text;' +
'      -webkit-text-fill-color: transparent;' +
'    }' +
'    .hero p {' +
'      font-size: 1.15rem;' +
'      color: var(--text-muted);' +
'      max-width: 720px;' +
'      margin: 0 auto;' +
'    }' +
'    .grid {' +
'      display: grid;' +
'      grid-template-columns: 1fr 1fr;' +
'      gap: 2rem;' +
'      margin-bottom: 3rem;' +
'    }' +
'    @media (max-width: 960px) {' +
'      .grid {' +
'        grid-template-columns: 1fr;' +
'      }' +
'    }' +
'    .card {' +
'      background: var(--card-bg);' +
'      border: 1px solid var(--card-border);' +
'      border-radius: 16px;' +
'      padding: 1.75rem;' +
'      backdrop-filter: blur(12px);' +
'      box-shadow: 0 10px 30px rgba(0,0,0,0.25);' +
'      transition: transform 0.2s ease, border-color 0.2s ease;' +
'    }' +
'    .card:hover {' +
'      border-color: rgba(255, 255, 255, 0.15);' +
'    }' +
'    .card-title {' +
'      font-size: 1.25rem;' +
'      font-weight: 700;' +
'      margin-bottom: 1.25rem;' +
'      display: flex;' +
'      align-items: center;' +
'      gap: 0.6rem;' +
'    }' +
'    .switcher-label {' +
'      font-size: 0.75rem;' +
'      font-weight: 700;' +
'      text-transform: uppercase;' +
'      letter-spacing: 0.05em;' +
'      color: var(--text-muted);' +
'      margin-bottom: 0.35rem;' +
'    }' +
'    .mode-switcher {' +
'      display: flex;' +
'      background: rgba(15, 23, 42, 0.8);' +
'      border: 1px solid var(--border);' +
'      border-radius: 10px;' +
'      padding: 0.25rem;' +
'      margin-bottom: 1rem;' +
'      gap: 0.25rem;' +
'    }' +
'    .mode-btn {' +
'      flex: 1;' +
'      padding: 0.55rem 0.5rem;' +
'      border: none;' +
'      background: transparent;' +
'      color: var(--text-muted);' +
'      font-weight: 600;' +
'      font-size: 0.85rem;' +
'      border-radius: 8px;' +
'      cursor: pointer;' +
'      transition: all 0.2s;' +
'      display: flex;' +
'      align-items: center;' +
'      justify-content: center;' +
'      gap: 0.4rem;' +
'    }' +
'    .mode-btn.active {' +
'      background: var(--primary);' +
'      color: #fff;' +
'      box-shadow: 0 2px 8px var(--primary-glow);' +
'    }' +
'    .mode-btn.active-record {' +
'      background: linear-gradient(135deg, #a855f7, #6366f1);' +
'      color: #fff;' +
'      box-shadow: 0 2px 10px rgba(168, 85, 247, 0.35);' +
'    }' +
'    .form-group {' +
'      margin-bottom: 1.15rem;' +
'    }' +
'    .form-group label {' +
'      display: block;' +
'      font-size: 0.85rem;' +
'      font-weight: 600;' +
'      color: var(--text-muted);' +
'      margin-bottom: 0.4rem;' +
'    }' +
'    .form-row {' +
'      display: grid;' +
'      grid-template-columns: 1fr 1fr;' +
'      gap: 1rem;' +
'    }' +
'    @media (max-width: 500px) {' +
'      .form-row {' +
'        grid-template-columns: 1fr;' +
'      }' +
'    }' +
'    input, select, textarea {' +
'      width: 100%;' +
'      padding: 0.7rem 0.9rem;' +
'      background: rgba(15, 23, 42, 0.8);' +
'      border: 1px solid var(--border);' +
'      border-radius: 8px;' +
'      color: var(--text);' +
'      font-family: inherit;' +
'      font-size: 0.9rem;' +
'      transition: all 0.2s;' +
'    }' +
'    textarea {' +
'      font-family: \'Fira Code\', monospace;' +
'      font-size: 0.8rem;' +
'      line-height: 1.4;' +
'      resize: vertical;' +
'      min-height: 130px;' +
'    }' +
'    input:focus, select:focus, textarea:focus {' +
'      outline: none;' +
'      border-color: var(--primary);' +
'      box-shadow: 0 0 0 3px var(--primary-glow);' +
'    }' +
'    .btn-submit {' +
'      width: 100%;' +
'      padding: 0.9rem;' +
'      background: linear-gradient(135deg, var(--primary), var(--primary-hover));' +
'      color: #fff;' +
'      border: none;' +
'      border-radius: 10px;' +
'      font-weight: 600;' +
'      font-size: 0.95rem;' +
'      cursor: pointer;' +
'      display: flex;' +
'      align-items: center;' +
'      justify-content: center;' +
'      gap: 0.5rem;' +
'      transition: all 0.2s;' +
'      box-shadow: 0 4px 14px var(--primary-glow);' +
'    }' +
'    .btn-submit.btn-submit-record {' +
'      background: linear-gradient(135deg, #a855f7, #6366f1);' +
'      box-shadow: 0 4px 14px rgba(168, 85, 247, 0.35);' +
'    }' +
'    .btn-submit:hover {' +
'      transform: translateY(-1px);' +
'      box-shadow: 0 6px 20px var(--primary-glow);' +
'    }' +
'    .btn-submit:disabled {' +
'      opacity: 0.6;' +
'      cursor: not-allowed;' +
'      transform: none;' +
'    }' +
'    #previewContainer {' +
'      margin-top: 1.5rem;' +
'      padding-top: 1.5rem;' +
'      border-top: 1px solid var(--border);' +
'      display: none;' +
'    }' +
'    .preview-header {' +
'      display: flex;' +
'      justify-content: space-between;' +
'      align-items: center;' +
'      margin-bottom: 0.75rem;' +
'      flex-wrap: wrap;' +
'      gap: 0.5rem;' +
'    }' +
'    .preview-img, .preview-video {' +
'      width: 100%;' +
'      max-height: 460px;' +
'      object-fit: contain;' +
'      border-radius: 8px;' +
'      border: 1px solid var(--border);' +
'      box-shadow: 0 8px 24px rgba(0,0,0,0.4);' +
'      display: block;' +
'      background: #0d1117;' +
'    }' +
'    .code-container {' +
'      position: relative;' +
'      background: var(--code-bg);' +
'      border: 1px solid var(--border);' +
'      border-radius: 10px;' +
'      overflow: hidden;' +
'      margin: 1rem 0;' +
'    }' +
'    .code-header {' +
'      display: flex;' +
'      justify-content: space-between;' +
'      align-items: center;' +
'      padding: 0.5rem 1rem;' +
'      background: rgba(255, 255, 255, 0.03);' +
'      border-bottom: 1px solid var(--border);' +
'      font-size: 0.8rem;' +
'      color: var(--text-muted);' +
'    }' +
'    .copy-btn {' +
'      background: transparent;' +
'      border: 1px solid var(--border);' +
'      color: var(--text-muted);' +
'      border-radius: 6px;' +
'      padding: 0.25rem 0.6rem;' +
'      font-size: 0.75rem;' +
'      cursor: pointer;' +
'      transition: all 0.2s;' +
'    }' +
'    .copy-btn:hover {' +
'      color: var(--text);' +
'      border-color: rgba(255,255,255,0.3);' +
'    }' +
'    pre {' +
'      padding: 1rem;' +
'      overflow-x: auto;' +
'      font-family: \'Fira Code\', monospace;' +
'      font-size: 0.82rem;' +
'      color: #e2e8f0;' +
'      line-height: 1.5;' +
'    }' +
'    .method-badge {' +
'      font-family: \'Fira Code\', monospace;' +
'      font-weight: 700;' +
'      font-size: 0.75rem;' +
'      padding: 0.25rem 0.5rem;' +
'      border-radius: 6px;' +
'      margin-right: 0.5rem;' +
'    }' +
'    .method-post {' +
'      background: rgba(16, 185, 129, 0.18);' +
'      color: #34d399;' +
'      border: 1px solid rgba(16, 185, 129, 0.4);' +
'    }' +
'    .method-get {' +
'      background: rgba(6, 182, 212, 0.18);' +
'      color: #38bdf8;' +
'      border: 1px solid rgba(6, 182, 212, 0.4);' +
'    }' +
'    .table-wrapper {' +
'      overflow-x: auto;' +
'      margin-top: 1rem;' +
'    }' +
'    table {' +
'      width: 100%;' +
'      border-collapse: collapse;' +
'      font-size: 0.875rem;' +
'      min-width: 600px;' +
'    }' +
'    th, td {' +
'      padding: 0.75rem;' +
'      text-align: left;' +
'      border-bottom: 1px solid var(--border);' +
'    }' +
'    th {' +
'      color: var(--text-muted);' +
'      font-weight: 600;' +
'      background: rgba(255,255,255,0.02);' +
'    }' +
'    td code {' +
'      font-family: \'Fira Code\', monospace;' +
'      color: #a5b4fc;' +
'      background: rgba(99, 102, 241, 0.12);' +
'      padding: 0.15rem 0.35rem;' +
'      border-radius: 4px;' +
'      font-size: 0.8rem;' +
'    }' +
'    .tab-nav {' +
'      display: flex;' +
'      gap: 0.5rem;' +
'      margin-bottom: 0.75rem;' +
'      border-bottom: 1px solid var(--border);' +
'      padding-bottom: 0.5rem;' +
'      flex-wrap: wrap;' +
'    }' +
'    .tab-btn {' +
'      background: none;' +
'      border: none;' +
'      color: var(--text-muted);' +
'      font-size: 0.85rem;' +
'      font-weight: 600;' +
'      padding: 0.35rem 0.75rem;' +
'      border-radius: 6px;' +
'      cursor: pointer;' +
'      transition: all 0.2s;' +
'    }' +
'    .tab-btn.active {' +
'      color: #fff;' +
'      background: rgba(99, 102, 241, 0.2);' +
'    }' +
'    footer {' +
'      margin-top: 4rem;' +
'      padding-top: 2rem;' +
'      border-top: 1px solid var(--border);' +
'      text-align: center;' +
'      color: var(--text-muted);' +
'      font-size: 0.9rem;' +
'    }' +
'    footer a {' +
'      color: #818cf8;' +
'      text-decoration: none;' +
'      transition: color 0.2s;' +
'    }' +
'    footer a:hover {' +
'      color: #c7d2fe;' +
'      text-decoration: underline;' +
'    }' +
'    .spinner {' +
'      display: inline-block;' +
'      width: 18px;' +
'      height: 18px;' +
'      border: 2px solid rgba(255,255,255,0.3);' +
'      border-radius: 50%;' +
'      border-top-color: #fff;' +
'      animation: spin 0.8s linear infinite;' +
'    }' +
'    @keyframes spin {' +
'      to { transform: rotate(360deg); }' +
'    }' +
'    details.advanced-details {' +
'      background: rgba(15, 23, 42, 0.6);' +
'      border: 1px solid var(--border);' +
'      border-radius: 10px;' +
'      padding: 0.75rem 1rem;' +
'      margin-bottom: 1.25rem;' +
'      transition: all 0.2s ease;' +
'    }' +
'    details.advanced-details[open] {' +
'      border-color: rgba(99, 102, 241, 0.4);' +
'      background: rgba(15, 23, 42, 0.85);' +
'    }' +
'    summary.advanced-summary {' +
'      font-size: 0.85rem;' +
'      font-weight: 600;' +
'      color: #818cf8;' +
'      cursor: pointer;' +
'      user-select: none;' +
'      display: flex;' +
'      align-items: center;' +
'      gap: 0.5rem;' +
'      outline: none;' +
'    }' +
'    summary.advanced-summary:hover {' +
'      color: #c7d2fe;' +
'    }' +
'    .advanced-content {' +
'      margin-top: 1rem;' +
'      padding-top: 1rem;' +
'      border-top: 1px solid rgba(255, 255, 255, 0.06);' +
'    }' +
'  </style>' +
'</head>' +
'<body>' +
'  <div class="container">' +
'    <header>' +
'      <div class="logo-group">' +
'        <div class="logo-icon">📸🎥</div>' +
'        <div class="logo-text">' +
'          <h1>Screenshot & Screen Recording API</h1>' +
'          <p>URL & Ham HTML Ekran Görüntüsü ve Video Kayıt Servisi</p>' +
'        </div>' +
'      </div>' +
'      <div class="header-links">' +
'        <span class="badge badge-success">● v1.2.0</span>' +
'        <span class="badge badge-video">🎬 MP4 / WebM / GIF</span>' +
'        <span class="badge badge-auth">' + (isAuthEnabled ? '🔒 Auth Aktif' : '🔓 Public Mode') + '</span>' +
'        <a href="https://github.com/tnhnclskn/screenshot" target="_blank" class="btn-link">GitHub ↗</a>' +
'      </div>' +
'    </header>' +
'    <section class="hero">' +
'      <div class="hero-tag">⚡ URL veya Doğrudan HTML\'den Görsel & Video Kaydı</div>' +
'      <h2>Web & HTML Ekran Görüntüsü ve Video Kayıtlarını Anında Alın</h2>' +
'      <p>Canlı bir web sitesinin veya doğrudan POST ettiğiniz ham HTML kodunun ekran görüntüsünü (PNG, JPEG, WEBP) veya akıcı video kaydını (MP4, WebM, GIF, Smooth Auto-scroll) yüksek performansla elde edin.</p>' +
'    </section>' +
'    <div class="grid">' +
'      <div class="card">' +
'        <div class="card-title">🧪 Canlı Test Alanı (Playground)</div>' +
'        <div class="switcher-label">1. İşlem Türü Seçin</div>' +
'        <div class="mode-switcher">' +
'          <button type="button" class="mode-btn active" id="btnModeScreenshot" onclick="switchActionMode(\'screenshot\')">📸 Ekran Görüntüsü</button>' +
'          <button type="button" class="mode-btn" id="btnModeRecord" onclick="switchActionMode(\'record\')">🎥 Video Kaydı</button>' +
'        </div>' +
'        <div class="switcher-label">2. Giriş Kaynağı Seçin</div>' +
'        <div class="mode-switcher">' +
'          <button type="button" class="mode-btn active" id="btnModeUrl" onclick="switchInputMode(\'url\')">🌐 URL ile Çekim</button>' +
'          <button type="button" class="mode-btn" id="btnModeHtml" onclick="switchInputMode(\'html\')">📝 Ham HTML ile Çekim</button>' +
'        </div>' +
'        <form id="playgroundForm">' +
'          <div class="form-group" id="groupUrl">' +
'            <label for="pUrl">Hedef URL *</label>' +
'            <input type="text" id="pUrl" placeholder="https://tunahancaliskan.com" value="https://tunahancaliskan.com">' +
'          </div>' +
'          <div class="form-group" id="groupHtml" style="display:none;">' +
'            <label for="pHtml">Ham HTML Kodu (CSS ve Stiller Dahil) *</label>' +
'            <textarea id="pHtml"><div style="background: linear-gradient(135deg, #4f46e5, #06b6d4); color: white; padding: 60px; border-radius: 20px; font-family: system-ui, sans-serif; text-align: center;"><h1>Merhaba Dünya! 🚀</h1><p>Doğrudan render edilen HTML içeriği.</p></div></textarea>' +
'          </div>' +
'          <div id="screenshotOptionsGroup">' +
'            <div class="form-group">' +
'              <label for="pElement">Element CSS Seçicisi (Opsiyonel)</label>' +
'              <input type="text" id="pElement" placeholder="h1, .card, #main (Tüm sayfa için boş bırakın)">' +
'            </div>' +
'            <div class="form-row">' +
'              <div class="form-group">' +
'                <label for="pImageFormat">Görsel Formatı</label>' +
'                <select id="pImageFormat">' +
'                  <option value="png" selected>PNG (Kayıpsız)</option>' +
'                  <option value="jpeg">JPEG</option>' +
'                  <option value="webp">WEBP (Optimize)</option>' +
'                </select>' +
'              </div>' +
'              <div class="form-group">' +
'                <label for="pFullPage">Tüm Sayfa (Full Page)</label>' +
'                <select id="pFullPage">' +
'                  <option value="false" selected>Hayır (Viewport)</option>' +
'                  <option value="true">Evet (Full Scroll)</option>' +
'                </select>' +
'              </div>' +
'            </div>' +
'          </div>' +
'          <div id="videoOptionsGroup" style="display:none;">' +
'            <div class="form-row">' +
'              <div class="form-group">' +
'                <label for="pDuration">Kayıt Süresi (Duration - Saniye)</label>' +
'                <input type="number" id="pDuration" min="1" max="60" value="5">' +
'              </div>' +
'              <div class="form-group">' +
'                <label for="pFps">Kare Hızı (FPS)</label>' +
'                <select id="pFps">' +
'                  <option value="30" selected>30 FPS (Standart)</option>' +
'                  <option value="60">60 FPS (Akıcı)</option>' +
'                  <option value="24">24 FPS (Sinematik)</option>' +
'                  <option value="15">15 FPS (Düşük Boyut)</option>' +
'                </select>' +
'              </div>' +
'            </div>' +
'            <div class="form-row">' +
'              <div class="form-group">' +
'                <label for="pVideoFormat">Video Formatı</label>' +
'                <select id="pVideoFormat">' +
'                  <option value="mp4" selected>MP4 (H.264 Video)</option>' +
'                  <option value="webm">WebM (VP8/VP9)</option>' +
'                  <option value="gif">GIF Animasyon</option>' +
'                </select>' +
'              </div>' +
'              <div class="form-group">' +
'                <label for="pScroll">Otomatik Kaydırma (Scroll)</label>' +
'                <select id="pScroll">' +
'                  <option value="false" selected>Hayır (Sabit Viewport)</option>' +
'                  <option value="true">Evet (Smooth Auto-scroll)</option>' +
'                </select>' +
'              </div>' +
'            </div>' +
'            <div class="form-group">' +
'              <label for="pDarkMode">Karanlık Mod (Dark Mode)</label>' +
'              <select id="pDarkMode">' +
'                <option value="" selected>Varsayılan</option>' +
'                <option value="true">Karanlık Mod (Dark)</option>' +
'                <option value="false">Aydınlık Mod (Light)</option>' +
'              </select>' +
'            </div>' +
'          </div>' +
'          <details class="advanced-details">' +
'            <summary class="advanced-summary">⚙️ Gelişmiş Parametreler (Advanced Options)</summary>' +
'            <div class="advanced-content">' +
'              <div class="form-row">' +
'                <div class="form-group">' +
'                  <label for="pWidth">Genişlik (px)</label>' +
'                  <input type="number" id="pWidth" placeholder="1920">' +
'                </div>' +
'                <div class="form-group">' +
'                  <label for="pHeight">Yükseklik (px)</label>' +
'                  <input type="number" id="pHeight" placeholder="1080">' +
'                </div>' +
'              </div>' +
'              <div class="form-row">' +
'                <div class="form-group">' +
'                  <label for="pDeviceScaleFactor">Retina (DPR)</label>' +
'                  <input type="number" id="pDeviceScaleFactor" step="0.1" placeholder="1">' +
'                </div>' +
'                <div class="form-group">' +
'                  <label for="pQuality">Kalite (1-100)</label>' +
'                  <input type="number" id="pQuality" placeholder="Varsayılan">' +
'                </div>' +
'              </div>' +
'              <div class="form-row">' +
'                <div class="form-group">' +
'                  <label for="pDelay">Bekleme (Delay ms)</label>' +
'                  <input type="number" id="pDelay" placeholder="0">' +
'                </div>' +
'                <div class="form-group">' +
'                  <label for="pWaitForSelector">Selector Bekle</label>' +
'                  <input type="text" id="pWaitForSelector" placeholder="örn: .loaded">' +
'                </div>' +
'              </div>' +
'              <div class="form-group">' +
'                <label for="pHideSelectors">Gizlenecek Seçiciler (hideSelectors)</label>' +
'                <input type="text" id="pHideSelectors" placeholder="örn: .cookie-banner, #ads">' +
'              </div>' +
'              <div class="form-group">' +
'                <label for="pRemoveSelectors">Silinecek Seçiciler (removeSelectors)</label>' +
'                <input type="text" id="pRemoveSelectors" placeholder="örn: header, footer">' +
'              </div>' +
'              <div class="form-group">' +
'                <label for="pUserAgent">Özel User-Agent</label>' +
'                <input type="text" id="pUserAgent" placeholder="Mozilla/5.0...">' +
'              </div>' +
'              <div class="form-group">' +
'                <label for="pHeaders">Özel Headers (JSON)</label>' +
'                <input type="text" id="pHeaders" placeholder=\'{"Authorization": "Bearer token"}\'>' +
'              </div>' +
'              <div class="form-group">' +
'                <label for="pCookies">Özel Cookies (JSON Array)</label>' +
'                <input type="text" id="pCookies" placeholder=\'[{"name":"session","value":"123","domain":"example.com"}]\'>' +
'              </div>' +
'            </div>' +
'          </details>' +
'          <div class="form-group">' +
'            <label for="pApiKey">API Key Header ' + (isAuthEnabled ? '<span style="color:#f87171;">(Sunucuda Auth Aktif - Zorunlu)</span>' : '<span style="color:#94a3b8;">(İsteğe bağlı)</span>') + '</label>' +
'            <input type="password" id="pApiKey" placeholder="X-API-Key veya Bearer Token">' +
'          </div>' +
'          <button type="submit" class="btn-submit" id="btnSubmit">' +
'            <span id="btnText">📸 Ekran Görüntüsü Al</span>' +
'          </button>' +
'        </form>' +
'        <div id="previewContainer">' +
'          <div class="preview-header">' +
'            <span id="previewStatus" style="font-size: 0.85rem; font-weight: 600; color: #34d399;">✓ İşlem Başarıyla Tamamlandı</span>' +
'            <a id="downloadLink" href="#" download="output" class="btn-link" style="padding: 0.25rem 0.75rem; font-size: 0.8rem;">İndir 📥</a>' +
'          </div>' +
'          <img id="previewImage" class="preview-img" src="" alt="Screenshot Önizleme" style="display:none;">' +
'          <video id="previewVideo" class="preview-video" controls autoplay loop playsinline style="display:none;"></video>' +
'        </div>' +
'        <div id="errorContainer" style="display:none; margin-top: 1rem; padding: 0.75rem; background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; color: #fca5a5; font-size: 0.85rem;"></div>' +
'      </div>' +
'      <div class="card">' +
'        <div class="card-title">🔐 Kimlik Doğrulama (Auth)</div>' +
'        <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 1rem;">' +
'          Sunucuda <code>API_KEY</code> ortam değişkeni tanımlandığında isteklerinizde aşağıdaki başlıklardan birini göndermeniz gerekmektedir:' +
'        </p>' +
'        <div class="code-container">' +
'          <div class="code-header">' +
'            <span>Header Yapısı</span>' +
'            <button class="copy-btn" onclick="copyCode(\'authCode\')">Kopyala</button>' +
'          </div>' +
'          <pre id="authCode"><code>X-API-Key: YOUR_SECRET_API_KEY\n# veya\nAuthorization: Bearer YOUR_SECRET_API_KEY</code></pre>' +
'        </div>' +
'        <div class="card-title" style="margin-top: 1.5rem;">🔌 API Endpoint\'leri</div>' +
'        <div style="display: flex; flex-direction: column; gap: 0.65rem; margin-top: 0.75rem;">' +
'          <div style="padding: 0.7rem; background: rgba(0,0,0,0.25); border: 1px solid var(--border); border-radius: 8px; display: flex; align-items: center; justify-content: space-between;">' +
'            <div>' +
'              <span class="method-badge method-post">POST</span>' +
'              <code>/screenshot</code>' +
'            </div>' +
'            <span style="font-size: 0.75rem; color: var(--text-muted);">URL veya JSON HTML Görseli</span>' +
'          </div>' +
'          <div style="padding: 0.7rem; background: rgba(0,0,0,0.25); border: 1px solid var(--border); border-radius: 8px; display: flex; align-items: center; justify-content: space-between;">' +
'            <div>' +
'              <span class="method-badge method-post">POST</span>' +
'              <code>/html</code>' +
'            </div>' +
'            <span style="font-size: 0.75rem; color: #38bdf8;">Doğrudan HTML Post Görseli</span>' +
'          </div>' +
'          <div style="padding: 0.7rem; background: rgba(0,0,0,0.25); border: 1px solid var(--border); border-radius: 8px; display: flex; align-items: center; justify-content: space-between;">' +
'            <div>' +
'              <span class="method-badge method-post">POST</span>' +
'              <code>/record</code> <span style="font-size:0.75rem; color:var(--text-muted);">(veya <code>/video</code>)</span>' +
'            </div>' +
'            <span style="font-size: 0.75rem; color: #c084fc;">URL & HTML Video/GIF Kaydı</span>' +
'          </div>' +
'          <div style="padding: 0.7rem; background: rgba(0,0,0,0.25); border: 1px solid var(--border); border-radius: 8px; display: flex; align-items: center; justify-content: space-between;">' +
'            <div>' +
'              <span class="method-badge method-post">POST</span>' +
'              <code>/html/record</code>' +
'            </div>' +
'            <span style="font-size: 0.75rem; color: #e879f9;">Doğrudan HTML Video Kaydı</span>' +
'          </div>' +
'          <div style="padding: 0.7rem; background: rgba(0,0,0,0.25); border: 1px solid var(--border); border-radius: 8px; display: flex; align-items: center; justify-content: space-between;">' +
'            <div>' +
'              <span class="method-badge method-get">GET</span>' +
'              <code>/up</code> <span style="color: var(--text-muted); font-size: 0.8rem;">(veya <code>/health</code>)</span>' +
'            </div>' +
'            <span style="font-size: 0.75rem; color: #34d399;">Health Status</span>' +
'          </div>' +
'          <div style="padding: 0.7rem; background: rgba(0,0,0,0.25); border: 1px solid var(--border); border-radius: 8px; display: flex; align-items: center; justify-content: space-between;">' +
'            <div>' +
'              <span class="method-badge method-get">GET</span>' +
'              <code>/</code>' +
'            </div>' +
'            <span style="font-size: 0.75rem; color: #818cf8;">Dokümantasyon & Playground</span>' +
'          </div>' +
'        </div>' +
'      </div>' +
'    </div>' +
'    <div class="card" style="margin-bottom: 3rem;">' +
'      <div class="card-title">📋 İstek Parametre Referansı</div>' +
'      <p style="color: var(--text-muted); font-size: 0.875rem;">' +
'        İsteklerinizi <code>application/json</code>, <code>application/x-www-form-urlencoded</code> veya <code>text/html</code> gövdesiyle gönderebilirsiniz.' +
'      </p>' +
'      <div class="table-wrapper">' +
'        <table>' +
'          <thead>' +
'            <tr>' +
'              <th>Parametre</th>' +
'              <th>Tip</th>' +
'              <th>Zorunlu?</th>' +
'              <th>Varsayılan</th>' +
'              <th>Açıklama</th>' +
'            </tr>' +
'          </thead>' +
'          <tbody>' +
'            <tr>' +
'              <td><code>url</code></td>' +
'              <td>string</td>' +
'              <td><strong>Opsiyonel*</strong></td>' +
'              <td>-</td>' +
'              <td>Hedef web sitesi adresi (örn: <code>https://tunahancaliskan.com</code>).</td>' +
'            </tr>' +
'            <tr>' +
'              <td><code>html</code></td>' +
'              <td>string</td>' +
'              <td><strong>Opsiyonel*</strong></td>' +
'              <td>-</td>' +
'              <td>Doğrudan render edilecek ham HTML dizesi (CSS ve stilleri içerebilir).</td>' +
'            </tr>' +
'            <tr>' +
'              <td><code>duration</code></td>' +
'              <td>number</td>' +
'              <td>Hayır</td>' +
'              <td><code>5</code></td>' +
'              <td>Video kayıt süresi saniye cinsinden (1 ile 60 saniye arası).</td>' +
'            </tr>' +
'            <tr>' +
'              <td><code>fps</code></td>' +
'              <td>number</td>' +
'              <td>Hayır</td>' +
'              <td><code>30</code></td>' +
'              <td>Video kare hızı (1 ile 60 FPS arası).</td>' +
'            </tr>' +
'            <tr>' +
'              <td><code>format</code></td>' +
'              <td>string</td>' +
'              <td>Hayır</td>' +
'              <td><code>png</code> / <code>mp4</code></td>' +
'              <td>Screenshot için: <code>png</code>, <code>jpeg</code>, <code>webp</code>.<br>Video kaydı için: <code>mp4</code>, <code>webm</code>, <code>gif</code>.</td>' +
'            </tr>' +
'            <tr>' +
'              <td><code>scroll</code></td>' +
'              <td>boolean</td>' +
'              <td>Hayır</td>' +
'              <td><code>false</code></td>' +
'              <td>Video kaydı sırasında sayfayı yumuşak bir şekilde aşağı kaydırmak için <code>true</code> verin.</td>' +
'            </tr>' +
'            <tr>' +
'              <td><code>element</code></td>' +
'              <td>string</td>' +
'              <td>Hayır</td>' +
'              <td><code>null</code></td>' +
'              <td>Spesifik bir DOM öğesini yakalamak için CSS seçicisi (örn: <code>.hero</code>, <code>#card</code>).</td>' +
'            </tr>' +
'            <tr>' +
'              <td><code>fullPage</code></td>' +
'              <td>boolean</td>' +
'              <td>Hayır</td>' +
'              <td><code>false</code></td>' +
'              <td>Screenshot için tüm sayfayı kaydırarak yakalamak için <code>true</code> verin.</td>' +
'            </tr>' +
'            <tr>' +
'              <td><code>quality</code></td>' +
'              <td>number</td>' +
'              <td>Hayır</td>' +
'              <td>-</td>' +
'              <td>JPEG/WEBP veya video sıkıştırma kalitesi (1 - 100 arası).</td>' +
'            </tr>' +
'            <tr>' +
'              <td><code>width</code></td>' +
'              <td>number</td>' +
'              <td>Hayır</td>' +
'              <td><code>1920</code></td>' +
'              <td>Tarayıcı ekran çözünürlüğü genişliği (piksel).</td>' +
'            </tr>' +
'            <tr>' +
'              <td><code>height</code></td>' +
'              <td>number</td>' +
'              <td>Hayır</td>' +
'              <td><code>1080</code></td>' +
'              <td>Tarayıcı ekran çözünürlüğü yüksekliği (piksel).</td>' +
'            </tr>' +
'            <tr>' +
'              <td><code>deviceScaleFactor</code></td>' +
'              <td>number</td>' +
'              <td>Hayır</td>' +
'              <td><code>1</code></td>' +
'              <td>Retina / HiDPI ekran ölçekleme katsayısı.</td>' +
'            </tr>' +
'            <tr>' +
'              <td><code>delay</code></td>' +
'              <td>number</td>' +
'              <td>Hayır</td>' +
'              <td><code>0</code></td>' +
'              <td>Çekim/kayıt öncesi bekleme süresi (milisaniye cinsinden, maks 10000ms).</td>' +
'            </tr>' +
'            <tr>' +
'              <td><code>waitForSelector</code></td>' +
'              <td>string</td>' +
'              <td>Hayır</td>' +
'              <td>-</td>' +
'              <td>DOM\'da belirmesi beklenecek CSS element seçicisi.</td>' +
'            </tr>' +
'            <tr>' +
'              <td><code>darkMode</code></td>' +
'              <td>boolean</td>' +
'              <td>Hayır</td>' +
'              <td>-</td>' +
'              <td>Karanlık mod temasını simüle etmek için <code>true</code> / <code>false</code> verin.</td>' +
'            </tr>' +
'            <tr>' +
'              <td><code>headers</code></td>' +
'              <td>object</td>' +
'              <td>Hayır</td>' +
'              <td>-</td>' +
'              <td>Sayfa isteğinde gönderilecek özel HTTP başlıkları (örn: <code>{"User-Agent": "..."}</code>).</td>' +
'            </tr>' +
'            <tr>' +
'              <td><code>cookies</code></td>' +
'              <td>array</td>' +
'              <td>Hayır</td>' +
'              <td>-</td>' +
'              <td>Sayfa yüklenirken ayarlanacak cookie listesi.</td>' +
'            </tr>' +
'            <tr>' +
'              <td><code>userAgent</code></td>' +
'              <td>string</td>' +
'              <td>Hayır</td>' +
'              <td>-</td>' +
'              <td>Özel User-Agent dizesi tanımlamak için.</td>' +
'            </tr>' +
'          </tbody>' +
'        </table>' +
'      </div>' +
'      <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.75rem;">' +
'        * <code>url</code> veya <code>html</code> parametrelerinden en az birinin belirtilmesi zorunludur.' +
'      </p>' +
'    </div>' +
'    <div class="card">' +
'      <div class="card-title">💻 Entegrasyon Kod Örnekleri</div>' +
'      <div class="tab-nav">' +
'        <button class="tab-btn active" onclick="showTab(\'tabCurlScreenshot\', this)">cURL (Screenshot)</button>' +
'        <button class="tab-btn" onclick="showTab(\'tabCurlRecord\', this)">cURL (Video Kaydı)</button>' +
'        <button class="tab-btn" onclick="showTab(\'tabJs\', this)">JavaScript / Fetch</button>' +
'        <button class="tab-btn" onclick="showTab(\'tabPy\', this)">Python</button>' +
'        <button class="tab-btn" onclick="showTab(\'tabPhp\', this)">PHP</button>' +
'        <button class="tab-btn" onclick="showTab(\'tabNode\', this)">Node.js</button>' +
'      </div>' +
'      <div id="tabCurlScreenshot" class="tab-content">' +
'        <div class="code-container">' +
'          <div class="code-header">' +
'            <span>cURL — Ekran Görüntüsü Alma (URL & Ham HTML)</span>' +
'            <button class="copy-btn" onclick="copyCode(\'codeCurlScreenshot\')">Kopyala</button>' +
'          </div>' +
'          <pre id="codeCurlScreenshot"><code># 1. URL\'den Ekran Görüntüsü Alma\ncurl -X POST http://localhost:' + port + '/screenshot \\\n  -H "Content-Type: application/json" \\\n  -H "X-API-Key: YOUR_API_KEY" \\\n  -d \'{\n    "url": "https://tunahancaliskan.com",\n    "format": "webp",\n    "fullPage": false\n  }\' \\\n  --output screenshot.webp\n\n# 2. Doğrudan HTML POST ile Ekran Görüntüsü Alma\ncurl -X POST http://localhost:' + port + '/screenshot \\\n  -H "Content-Type: application/json" \\\n  -H "X-API-Key: YOUR_API_KEY" \\\n  -d \'{\n    "html": "<div style=\\\"background: #6366f1; color: white; padding: 40px; border-radius: 12px; font-family: sans-serif;\\\"><h1>Merhaba Dünya 🚀</h1></div>",\n    "format": "png"\n  }\' \\\n  --output html_screenshot.png</code></pre>' +
'        </div>' +
'      </div>' +
'      <div id="tabCurlRecord" class="tab-content" style="display:none;">' +
'        <div class="code-container">' +
'          <div class="code-header">' +
'            <span>cURL — Video ve GIF Kaydı (Smooth Auto-scroll Destekli)</span>' +
'            <button class="copy-btn" onclick="copyCode(\'codeCurlRecord\')">Kopyala</button>' +
'          </div>' +
'          <pre id="codeCurlRecord"><code># 1. URL\'den MP4 Video Kaydı (5 saniye, Smooth Auto-scroll)\ncurl -X POST http://localhost:' + port + '/record \\\n  -H "Content-Type: application/json" \\\n  -H "X-API-Key: YOUR_API_KEY" \\\n  -d \'{\n    "url": "https://tunahancaliskan.com",\n    "duration": 5,\n    "fps": 30,\n    "format": "mp4",\n    "scroll": true\n  }\' \\\n  --output recording.mp4\n\n# 2. Ham HTML POST ile Animasyonlu GIF Kaydı\ncurl -X POST http://localhost:' + port + '/html/record \\\n  -H "Content-Type: text/html" \\\n  -H "X-API-Key: YOUR_API_KEY" \\\n  -d \'<div style="background: #090d16; color: #fff; padding: 50px; font-family: sans-serif;"><h1>GIF Banner 🚀</h1></div>\' \\\n  --output animated.gif</code></pre>' +
'        </div>' +
'      </div>' +
'      <div id="tabJs" class="tab-content" style="display:none;">' +
'        <div class="code-container">' +
'          <div class="code-header">' +
'            <span>JavaScript (Fetch — Screenshot & Video Kaydı)</span>' +
'            <button class="copy-btn" onclick="copyCode(\'codeJs\')">Kopyala</button>' +
'          </div>' +
'          <pre id="codeJs"><code>// 1. Ekran Görüntüsü Alma\nasync function getScreenshot() {\n  const response = await fetch(\'http://localhost:' + port + '/screenshot\', {\n    method: \'POST\',\n    headers: {\n      \'Content-Type\': \'application/json\',\n      \'X-API-Key\': \'YOUR_API_KEY\'\n    },\n    body: JSON.stringify({\n      url: \'https://tunahancaliskan.com\',\n      format: \'webp\'\n    })\n  });\n  const blob = await response.blob();\n  return URL.createObjectURL(blob);\n}\n\n// 2. Video / Screencast Kaydı Alma\nasync function recordPageVideo() {\n  const response = await fetch(\'http://localhost:' + port + '/record\', {\n    method: \'POST\',\n    headers: {\n      \'Content-Type\': \'application/json\',\n      \'X-API-Key\': \'YOUR_API_KEY\'\n    },\n    body: JSON.stringify({\n      url: \'https://tunahancaliskan.com\',\n      duration: 5,\n      fps: 30,\n      format: \'mp4\',\n      scroll: true\n    })\n  });\n  const blob = await response.blob();\n  return URL.createObjectURL(blob);\n}</code></pre>' +
'        </div>' +
'      </div>' +
'      <div id="tabPy" class="tab-content" style="display:none;">' +
'        <div class="code-container">' +
'          <div class="code-header">' +
'            <span>Python (Requests — Screenshot & Video Kaydı)</span>' +
'            <button class="copy-btn" onclick="copyCode(\'codePy\')">Kopyala</button>' +
'          </div>' +
'          <pre id="codePy"><code>import requests\n\nAPI_KEY = "YOUR_API_KEY"\nHEADERS = {\n    "Content-Type": "application/json",\n    "X-API-Key": API_KEY\n}\n\n# 1. Ekran Görüntüsü Alma\nss_response = requests.post("http://localhost:' + port + '/screenshot", json={\n    "url": "https://tunahancaliskan.com",\n    "format": "png",\n    "fullPage": False\n}, headers=HEADERS)\n\nif ss_response.status_code == 200:\n    with open("screenshot.png", "wb") as f:\n        f.write(ss_response.content)\n\n# 2. Video Kaydı Alma (MP4)\nrec_response = requests.post("http://localhost:' + port + '/record", json={\n    "url": "https://tunahancaliskan.com",\n    "duration": 5,\n    "fps": 30,\n    "format": "mp4",\n    "scroll": True\n}, headers=HEADERS)\n\nif rec_response.status_code == 200:\n    with open("recording.mp4", "wb") as f:\n        f.write(rec_response.content)</code></pre>' +
'        </div>' +
'      </div>' +
'      <div id="tabPhp" class="tab-content" style="display:none;">' +
'        <div class="code-container">' +
'          <div class="code-header">' +
'            <span>PHP (cURL — Screenshot & Video Kaydı)</span>' +
'            <button class="copy-btn" onclick="copyCode(\'codePhp\')">Kopyala</button>' +
'          </div>' +
'          <pre id="codePhp"><code>&lt;?php\n$apiUrl = \'http://localhost:' + port + '\';\n$apiKey = \'YOUR_API_KEY\';\n\n// 1. Ekran Görüntüsü Alma\n$ch = curl_init("$apiUrl/screenshot");\ncurl_setopt_array($ch, [\n    CURLOPT_POST => true,\n    CURLOPT_POSTFIELDS => json_encode([\n        \'url\' => \'https://tunahancaliskan.com\',\n        \'format\' => \'webp\'\n    ]),\n    CURLOPT_RETURNTRANSFER => true,\n    CURLOPT_HTTPHEADER => [\n        \'Content-Type: application/json\',\n        "X-API-Key: $apiKey"\n    ]\n]);\n$imageData = curl_exec($ch);\nfile_put_contents(\'screenshot.webp\', $imageData);\ncurl_close($ch);\n\n// 2. Video Kaydı Alma (MP4)\n$ch = curl_init("$apiUrl/record");\ncurl_setopt_array($ch, [\n    CURLOPT_POST => true,\n    CURLOPT_POSTFIELDS => json_encode([\n        \'url\' => \'https://tunahancaliskan.com\',\n        \'duration\' => 5,\n        \'fps\' => 30,\n        \'format\' => \'mp4\',\n        \'scroll\' => true\n    ]),\n    CURLOPT_RETURNTRANSFER => true,\n    CURLOPT_HTTPHEADER => [\n        \'Content-Type: application/json\',\n        "X-API-Key: $apiKey"\n    ]\n]);\n$videoData = curl_exec($ch);\nfile_put_contents(\'recording.mp4\', $videoData);\ncurl_close($ch);\n?&gt;</code></pre>' +
'        </div>' +
'      </div>' +
'      <div id="tabNode" class="tab-content" style="display:none;">' +
'        <div class="code-container">' +
'          <div class="code-header">' +
'            <span>Node.js (Axios — Screenshot & Video Kaydı)</span>' +
'            <button class="copy-btn" onclick="copyCode(\'codeNode\')">Kopyala</button>' +
'          </div>' +
'          <pre id="codeNode"><code>const axios = require(\'axios\');\nconst fs = require(\'fs\');\n\nconst BASE_URL = \'http://localhost:' + port + '\';\nconst API_KEY = \'YOUR_API_KEY\';\n\n// 1. Ekran Görüntüsü Alma\nasync function captureScreenshot() {\n  const response = await axios.post(BASE_URL + \'/screenshot\', {\n    url: \'https://tunahancaliskan.com\',\n    format: \'png\'\n  }, {\n    headers: { \'X-API-Key\': API_KEY },\n    responseType: \'arraybuffer\'\n  });\n  fs.writeFileSync(\'screenshot.png\', response.data);\n}\n\n// 2. Video Kaydı Alma\nasync function captureRecording() {\n  const response = await axios.post(BASE_URL + \'/record\', {\n    url: \'https://tunahancaliskan.com\',\n    duration: 5,\n    fps: 30,\n    format: \'mp4\',\n    scroll: true\n  }, {\n    headers: { \'X-API-Key\': API_KEY },\n    responseType: \'arraybuffer\'\n  });\n  fs.writeFileSync(\'recording.mp4\', response.data);\n}\n\n(async () => {\n  await captureScreenshot();\n  await captureRecording();\n})();</code></pre>' +
'        </div>' +
'      </div>' +
'    </div>' +
'    <footer>' +
'      <p>Geliştirici: <strong>Tunahan Çalışkan</strong></p>' +
'      <p style="margin-top: 0.5rem; display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap;">' +
'        <a href="https://tunahancaliskan.com" target="_blank">tunahancaliskan.com ↗</a>' +
'        <a href="https://tunahancaliskan.com.tr" target="_blank">tunahancaliskan.com.tr ↗</a>' +
'        <a href="https://github.com/tnhnclskn" target="_blank">GitHub ↗</a>' +
'        <a href="mailto:mail@tunahancaliskan.com">İletişim ✉️</a>' +
'      </p>' +
'    </footer>' +
'  </div>' +
'  <script>' +
'    document.addEventListener("DOMContentLoaded", () => {' +
'      const savedApiKey = localStorage.getItem("screenshot_api_key");' +
'      if (savedApiKey) document.getElementById("pApiKey").value = savedApiKey;' +
'    });' +
'    let currentActionMode = \'screenshot\';' +
'    let currentInputMode = \'url\';' +
'    function switchActionMode(mode) {' +
'      currentActionMode = mode;' +
'      const btnScreenshot = document.getElementById(\'btnModeScreenshot\');' +
'      const btnRecord = document.getElementById(\'btnModeRecord\');' +
'      const screenshotGroup = document.getElementById(\'screenshotOptionsGroup\');' +
'      const videoGroup = document.getElementById(\'videoOptionsGroup\');' +
'      const btnSubmit = document.getElementById(\'btnSubmit\');' +
'      const btnText = document.getElementById(\'btnText\');' +
'      if (mode === \'screenshot\') {' +
'        btnScreenshot.classList.add(\'active\');' +
'        btnScreenshot.classList.remove(\'active-record\');' +
'        btnRecord.classList.remove(\'active\', \'active-record\');' +
'        screenshotGroup.style.display = \'block\';' +
'        videoGroup.style.display = \'none\';' +
'        btnSubmit.classList.remove(\'btn-submit-record\');' +
'        btnText.innerText = \'📸 Ekran Görüntüsü Al\';' +
'      } else {' +
'        btnRecord.classList.add(\'active\', \'active-record\');' +
'        btnScreenshot.classList.remove(\'active\', \'active-record\');' +
'        screenshotGroup.style.display = \'none\';' +
'        videoGroup.style.display = \'block\';' +
'        btnSubmit.classList.add(\'btn-submit-record\');' +
'        btnText.innerText = \'🎥 Video Kaydı Başlat\';' +
'      }' +
'    }' +
'    function switchInputMode(mode) {' +
'      currentInputMode = mode;' +
'      const groupUrl = document.getElementById(\'groupUrl\');' +
'      const groupHtml = document.getElementById(\'groupHtml\');' +
'      const btnModeUrl = document.getElementById(\'btnModeUrl\');' +
'      const btnModeHtml = document.getElementById(\'btnModeHtml\');' +
'      if (mode === \'url\') {' +
'        groupUrl.style.display = \'block\';' +
'        groupHtml.style.display = \'none\';' +
'        btnModeUrl.classList.add(\'active\');' +
'        btnModeHtml.classList.remove(\'active\');' +
'      } else {' +
'        groupUrl.style.display = \'none\';' +
'        groupHtml.style.display = \'block\';' +
'        btnModeUrl.classList.remove(\'active\');' +
'        btnModeHtml.classList.add(\'active\');' +
'      }' +
'    }' +
'    function showTab(tabId, el) {' +
'      document.querySelectorAll(\'.tab-content\').forEach(tab => tab.style.display = \'none\');' +
'      document.querySelectorAll(\'.tab-btn\').forEach(btn => btn.classList.remove(\'active\'));' +
'      document.getElementById(tabId).style.display = \'block\';' +
'      el.classList.add(\'active\');' +
'    }' +
'    function copyCode(elementId) {' +
'      const text = document.getElementById(elementId).innerText;' +
'      navigator.clipboard.writeText(text).then(() => {' +
'        alert(\'Panoya kopyalandı!\');' +
'      });' +
'    }' +
'    document.getElementById(\'playgroundForm\').addEventListener(\'submit\', async function(e) {' +
'      e.preventDefault();' +
'      const btn = document.getElementById(\'btnSubmit\');' +
'      const btnText = document.getElementById(\'btnText\');' +
'      const previewContainer = document.getElementById(\'previewContainer\');' +
'      const previewImage = document.getElementById(\'previewImage\');' +
'      const previewVideo = document.getElementById(\'previewVideo\');' +
'      const downloadLink = document.getElementById(\'downloadLink\');' +
'      const errorContainer = document.getElementById(\'errorContainer\');' +
'      const previewStatus = document.getElementById(\'previewStatus\');' +
'      errorContainer.style.display = \'none\';' +
'      previewContainer.style.display = \'none\';' +
'      previewImage.style.display = \'none\';' +
'      previewVideo.style.display = \'none\';' +
'      previewVideo.pause();' +
'      btn.disabled = true;' +
'      let endpoint = \'\';' +
'      let payload = {};' +
'      let expectedFormat = \'\';' +
'      if (currentActionMode === \'screenshot\') {' +
'        endpoint = \'/screenshot\';' +
'        expectedFormat = document.getElementById(\'pImageFormat\').value;' +
'        btnText.innerHTML = \'<span class="spinner"></span> Ekran Görüntüsü Alınıyor...\';' +
'        payload = {' +
'          format: expectedFormat,' +
'          fullPage: document.getElementById(\'pFullPage\').value === \'true\',' +
'          element: document.getElementById(\'pElement\').value || undefined' +
'        };' +
'      } else {' +
'        endpoint = \'/record\';' +
'        expectedFormat = document.getElementById(\'pVideoFormat\').value;' +
'        const duration = parseFloat(document.getElementById(\'pDuration\').value) || 5;' +
'        btnText.innerHTML = \'<span class="spinner"></span> Video Kaydediliyor (\' + duration + \' sn, lütfen bekleyin)...\';' +
'        payload = {' +
'          duration: duration,' +
'          fps: parseInt(document.getElementById(\'pFps\').value, 10) || 30,' +
'          format: expectedFormat,' +
'          scroll: document.getElementById(\'pScroll\').value === \'true\'' +
'        };' +
'        const darkModeVal = document.getElementById(\'pDarkMode\').value;' +
'        if (darkModeVal !== \'\') {' +
'          payload.darkMode = darkModeVal === \'true\';' +
'        }' +
'      }' +
'      if (currentInputMode === \'url\') {' +
'        payload.url = document.getElementById(\'pUrl\').value;' +
'      } else {' +
'        payload.html = document.getElementById(\'pHtml\').value;' +
'      }' +
'      const pWidth = document.getElementById(\'pWidth\').value;' +
'      if (pWidth) payload.width = parseInt(pWidth, 10);' +
'      const pHeight = document.getElementById(\'pHeight\').value;' +
'      if (pHeight) payload.height = parseInt(pHeight, 10);' +
'      const pDsf = document.getElementById(\'pDeviceScaleFactor\').value;' +
'      if (pDsf) payload.deviceScaleFactor = parseFloat(pDsf);' +
'      const pQ = document.getElementById(\'pQuality\').value;' +
'      if (pQ) payload.quality = parseInt(pQ, 10);' +
'      const pDel = document.getElementById(\'pDelay\').value;' +
'      if (pDel) payload.delay = parseInt(pDel, 10);' +
'      const pWfs = document.getElementById(\'pWaitForSelector\').value;' +
'      if (pWfs) payload.waitForSelector = pWfs;' +
'      const pHs = document.getElementById(\'pHideSelectors\').value;' +
'      if (pHs) payload.hideSelectors = pHs.split(\',\').map(s => s.trim()).filter(Boolean);' +
'      const pRs = document.getElementById(\'pRemoveSelectors\').value;' +
'      if (pRs) payload.removeSelectors = pRs.split(\',\').map(s => s.trim()).filter(Boolean);' +
'      const pUa = document.getElementById(\'pUserAgent\').value;' +
'      if (pUa) payload.userAgent = pUa;' +
'      const pHead = document.getElementById(\'pHeaders\').value;' +
'      if (pHead) { try { payload.headers = JSON.parse(pHead); } catch(e){} }' +
'      const pCook = document.getElementById(\'pCookies\').value;' +
'      if (pCook) { try { payload.cookies = JSON.parse(pCook); } catch(e){} }' +
'      const headers = { \'Content-Type\': \'application/json\' };' +
'      const apiKey = document.getElementById(\'pApiKey\').value;' +
'      if (apiKey) {' +
'        headers[\'X-API-Key\'] = apiKey;' +
'        localStorage.setItem("screenshot_api_key", apiKey);' +
'      } else {' +
'        localStorage.removeItem("screenshot_api_key");' +
'      }' +
'      try {' +
'        const res = await fetch(endpoint, {' +
'          method: \'POST\',' +
'          headers: headers,' +
'          body: JSON.stringify(payload)' +
'        });' +
'        if (!res.ok) {' +
'          let errorMsg = \'Hata oluştu (\' + res.status + \')\';' +
'          try {' +
'            const errJson = await res.json();' +
'            errorMsg = errJson.message || errJson.error || errorMsg;' +
'          } catch(e) {}' +
'          throw new Error(errorMsg);' +
'        }' +
'        const blob = await res.blob();' +
'        const objectUrl = URL.createObjectURL(blob);' +
'        if (expectedFormat === \'mp4\' || expectedFormat === \'webm\') {' +
'          previewVideo.src = objectUrl;' +
'          previewVideo.style.display = \'block\';' +
'          previewVideo.play().catch(() => {});' +
'          previewStatus.innerText = \'✓ Video Kaydı Başarıyla Alındı (\' + expectedFormat.toUpperCase() + \')\';' +
'        } else {' +
'          previewImage.src = objectUrl;' +
'          previewImage.style.display = \'block\';' +
'          previewStatus.innerText = \'✓ \' + (currentActionMode === \'record\' ? \'GIF Animasyonu\' : \'Görsel\') + \' Başarıyla Alındı (\' + expectedFormat.toUpperCase() + \')\';' +
'        }' +
'        downloadLink.href = objectUrl;' +
'        downloadLink.download = (currentActionMode === \'record\' ? \'recording.\' : \'screenshot.\') + expectedFormat;' +
'        previewContainer.style.display = \'block\';' +
'      } catch (err) {' +
'        errorContainer.innerText = err.message;' +
'        errorContainer.style.display = \'block\';' +
'      } finally {' +
'        btn.disabled = false;' +
'        btnText.innerText = currentActionMode === \'screenshot\' ? \'📸 Ekran Görüntüsü Al\' : \'🎥 Video Kaydı Başlat\';' +
'      }' +
'    });' +
'  </script>' +
'</body>' +
'</html>';
}

module.exports = {
  renderDocsPage,
};
