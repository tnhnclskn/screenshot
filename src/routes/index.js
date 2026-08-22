const express = require('express');
const router = express.Router();
const config = require('../config');
const authMiddleware = require('../middleware/auth');
const { handleScreenshot } = require('../controllers/screenshot');
const { renderDocsPage } = require('../views/docs');

// 1. Dokümantasyon Ana Sayfası
router.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(renderDocsPage(config));
});

// 2. Sağlık Durumu Kontrolü (Healthcheck)
const healthHandler = (req, res) => {
  res.json({
    status: 'OK',
    uptime: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    authRequired: Boolean(config.apiKey),
  });
};

router.get('/up', healthHandler);
router.get('/health', healthHandler);

// 3. Ekran Görüntüsü Alma (Header Auth Korumalı)
router.post('/screenshot', authMiddleware, handleScreenshot);
router.post('/api/screenshot', authMiddleware, handleScreenshot);

module.exports = router;
