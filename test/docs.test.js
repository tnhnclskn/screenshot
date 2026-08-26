const { test, describe } = require('node:test');
const assert = require('node:assert');
const { renderDocsPage } = require('../src/views/docs');

describe('Documentation & Playground View Tests', () => {
  test('renderDocsPage renders HTML string with expected title and meta', () => {
    const config = { port: 3000, apiKey: null };
    const html = renderDocsPage(config);

    assert.strictEqual(typeof html, 'string');
    assert.ok(html.includes('<!DOCTYPE html>'));
    assert.ok(html.includes('Screenshot & Screen Recording API'));
  });

  test('renderDocsPage includes all required Video and Screenshot endpoints', () => {
    const config = { port: 3000, apiKey: 'test-key' };
    const html = renderDocsPage(config);

    // Endpoints
    assert.ok(html.includes('/record'), 'Must include /record endpoint');
    assert.ok(html.includes('/video'), 'Must include /video endpoint');
    assert.ok(html.includes('/html/record'), 'Must include /html/record endpoint');
    assert.ok(html.includes('/screenshot'), 'Must include /screenshot endpoint');
    assert.ok(html.includes('/html'), 'Must include /html endpoint');
    assert.ok(html.includes('/up'), 'Must include /up endpoint');
  });

  test('renderDocsPage includes all supported core parameters in documentation table', () => {
    const config = { port: 3000, apiKey: null };
    const html = renderDocsPage(config);

    const requiredParams = [
      'url',
      'html',
      'duration',
      'fps',
      'format',
      'scroll',
      'element',
      'fullPage',
      'quality',
      'width',
      'height',
      'delay',
      'waitForSelector',
      'clickSelector',
    ];

    for (const param of requiredParams) {
      assert.ok(
        html.includes(`<code>${param}</code>`),
        `Parameter "${param}" must be documented in the parameters table`
      );
    }
  });

  test('renderDocsPage includes code examples for cURL, JS, Python, PHP', () => {
    const config = { port: 3000, apiKey: null };
    const html = renderDocsPage(config);

    assert.ok(html.includes('/record'));
    assert.ok(html.includes('/screenshot'));
    assert.ok(html.includes('requests.post'));
    assert.ok(html.includes('curl_init'));
    assert.ok(html.includes('axios.post') || html.includes('fetch('));
  });

  test('renderDocsPage includes Video Playground controls and elements', () => {
    const config = { port: 3000, apiKey: null };
    const html = renderDocsPage(config);

    assert.ok(html.includes('btnModeRecord'), 'Must include Video mode button');
    assert.ok(html.includes('pVideoFormat'), 'Must include video format selector');
    assert.ok(html.includes('pDuration'), 'Must include video duration input');
    assert.ok(html.includes('pFps'), 'Must include video fps selector');
    assert.ok(html.includes('pScroll'), 'Must include scroll selector');
    assert.ok(html.includes('previewVideo'), 'Must include video preview element');
  });

  test('renderDocsPage includes advanced collapsible parameters', () => {
    const config = { port: 3000, apiKey: null };
    const html = renderDocsPage(config);

    assert.ok(html.includes('advanced-details'));
    assert.ok(html.includes('pWidth'));
    assert.ok(html.includes('pHeight'));
    assert.ok(html.includes('pDeviceScaleFactor'));
    assert.ok(html.includes('pDelay'));
    assert.ok(html.includes('pWaitForSelector'));
    assert.ok(html.includes('pClickSelector'));
    assert.ok(html.includes('pQuality'));
    assert.ok(html.includes('pUserAgent'));
    assert.ok(html.includes('pHideSelectors'));
    assert.ok(html.includes('pRemoveSelectors'));
    assert.ok(html.includes('pHeaders'));
    assert.ok(html.includes('pCookies'));
  });

  test('renderDocsPage respects apiKey configuration for auth badge', () => {
    const publicHtml = renderDocsPage({ port: 3000, apiKey: null });
    assert.ok(publicHtml.includes('Public Mode'));

    const authHtml = renderDocsPage({ port: 3000, apiKey: 'secret-123' });
    assert.ok(authHtml.includes('Auth Aktif'));
  });
});
