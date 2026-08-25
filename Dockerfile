FROM node:20-bookworm-slim

# Chromium, FFmpeg, sistem fontları ve Puppeteer bağımlılıklarını kur
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      chromium \
      ffmpeg \
      fonts-ipafont-gothic \
      fonts-wqy-zenhei \
      fonts-thai-tlwg \
      fonts-kacst \
      fonts-freefont-ttf \
      fonts-noto-color-emoji \
      libxss1 \
      ca-certificates && \
    rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium \
    FFMPEG_PATH=/usr/bin/ffmpeg

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

# Güvenli servis kullanıcısı oluştur
RUN groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser && \
    mkdir -p /home/pptruser && \
    chown -R pptruser:pptruser /home/pptruser /usr/src/app

USER pptruser

EXPOSE 3000

CMD ["node", "index.js"]