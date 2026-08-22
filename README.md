# 📸 Web & HTML Screenshot Service

Node.js, Express ve Puppeteer kullanılarak geliştirilmiş; Header tabanlı kimlik doğrulama (Auth Check), doğrudan HTML POST render desteği, interaktif canlı dokümantasyon arayüzü ve gelişmiş özelleştirme parametrelerine sahip yüksek performanslı bir ekran görüntüsü (screenshot) mikroservisidir.

---

## ✨ Özellikler & Yetenekler

- 📝 **Doğrudan HTML POST ile Görsel Üretme:** Canlı web URL'lerinin yanı sıra, API'ye gönderdiğiniz ham HTML & CSS kodlarını anında görsele dönüştürün (`POST /html` veya `POST /screenshot` ile `{ "html": "..." }`).
- 🌐 **Web Sayfası URL Ekran Görüntüsü:** İster tüm sayfayı (`fullPage`), ister CSS seçicisi (`element`) ile belirli bir DOM öğesini yakalayın.
- 🔐 **Header Tabanlı Kimlik Doğrulama (Auth Check):** `X-API-Key` veya `Authorization: Bearer <token>` başlıkları ile API güvenliği.
- 📖 **Dahili İnteraktif Dokümantasyon:** `GET /` adresinde canlı test (playground) yapabileceğiniz modern ve şık arayüz.
- 📐 **Gelişmiş Parametre Desteği:**
  - `fullPage` (Tüm sayfa kaydırma çekimi)
  - `element` (CSS selector bazlı öğe kırpma)
  - `format` & `quality` (`png`, `jpeg`, `webp` formatları ve kalite ayarı)
  - `width` & `height` (Çözünürlük ve viewport yapılandırması)
  - `delay` & `waitForSelector` (Dinamik/SPA sayfalar için bekleme kuralları)
- 🐳 **GitHub Container Registry (GHCR) Entegrasyonu:** `ghcr.io/tnhnclskn/screenshot:latest` üzerinden tek komutla çalıştırılabilir konteyner yapısı.

---

## 🚀 Başlangıç & Kurulum

### 1. Ortam Değişkenleri (.env)

```bash
cp .env.example .env
```

```env
PORT=3000
API_KEY=gizli_api_anahtariniz
NODE_ENV=development
DEFAULT_TIMEOUT=30000
PUPPETEER_HEADLESS=true
```

> **Not:** `API_KEY` boş bırakılırsa servis genel erişime açık (public) modda çalışır. Değer verildiğinde tüm isteklerde Header kontrolü yapılır.

---

### 2. Yerel Ortamda Çalıştırma

```bash
# Bağımlılıkları yükleyin
npm install

# Servisi başlatın
npm start

# Geliştirici modu (otomatik yeniden başlatma)
npm run dev
```

Sunucu başladıktan sonra tarayıcınızdan **`http://localhost:3000`** adresine giderek interaktif dokümantasyonu görüntüleyebilirsiniz.

---

### 3. Docker & Docker Compose ile Çalıştırma

#### GHCR'dan Hazır İmajı Çekme (GitHub Container Registry)

```bash
# GitHub Packages (GHCR)'dan imajı indirin
docker pull ghcr.io/tnhnclskn/screenshot:latest

# Konteyneri başlatın
docker run -d -p 3000:3000 -e API_KEY=gizli_api_anahtariniz --name screenshot-app ghcr.io/tnhnclskn/screenshot:latest
```

#### Docker Compose ile Çalıştırma (Önerilen)

```bash
docker compose up -d
```

#### Docker CLI ile Yerel Build

```bash
docker build -t screenshot-service .
docker run -d -p 3000:3000 -e API_KEY=gizli_api_anahtariniz --name screenshot-app screenshot-service
```

---

## 📡 API Dokümantasyonu

### 1. Doğrudan HTML'den Ekran Görüntüsü Alma

#### A) JSON İçinde HTML Gönderme (`POST /screenshot` veya `POST /html`)

```bash
curl -X POST http://localhost:3000/screenshot \
  -H "Content-Type: application/json" \
  -H "X-API-Key: gizli_api_anahtariniz" \
  -d '{
    "html": "<div style=\"background: #6366f1; color: white; padding: 40px; border-radius: 12px; font-family: sans-serif;\"><h1>Merhaba Dünya 🚀</h1></div>",
    "format": "png"
  }' \
  --output html_screenshot.png
```

