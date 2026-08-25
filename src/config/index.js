require('dotenv').config();

let defaultFfmpegPath;
try {
  defaultFfmpegPath = require('ffmpeg-static');
} catch (_) {
  defaultFfmpegPath = 'ffmpeg';
}

module.exports = {
  port: process.env.PORT || 3000,
  apiKey: process.env.API_KEY || null,
  nodeEnv: process.env.NODE_ENV || 'development',
  defaultTimeout: parseInt(process.env.DEFAULT_TIMEOUT || '30000', 10),
  puppeteerHeadless: process.env.PUPPETEER_HEADLESS !== 'false',
  puppeteerExecutablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
  ffmpegPath: process.env.FFMPEG_PATH || defaultFfmpegPath || 'ffmpeg',
  maxRecordingDuration: parseInt(process.env.MAX_RECORDING_DURATION || '60', 10),
  defaultRecordingDuration: parseInt(process.env.DEFAULT_RECORDING_DURATION || '5', 10),
  defaultRecordingFps: parseInt(process.env.DEFAULT_RECORDING_FPS || '30', 10),
};

