# 📸 Web Element Screenshot Service

Node.js, Express ve Puppeteer kullanılarak geliştirilmiş, belirtilen URL üzerindeki belirli bir HTML elementinin ekran görüntüsünü (screenshot) alan ve PNG formatında döndüren hafif (lightweight) bir REST API mikroservisidir.

---

## ✨ Özellikler

- 🎯 **Element Bazlı Ekran Görüntüsü:** CSS seçicisi (selector) ile sayfanın tamamı yerine istenen spesifik HTML elementini yakalayabilme.
- ⚡ **Hızlı ve Headless:** Puppeteer'ın optimize edilmiş `headless` Chrome motoru ile hızlı görsel oluşturma.
- 🐳 **Docker & Docker Compose Desteği:** Kuruluma ihtiyaç duymadan tek komutla ayağa kaldırılabilen konteyner yapısı (`ghcr.io/puppeteer/puppeteer` tabanlı).
- 🩺 **Sağlık Kontrolü (Health Check):** Servis durumunu kontrol edebilmek için hazır `/up` endpoint'i.

---

## 🚀 Başlangıç & Kurulum

Projeyi yerel ortamınızda veya Docker ile çalıştırabilirsiniz.

### Seçenek 1: Yerel Ortam (Node.js & Yarn)

#### Gereksinimler
- Node.js (v18+)
- Yarn veya NPM

```bash
# Bağımlılıkları yükleyin
yarn install
# veya
npm install

# Servisi başlatın
yarn start
# veya
npm start
```

Servis varsayılan olarak `http://localhost:3000` adresinde çalışacaktır.

---

### Seçenek 2: Docker & Docker Compose

#### Docker Compose ile Çalıştırma (Önerilen)
```bash
docker-compose up -d
```

#### Dockerfile ile Build Edip Çalıştırma
```bash
# İmajı derleyin
docker build -t screenshot-service .

# Konteyneri başlatın
docker run -p 3000:3000 screenshot-service
```

---

## 📡 API Kullanımı

### 1. Ekran Görüntüsü Alma

- **Endpoint:** `POST /`
- **Content-Type:** `application/json` veya `application/x-www-form-urlencoded`

#### İstek Gövdesi (Request Body)

| Parametre | Tip | Zorunlu mu? | Açıklama |
|---|---|---|---|
| `url` | `string` | Evet | Ekran görüntüsü alınacak web sayfasının tam adresi (örn: `https://example.com`) |
| `element` | `string` | Evet | Yakalanacak HTML elementinin CSS seçicisi (örn: `h1`, `.card`, `#main-content`) |

#### Örnek cURL İsteği

```bash
curl -X POST http://localhost:3000/ \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://tunahancaliskan.com",
    "element": "body"
  }' \
  --output screenshot.png
```

#### Yanıt (Response)
- **Status:** `200 OK`
- **Content-Type:** `image/png`
- **Body:** Binary PNG görsel verisi.

---

### 2. Sağlık Kontrolü (Health Check)

- **Endpoint:** `GET /up`
- **Yanıt:** `OK` (Status `200`)

```bash
curl http://localhost:3000/up
```

---

## 📦 Docker Hub İmajı

Bu servis [GitHub Actions](.github/workflows/docker-image.yml) aracılığıyla otomatik olarak Docker Hub üzerine yayınlanmaktadır:

```bash
docker pull tnhnclskn/screenshot:latest
docker run -p 3000:3000 tnhnclskn/screenshot:latest
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

Bu proje [MIT](LICENSE) lisansı ile lisanslanmıştır.
