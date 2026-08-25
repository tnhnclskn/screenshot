const { test, describe, before, after } = require('node:test');
const assert = require('node:assert');
const app = require('../index');
const config = require('../src/config');

describe('Screenshot API Tests', () => {
  let server;
  let baseUrl;

  before(() => {
    server = app.listen(0);
    const port = server.address().port;
    baseUrl = `http://localhost:${port}`;
  });

  after(() => {
    server.close();
  });

  test('GET /health returns 200 OK and status OK', async () => {
    const res = await fetch(`${baseUrl}/health`);
    assert.strictEqual(res.status, 200);
    const json = await res.json();
    assert.strictEqual(json.status, 'OK');
    assert.ok('uptime' in json);
    assert.ok('timestamp' in json);
  });

  test('GET /up returns 200 OK', async () => {
    const res = await fetch(`${baseUrl}/up`);
    assert.strictEqual(res.status, 200);
    const json = await res.json();
    assert.strictEqual(json.status, 'OK');
  });

  test('Auth middleware controls: public mode vs API key validation', async () => {
    const origKey = config.apiKey;

    // 1. API key yokken (public mode)
    config.apiKey = null;
    const resPublic = await fetch(`${baseUrl}/screenshot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html: '<h1>Public Test</h1>' }),
    });
    assert.strictEqual(resPublic.status, 200);
    assert.strictEqual(resPublic.headers.get('content-type'), 'image/png');

    // 2. API key varken
    config.apiKey = 'secret-test-key-123';
    try {
      // Header yokken -> 401
      const resNoAuth = await fetch(`${baseUrl}/screenshot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ html: '<h1>Auth Test</h1>' }),
      });
      assert.strictEqual(resNoAuth.status, 401);
      const json401 = await resNoAuth.json();
      assert.strictEqual(json401.error, 'Unauthorized');

      // Yanlış key -> 403
      const resWrongAuth = await fetch(`${baseUrl}/screenshot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'wrong-key',
        },
        body: JSON.stringify({ html: '<h1>Auth Test</h1>' }),
      });
      assert.strictEqual(resWrongAuth.status, 403);
      const json403 = await resWrongAuth.json();
      assert.strictEqual(json403.error, 'Forbidden');

      // Doğru X-API-Key -> 200
      const resValidKey = await fetch(`${baseUrl}/screenshot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': 'secret-test-key-123',
        },
        body: JSON.stringify({ html: '<h1>Auth Test</h1>' }),
      });
      assert.strictEqual(resValidKey.status, 200);
      assert.strictEqual(resValidKey.headers.get('content-type'), 'image/png');

      // Doğru Bearer Token -> 200
      const resBearer = await fetch(`${baseUrl}/screenshot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer secret-test-key-123',
        },
        body: JSON.stringify({ html: '<h1>Bearer Test</h1>' }),
      });
      assert.strictEqual(resBearer.status, 200);
      assert.strictEqual(resBearer.headers.get('content-type'), 'image/png');
    } finally {
      config.apiKey = origKey;
    }
  });

  test('POST /screenshot with HTML returns 200 and image/png', async () => {
    const origKey = config.apiKey;
    config.apiKey = null;
    try {
      const res = await fetch(`${baseUrl}/screenshot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          html: '<div style="width: 200px; height: 200px; background: red;"><h1>PNG Screenshot</h1></div>',
          format: 'png',
        }),
      });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.headers.get('content-type'), 'image/png');
      const arrayBuffer = await res.arrayBuffer();
      assert.ok(arrayBuffer.byteLength > 0);
    } finally {
      config.apiKey = origKey;
    }
  });

  test('POST /html with raw text/html returns 200 and image/png', async () => {
    const origKey = config.apiKey;
    config.apiKey = null;
    try {
      const res = await fetch(`${baseUrl}/html`, {
        method: 'POST',
        headers: { 'Content-Type': 'text/html' },
        body: '<div style="width: 200px; height: 200px; background: blue;"><h1>Raw HTML</h1></div>',
      });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.headers.get('content-type'), 'image/png');
      const arrayBuffer = await res.arrayBuffer();
      assert.ok(arrayBuffer.byteLength > 0);
    } finally {
      config.apiKey = origKey;
    }
  });

  test('POST /screenshot missing url and html returns 400 Bad Request', async () => {
    const origKey = config.apiKey;
    config.apiKey = null;
    try {
      const res = await fetch(`${baseUrl}/screenshot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      assert.strictEqual(res.status, 400);
      const json = await res.json();
      assert.strictEqual(json.success, false);
      assert.strictEqual(json.error, 'Bad Request');
    } finally {
      config.apiKey = origKey;
    }
  });
});
