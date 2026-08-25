# 📸 🎥 Web & HTML Screenshot & Video Recording Service

Node.js, Express ve Puppeteer kullanılarak geliştirilmiş; Header tabanlı kimlik doğrulama (Auth Check), doğrudan HTML POST render desteği, akıcı video/screencast kaydı (MP4, WebM, GIF, Smooth Auto-scroll), interaktif canlı dokümantasyon (Playground) arayüzü ve gelişmiş özelleştirme parametrelerine sahip yüksek performanslı mikroservis.

---

## ✨ Özellikler & Yetenekler

- 📸 **Görsel Ekran Görüntüsü (Screenshot):** Web URL'lerinden veya doğrudan ham HTML POST içeriğinden anında yüksek kaliteli ekran görüntüleri (`png`, `jpeg`, `webp`).
- 🎥 **Video & Screencast Kaydı (Screen Recording):** Web sayfalarının veya ham HTML içeriklerinin `mp4` (H.264), `webm` (VP8/VP9) veya `gif` animasyon formatlarında akıcı video kaydını alın (Maks. 60 saniye).
- 📜 **Smooth Auto-scroll (Otomatik Kaydırma):** Video kaydı boyunca sayfayı yukarıdan aşağıya yumuşak bir eğriyle kaydırarak tüm sayfa akışını kaydedin.
- 📝 **Doğrudan HTML POST Desteği:** Canlı bir web sayfasına ihtiyaç duymadan, API'ye gönderdiğiniz ham HTML & CSS kodlarını doğrudan görsele veya animasyonlu videoya dönüştürün.
- 🔐 **Header Tabanlı Kimlik Doğrulama (Auth Check):** `X-API-Key` veya `Authorization: Bearer <token>` başlıkları ile güvenli erişim.
- 🧪 **Dahili İnteraktif Dokümantasyon & Playground:** `GET /` adresinde Screenshot ve Video Kaydı senaryolarını test edebileceğiniz modern karanlık tema arayüz.
- 📐 **Gelişmiş Parametre Desteği:**
  - `duration` & `fps` (Video süresi ve kare hızı)
  - `format` (`png`, `jpeg`, `webp`, `mp4`, `webm`, `gif`)
  - `scroll` (Yumuşak otomatik sayfa kaydırma)
  - `fullPage` (Tüm sayfa dikey kaydırmalı ekran görüntüsü)
  - `element` (CSS selector bazlı belirli DOM öğesini kırpma)
  - `quality` (Görsel ve video sıkıştırma kalitesi)
  - `width` & `height` (Viewport çözünürlük yapılandırması)
  - `deviceScaleFactor` (HiDPI / Retina ölçekleme)
  - `delay` & `waitForSelector` (Dinamik/SPA/animasyonlu sayfalar için bekleme kuralları)
- 🐳 **GitHub Container Registry (GHCR) & Docker Desteği:** Tek komutla çalıştırılabilir ve kolayca dağıtılabilir konteyner altyapısı.

---

## 🔌 API Endpoint'leri

| Metot | Endpoint | Açıklama |
|---|---|---|
| `POST` | `/screenshot`, `/api/screenshot` | Web URL veya JSON içindeki HTML'den ekran görüntüsü alma |
| `POST` | `/html`, `/screenshot/html` | Doğrudan ham `text/html` gövdesiyle ekran görüntüsü alma |
| `POST` | `/record`, `/video`, `/api/record` | Web URL veya JSON HTML'den video/screencast kaydı alma (`mp4`, `webm`, `gif`) |
| `POST` | `/html/record`, `/record/html` | Doğrudan ham `text/html` gövdesiyle video/GIF kaydı alma |
| `GET` | `/health`, `/up` | Servis sağlık kontrolü (Healthcheck) |
| `GET` | `/` | Dahili interaktif dokümantasyon ve canlı test arayüzü (Playground) |

---

## 📋 İstek Parametreleri (Request Body / Query)

İsteklerinizi `application/json`, `application/x-www-form-urlencoded` veya `text/html` olarak gönderebilirsiniz.