#### B) Ham `text/html` Gövdesi ile Gönderme (`POST /html`)

```bash
curl -X POST http://localhost:3000/html \
  -H "Content-Type: text/html" \
  -H "X-API-Key: gizli_api_anahtariniz" \
  -d '<h1 style="color:red;">Doğrudan HTML</h1>' \
  --output direct_html.png
```

---

### 2. URL ile Ekran Görüntüsü Alma

- **URL:** `POST /screenshot` *(veya `POST /api/screenshot`)*
- **Headers:** `Content-Type: application/json`, `X-API-Key: <API_KEY>`

```bash
curl -X POST http://localhost:3000/screenshot \
  -H "Content-Type: application/json" \
  -H "X-API-Key: gizli_api_anahtariniz" \
  -d '{
    "url": "https://tunahancaliskan.com",
    "element": "body",
    "format": "webp",
    "fullPage": false
  }' \
  --output screenshot.webp
```

---

### İstek Parametreleri (Request Body)

| Parametre | Tip | Zorunlu | Varsayılan | Açıklama |
|---|---|---|---|---|
| `url` | `string` | **Opsiyonel\*** | - | Yakalanacak web sayfasının tam adresi |
| `html` | `string` | **Opsiyonel\*** | - | Doğrudan render edilecek HTML/CSS dizesi |
| `element` | `string` | Hayır | `null` | Spesifik bir elementi yakalamak için CSS seçicisi (`h1`, `.card`, `#pricing`) |
| `fullPage` | `boolean` | Hayır | `false` | `true` verilirse tüm sayfa kaydırılarak yakalanır |
| `format` | `string` | Hayır | `png` | Çıktı formatı: `png`, `jpeg` veya `webp` |
| `quality` | `number` | Hayır | - | `jpeg` ve `webp` için kalite değeri (`1` - `100`) |
| `width` | `number` | Hayır | `1920` | Tarayıcı genişliği (px) |
| `height` | `number` | Hayır | `1080` | Tarayıcı yüksekliği (px) |
| `delay` | `number` | Hayır | `0` | Çekim öncesi ek bekleme süresi (ms) |
| `waitForSelector` | `string` | Hayır | `null` | DOM'da belirmesi beklenecek CSS seçicisi |

*\* `url` veya `html` parametrelerinden en az birinin belirtilmesi gerekmektedir.*

---

### 3. Sağlık Kontrolü (Health Check)

- **URL:** `GET /up` *(veya `GET /health`)*
- **Yanıt (200 OK):**
```json
{
  "status": "OK",
  "uptime": 240,
  "timestamp": "2026-08-22T14:30:00.000Z",
  "authRequired": true
}
```

---

## 💻 Entegrasyon Kod Örnekleri

### JavaScript (HTML Render & Fetch)

```javascript
const response = await fetch('http://localhost:3000/screenshot', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'gizli_api_anahtariniz'
  },
  body: JSON.stringify({
    html: '<div style="background: purple; color: white; padding: 30px;"><h1>Dinamik Banner</h1></div>',
    format: 'png'
  })
});

const blob = await response.blob();
```

### Python (Requests)

```python
import requests

url = "http://localhost:3000/screenshot"
headers = {
    "Content-Type": "application/json",
    "X-API-Key": "gizli_api_anahtariniz"
}
payload = {
    "html": "<h1>Python HTML Screenshot</h1>",
    "format": "webp"
}

response = requests.post(url, json=payload, headers=headers)
if response.status_code == 200:
    with open("output.webp", "wb") as f:
        f.write(response.content)
```

---

## 👤 Yazar (Author)

**Tunahan Çalışkan**
- 🌐 Web: [tunahancaliskan.com](https://tunahancaliskan.com)
- 🌐 Web (TR): [tunahancaliskan.com.tr](https://tunahancaliskan.com.tr)
- 🐙 GitHub: [@tnhnclskn](https://github.com/tnhnclskn)
- ✉️ E-posta: [mail@tunahancaliskan.com](mailto:mail@tunahancaliskan.com)

---

## 📄 Lisans

Bu proje [MIT](LICENSE) lisansı altında sunulmaktadır.
