FROM ghcr.io/puppeteer/puppeteer:latest

# Base imajda Chrome hazır olduğu için fazladan indirmeyi atla
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

WORKDIR /usr/src/app

COPY --chown=pptruser:pptruser package*.json ./

RUN npm install --omit=dev

COPY --chown=pptruser:pptruser . .

EXPOSE 3000

CMD ["node", "index.js"]