| Parametre | Tip | Zorunlu | Varsayılan | Açıklama |
|---|---|---|---|---|
| `url` | `string` | **Opsiyonel*** | - | Yakalanacak veya kaydedilecek web sayfasının tam adresi |
| `html` | `string` | **Opsiyonel*** | - | Doğrudan render edilecek ham HTML/CSS dizesi |
| `duration` | `number` | Hayır | `5` | Video kayıt süresi saniye cinsinden (`1` ile `60` sn arası) |
| `fps` | `number` | Hayır | `30` | Video kare hızı (`1` ile `60` FPS arası) |
| `format` | `string` | Hayır | `png` / `mp4` | Çıktı formatı. Screenshot: `png`, `jpeg`, `webp` | Video: `mp4`, `webm`, `gif` |
| `scroll` | `boolean` | Hayır | `false` | Video kaydında sayfayı yumuşak bir şekilde aşağı kaydırmak için `true` verin |
| `element` | `string` | Hayır | `null` | Spesifik bir DOM öğesini yakalamak için CSS seçicisi (`h1`, `.card`, `#pricing`) |
| `fullPage` | `boolean` | Hayır | `false` | Screenshot için `true` verilirse tüm sayfa kaydırılarak yakalanır |
| `quality` | `number` | Hayır | - | JPEG/WEBP veya video sıkıştırma kalitesi (`1` - `100` arası) |
| `width` | `number` | Hayır | `1920` | Tarayıcı viewport genişliği (px) |
| `height` | `number` | Hayır | `1080` | Tarayıcı viewport yüksekliği (px) |
| `deviceScaleFactor` | `number` | Hayır | `1` | Retina / HiDPI ekran ölçekleme katsayısı |
| `delay` | `number` | Hayır | `0` | Çekim/kayıt öncesi ek bekleme süresi (ms, maks 10000ms) |
| `waitForSelector` | `string` | Hayır | `null` | Sayfada veya DOM'da belirmesi beklenecek CSS seçicisi |

** `url` veya `html` parametrelerinden en az birinin belirtilmesi zorunludur.*

---

## 🔐 Kimlik Doğrulama (Authentication)

Eğer `.env` dosyasında `API_KEY` tanımlanmışsa, isteklerinizde aşağıdaki başlıklardan birini iletmeniz gerekir:

```http
X-API-Key: YOUR_SECRET_API_KEY
```
veya
```http
Authorization: Bearer YOUR_SECRET_API_KEY
```

> **Not:** `API_KEY` tanımlanmamışsa veya boşsa, servis genel erişime açık (Public Mode) çalışır.

---

## 💻 Entegrasyon Kod Örnekleri

### 1. cURL Örnekleri

#### A) Ekran Görüntüsü (URL)
```bash
curl -X POST http://localhost:3000/screenshot \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_SECRET_API_KEY" \
  -d '{
    "url": "https://tunahancaliskan.com",
    "format": "webp",
    "fullPage": false
  }' \
  --output screenshot.webp
```

#### B) Ham HTML'den Ekran Görüntüsü
```bash
curl -X POST http://localhost:3000/screenshot \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_SECRET_API_KEY" \
  -d '{
    "html": "<div style=\"background: #6366f1; color: white; padding: 40px; border-radius: 12px; font-family: sans-serif;\"><h1>Merhaba Dünya 🚀</h1></div>",
    "format": "png"
  }' \
  --output html_screenshot.png
```

#### C) Web Sayfasından Video Kaydı (MP4 & Smooth Auto-scroll)
```bash
curl -X POST http://localhost:3000/record \
  -H "Content-Type: application/json" \
  -H "X-API-Key: YOUR_SECRET_API_KEY" \
  -d '{
    "url": "https://tunahancaliskan.com",
    "duration": 5,
    "fps": 30,
    "format": "mp4",
    "scroll": true
  }' \
  --output recording.mp4
```

#### D) Ham HTML'den Animasyonlu GIF Kaydı
```bash
curl -X POST http://localhost:3000/html/record \
  -H "Content-Type: text/html" \
  -H "X-API-Key: YOUR_SECRET_API_KEY" \
  -d '<div style="background: #090d16; color: #fff; padding: 50px; font-family: sans-serif;"><h1>Animasyonlu GIF Banner 🚀</h1></div>' \
  --output animated.gif
```

---

### 2. Node.js (Fetch & Axios)

```javascript
const fs = require('fs');

const API_KEY = 'YOUR_SECRET_API_KEY';
const BASE_URL = 'http://localhost:3000';

// 1. Ekran Görüntüsü Alma
async function captureScreenshot() {
  const response = await fetch(`${BASE_URL}/screenshot`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    body: JSON.stringify({
      url: 'https://tunahancaliskan.com',
      format: 'png',
    }),
  });

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync('screenshot.png', buffer);
  console.log('Ekran görüntüsü kaydedildi: screenshot.png');
}

// 2. Video Kaydı Alma (MP4)
async function captureRecording() {
  const response = await fetch(`${BASE_URL}/record`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    body: JSON.stringify({
      url: 'https://tunahancaliskan.com',
      duration: 5,
      fps: 30,
      format: 'mp4',
      scroll: true,
    }),
  });

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync('recording.mp4', buffer);
  console.log('Video kaydı kaydedildi: recording.mp4');
}

(async () => {
  await captureScreenshot();
  await captureRecording();
})();
```

---

### 3. Python (Requests)

