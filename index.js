const express = require('express');
const config = require('./src/config');
const routes = require('./src/routes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS Desteği
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-API-Key, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// API Routes
app.use('/', routes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'NotFound',
    message: `İstenen endpoint bulunamadı: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use(errorHandler);

// Sunucuyu Başlat
const server = app.listen(config.port, () => {
  console.log(`\n🚀 Screenshot Servisi Hazır!`);
  console.log(`📡 Port: ${config.port}`);
  console.log(`🌐 Dokümantasyon: http://localhost:${config.port}`);
  console.log(`📸 Screenshot Endpoint: POST http://localhost:${config.port}/screenshot`);
  console.log(`🔐 Kimlik Doğrulama: ${config.apiKey ? 'Aktif (Header Kontrolü)' : 'Devre Dışı (Public Mode)'}\n`);
});

// Graceful Shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM sinyali alındı, sunucu kapatılıyor...');
  server.close(() => {
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT sinyali alındı, sunucu kapatılıyor...');
  server.close(() => {
    process.exit(0);
  });
});
