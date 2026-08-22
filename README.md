# 📸 Web Element & Page Screenshot Service

Node.js, Express ve Puppeteer kullanılarak geliştirilmiş; Header tabanlı kimlik doğrulama (Auth Check), interaktif canlı dokümantasyon arayüzü ve gelişmiş özelleştirme parametrelerine sahip yüksek performanslı bir ekran görüntüsü (screenshot) mikroservisidir.

---

## ✨ Yeni Özellikler & Geliştirmeler

- 🔐 **Header Tabanlı Kimlik Doğrulama (Auth Check):** `X-API-Key` veya `Authorization: Bearer <token>` başlıkları ile API güvenliği.
- 📖 **Dahili İnteraktif Dokümantasyon:** `GET /` adresinde modern, şık ve anında test yapabileceğiniz canlı bir playground arayüzü.
- 🎯 **Spesifik Endpoint Yapısı:** Ekran görüntüsü alma işlemi `POST /screenshot` (veya `POST /api/screenshot`) endpoint'ine taşındı.
- 📐 **Gelişmiş Parametre Desteği:**
  - `fullPage` (Tüm sayfa kaydırma çekimi)
  - `element` (CSS selector bazlı öğe kırpma)
  - `format` & `quality` (`png`, `jpeg`, `webp` formatları ve kalite ayarı)
  - `width` & `height` (Çözünürlük ve viewport yapılandırması)
  - `delay` & `waitForSelector` (Dinamik/SPA sayfalar için bekleme kuralları)
- 🛡️ **Kaynak Yönetimi & Güvenlik:** Hata durumlarında bile tarayıcı nesnelerinin bellekten temizlenmesini sağlayan `finally` mimarisi.

---

## 🚀 Başlangıç & Kurulum

### 1. Ortam Değişkenleri (.env)

Proje kök dizininde `.env.example` dosyasından bir `.env` oluşturun:

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

> **Not:** `API_KEY` boş bırakılırsa servis genel erişime açık (public) modda çalışır. Değer verildiğinde tüm ekran görüntüsü isteklerinde Header kontrolü yapılır.

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

#### Docker Compose (Önerilen)

```bash
# Servisi arka planda başlatın
docker compose up -d
```

#### Docker CLI ile

```bash
# İmajı derleyin
docker build -t screenshot-service .

# Konteyneri API_KEY tanımlayarak çalıştırın
docker run -d -p 3000:3000 -e API_KEY=gizli_api_anahtariniz --name screenshot-app screenshot-service
```

---

## 📡 API Dokümantasyonu

### 1. Ekran Görüntüsü Alma

- **URL:** `POST /screenshot` *(veya `POST /api/screenshot`)*
- **Headers:**
  - `Content-Type: application/json`
  - `X-API-Key: <API_KEY>` veya `Authorization: Bearer <API_KEY>`

#### İstek Gövdesi (Body) Parametreleri

| Parametre | Tip | Zorunlu | Varsayılan | Açıklama |
|---|---|---|---|---|
| `url` | `string` | **Evet** | - | Yakalanacak web sayfasının adresi (örn: `https://tunahancaliskan.com`) |
| `element` | `string` | Hayır | `null` | Spesifik bir elementi yakalamak için CSS seçicisi (örn: `h1`, `.card`, `#pricing`) |
| `fullPage` | `boolean` | Hayır | `false` | `true` verilirse kaydırılabilir tüm sayfa yakalanır. |
| `format` | `string` | Hayır | `png` | Çıktı formatı: `png`, `jpeg`, veya `webp` |
| `quality` | `number` | Hayır | - | `jpeg` ve `webp` için kalite değeri (`1` - `100` arası) |
| `width` | `number` | Hayır | `1920` | Tarayıcı genişliği (px) |
| `height` | `number` | Hayır | `1080` | Tarayıcı yüksekliği (px) |
| `delay` | `number` | Hayır | `0` | Çekim öncesi ek bekleme süresi (milisaniye, maks: 10000ms) |
| `waitForSelector` | `string` | Hayır | `null` | Çekim öncesi DOM'da belirmesi beklenecek CSS seçicisi |

#### Örnek cURL Çağrısı

```bash
curl -X POST http://localhost:3000/screenshot \
  -H "Content-Type: application/json" \
  -H "X-API-Key: gizli_api_anahtariniz" \
  -d '{
    "url": "https://tunahancaliskan.com",
    "element": "body",
    "format": "png",
    "fullPage": false
  }' \
  --output screenshot.png
```

---

### 2. Sağlık Kontrolü (Health Check)

- **URL:** `GET /up` *(veya `GET /health`)*
- **Örnek Yanıt (200 OK):**

```json
{
  "status": "OK",
  "uptime": 128,
  "timestamp": "2026-08-22T14:30:00.000Z",
  "authRequired": true
}
```

---

## 💻 Entegrasyon Örnekleri

### JavaScript / Node.js (Fetch)

```javascript
const response = await fetch('http://localhost:3000/screenshot', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'gizli_api_anahtariniz'
  },
  body: JSON.stringify({
    url: 'https://tunahancaliskan.com',
    element: '.hero',
    format: 'webp'
  })
});

const imageBlob = await response.blob();
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
    "url": "https://tunahancaliskan.com",
    "format": "png",
    "fullPage": True
}

response = requests.post(url, json=payload, headers=headers)
if response.status_code == 200:
    with open("output.png", "wb") as f:
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
