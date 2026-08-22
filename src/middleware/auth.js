const config = require('../config');

/**
 * Header tabanlı kimlik doğrulama ara yazılımı (Auth Middleware).
 * 'X-API-Key' veya 'Authorization: Bearer <token>' başlıklarını kontrol eder.
 * Ortam değişkeninde API_KEY tanımlanmamışsa isteğe izin verir (public mode).
 */
function authMiddleware(req, res, next) {
  // Eğer sunucuda API_KEY tanımlanmamışsa kimlik doğrulama bypass edilir
  if (!config.apiKey) {
    return next();
  }

  // Header'lardan API anahtarını al
  const xApiKey = req.headers['x-api-key'];
  const authHeader = req.headers['authorization'];

  let providedKey = null;

  if (xApiKey) {
    providedKey = Array.isArray(xApiKey) ? xApiKey[0] : xApiKey;
  } else if (authHeader) {
    if (authHeader.startsWith('Bearer ')) {
      providedKey = authHeader.substring(7).trim();
    } else {
      providedKey = authHeader.trim();
    }
  }

  if (!providedKey) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized',
      message: 'API anahtarı eksik. Lütfen "X-API-Key" veya "Authorization: Bearer <KEY>" başlığı ekleyin.',
    });
  }

  if (providedKey !== config.apiKey) {
    return res.status(403).json({
      success: false,
      error: 'Forbidden',
      message: 'Geçersiz API anahtarı.',
    });
  }

  next();
}

module.exports = authMiddleware;