```python
import requests

BASE_URL = "http://localhost:3000"
HEADERS = {
    "Content-Type": "application/json",
    "X-API-Key": "YOUR_SECRET_API_KEY"
}

# 1. Ekran Görüntüsü Alma
ss_response = requests.post(f"{BASE_URL}/screenshot", json={
    "url": "https://tunahancaliskan.com",
    "format": "webp",
    "fullPage": False
}, headers=HEADERS)

if ss_response.status_code == 200:
    with open("screenshot.webp", "wb") as f:
        f.write(ss_response.content)
    print("Görsel kaydedildi: screenshot.webp")

# 2. Video Kaydı Alma (MP4)
video_response = requests.post(f"{BASE_URL}/record", json={
    "url": "https://tunahancaliskan.com",
    "duration": 5,
    "fps": 30,
    "format": "mp4",
    "scroll": True
}, headers=HEADERS)

if video_response.status_code == 200:
    with open("recording.mp4", "wb") as f:
        f.write(video_response.content)
    print("Video kaydedildi: recording.mp4")
```

---

### 4. PHP (cURL)

```php
<?php
$baseUrl = 'http://localhost:3000';
$apiKey = 'YOUR_SECRET_API_KEY';

// 1. Ekran Görüntüsü Alma
$ch = curl_init("$baseUrl/screenshot");
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode([
        'url' => 'https://tunahancaliskan.com',
        'format' => 'webp'
    ]),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        "X-API-Key: $apiKey"
    ]
]);
$image = curl_exec($ch);
file_put_contents('screenshot.webp', $image);
curl_close($ch);
echo "Ekran görüntüsü kaydedildi: screenshot.webp\n";

// 2. Video Kaydı Alma (MP4 & Smooth Scroll)
$ch = curl_init("$baseUrl/record");
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode([
        'url' => 'https://tunahancaliskan.com',
        'duration' => 5,
        'fps' => 30,
        'format' => 'mp4',
        'scroll' => true
    ]),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        "X-API-Key: $apiKey"
    ]
]);
$video = curl_exec($ch);
file_put_contents('recording.mp4', $video);
curl_close($ch);
echo "Video kaydı kaydedildi: recording.mp4\n";
?>
```

---

## ⚙️ Ortam Değişkenleri (Environment Variables)

Projenin kök dizinindeki `.env` dosyasından aşağıdaki ayarları yapılandırabilirsiniz:

| Değişken | Tip | Varsayılan | Açıklama |
|---|---|---|---|
| `PORT` | `number` | `3000` | HTTP sunucusunun dinleyeceği port numarası |
| `API_KEY` | `string` | `null` | API erişim anahtarı. Boş ise servis genel erişime açıktır |
| `NODE_ENV` | `string` | `development` | Çalışma ortamı (`development` / `production`) |
| `DEFAULT_TIMEOUT` | `number` | `30000` | Sayfa yükleme ve işlemler için maksimum zaman aşımı (ms) |
| `PUPPETEER_HEADLESS` | `boolean` | `true` | Puppeteer tarayıcısının headless modda çalışması |
| `FFMPEG_PATH` | `string` | `ffmpeg-static` | Video işleme için kullanılacak FFmpeg ikili yolu |
| `MAX_RECORDING_DURATION` | `number` | `60` | İzin verilen maksimum kayıt süresi (saniye) |
| `DEFAULT_RECORDING_DURATION` | `number` | `5` | Varsayılan video kayıt süresi (saniye) |
| `DEFAULT_RECORDING_FPS` | `number` | `30` | Varsayılan video kare hızı (FPS) |

---

## 🐳 Docker & Docker Compose ile Çalıştırma

### 1. GHCR'dan Hazır İmajı Çekme (GitHub Container Registry)

```bash
# En güncel hazır imajı çekin
docker pull ghcr.io/tnhnclskn/screenshot:latest

# Konteyneri başlatın
docker run -d -p 3000:3000 -e API_KEY=gizli_api_anahtariniz --name screenshot-app ghcr.io/tnhnclskn/screenshot:latest
```

### 2. Docker Compose ile Çalıştırma (Önerilen)

```bash
# Arka planda servisleri başlatın
docker compose up -d

# Logları takip etmek için
docker compose logs -f
```

### 3. Docker CLI ile Yerel Build

```bash
# Docker imajını oluşturun
docker build -t screenshot-service .

# Konteyneri çalıştırın
docker run -d -p 3000:3000 -e API_KEY=gizli_api_anahtariniz --name screenshot-app screenshot-service
```

---

## 🧪 Yerel Geliştirme & Testler

```bash
# Bağımlılıkları yükleyin
npm install

# Testleri çalıştırın
npm test
# veya
node --test

# Geliştirme sunucusunu başlatın (Watch modu)
npm run dev
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
