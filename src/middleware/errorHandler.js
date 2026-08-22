/**
 * Merkezi hata yakalama ve formatlama ara yazılımı (Error Handler)
 */
function errorHandler(err, req, res, next) {
  console.error('[Error]:', err.message || err);

  const statusCode = err.statusCode || (err.name === 'TimeoutError' ? 504 : 500);

  let userMessage = err.message || 'Ekran görüntüsü alınırken bir sunucu hatası oluştu.';

  if (err.name === 'TimeoutError') {
    userMessage = 'Sayfa veya element belirtilen süre içerisinde yüklenemedi (Zaman Aşımı).';
  }

  res.status(statusCode).json({
    success: false,
    error: err.name || 'InternalServerError',
    message: userMessage,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

module.exports = errorHandler;
