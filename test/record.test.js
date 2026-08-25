const { test, describe, before, after } = require('node:test');
const assert = require('node:assert');
const app = require('../index');
const config = require('../src/config');

describe('Record API Tests', () => {
  let server;
  let baseUrl;
  let savedApiKey;

  before(async () => {
    savedApiKey = config.apiKey;
    config.apiKey = null;
    await new Promise((resolve) => {
      server = app.listen(0, resolve);
    });
    const port = server.address().port;
    baseUrl = `http://localhost:${port}`;
  });

  after(async () => {
    config.apiKey = savedApiKey;
    if (server) {
      await new Promise((resolve) => server.close(resolve));
    }
  });

  test('POST /record with HTML (1 second, format mp4) returns video/mp4 buffer', async () => {
    const res = await fetch(`${baseUrl}/record`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        html: '<div style="height: 1500px; background: linear-gradient(red, blue);"><h1>MP4 Record Test</h1></div>',
        duration: 1,
        format: 'mp4',
        fps: 30,
        scroll: true,
      }),
    });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers.get('content-type'), 'video/mp4');
    const arrayBuffer = await res.arrayBuffer();
    assert.ok(arrayBuffer.byteLength > 0, 'MP4 buffer size should be greater than 0');
  });

  test('POST /record with HTML (1 second, format webm) returns video/webm buffer', async () => {
    const res = await fetch(`${baseUrl}/record`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        html: '<div style="height: 1500px; background: linear-gradient(green, yellow);"><h1>WebM Record Test</h1></div>',
        duration: 1,
        format: 'webm',
        fps: 30,
        scroll: true,
      }),
    });

    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers.get('content-type'), 'video/webm');
    const arrayBuffer = await res.arrayBuffer();
    assert.ok(arrayBuffer.byteLength > 0, 'WebM buffer size should be greater than 0');
  });

  test('POST /record validation checks', async () => {
    // 1. url/html eksik -> 400
    const resMissing = await fetch(`${baseUrl}/record`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ duration: 5 }),
    });
    assert.strictEqual(resMissing.status, 400);
    const jsonMissing = await resMissing.json();
    assert.strictEqual(jsonMissing.error, 'Bad Request');

    // 2. duration > maxRecordingDuration -> 400
    const resMaxDuration = await fetch(`${baseUrl}/record`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html: '<h1>Test</h1>', duration: 100 }),
    });
    assert.strictEqual(resMaxDuration.status, 400);
    const jsonMax = await resMaxDuration.json();
    assert.strictEqual(jsonMax.error, 'Bad Request');

    // 3. duration < 1 -> 400
    const resMinDuration = await fetch(`${baseUrl}/record`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html: '<h1>Test</h1>', duration: 0 }),
    });
    assert.strictEqual(resMinDuration.status, 400);
    const jsonMin = await resMinDuration.json();
    assert.strictEqual(jsonMin.error, 'Bad Request');

    // 4. format geçersiz -> 400
    const resInvalidFormat = await fetch(`${baseUrl}/record`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html: '<h1>Test</h1>', format: 'avi' }),
    });
    assert.strictEqual(resInvalidFormat.status, 400);
    const jsonFormat = await resInvalidFormat.json();
    assert.strictEqual(jsonFormat.error, 'Bad Request');
  });

  test('POST /video and POST /html/record alias routes return 200 OK', async () => {
    // POST /video alias
    const resVideo = await fetch(`${baseUrl}/video`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        html: '<h1>Video Alias Test</h1>',
        duration: 1,
        format: 'mp4',
      }),
    });
    assert.strictEqual(resVideo.status, 200);
    assert.strictEqual(resVideo.headers.get('content-type'), 'video/mp4');
    const bufVideo = await resVideo.arrayBuffer();
    assert.ok(bufVideo.byteLength > 0);

    // POST /html/record alias
    const resHtmlRecord = await fetch(`${baseUrl}/html/record`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        html: '<h1>HTML Record Alias Test</h1>',
        duration: 1,
        format: 'mp4',
      }),
    });
    assert.strictEqual(resHtmlRecord.status, 200);
    assert.strictEqual(resHtmlRecord.headers.get('content-type'), 'video/mp4');
    const bufHtmlRecord = await resHtmlRecord.arrayBuffer();
    assert.ok(bufHtmlRecord.byteLength > 0);
  });

  test('POST /record/html with raw text/html returns 200 OK and video/mp4', async () => {
    const res = await fetch(`${baseUrl}/record/html?duration=1&format=mp4`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/html' },
      body: '<div style="height: 1000px; background: cyan;"><h1>Raw HTML Video Test</h1></div>',
    });
    assert.strictEqual(res.status, 200);
    assert.strictEqual(res.headers.get('content-type'), 'video/mp4');
    const arrayBuffer = await res.arrayBuffer();
    assert.ok(arrayBuffer.byteLength > 0);
  });
});
