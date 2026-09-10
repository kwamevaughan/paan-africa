/**
 * Send a test Purchase event to Meta Conversions API.
 *
 * Use this to validate the CAPI setup in Events Manager > Test Events without
 * running a real payment. Grab the test event code from that tab first.
 *
 * Run with:
 *   node scripts/test-meta-capi.js TEST12345
 *   node scripts/test-meta-capi.js TEST12345 25 USD
 *
 * Requires META_PIXEL_ID (or NEXT_PUBLIC_META_PIXEL_ID) and
 * META_CAPI_ACCESS_TOKEN in .env.local.
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env.local');
try {
  fs.readFileSync(envPath, 'utf8')
    .split('\n')
    .forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const idx = trimmed.indexOf('=');
      if (idx === -1) return;
      const key = trimmed.slice(0, idx).trim();
      const value = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
      if (!(key in process.env)) process.env[key] = value;
    });
} catch (e) {
  console.warn('Could not read .env.local:', e.message);
}

const [, , testEventCode, valueArg, currencyArg] = process.argv;

if (!testEventCode) {
  console.error('Usage: node scripts/test-meta-capi.js <TEST_EVENT_CODE> [value] [currency]');
  process.exit(1);
}

const pixelId = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
const version = process.env.META_GRAPH_API_VERSION || 'v21.0';

if (!pixelId || !accessToken) {
  console.error('Missing META_PIXEL_ID or META_CAPI_ACCESS_TOKEN in .env.local');
  process.exit(1);
}

const sha256 = (v) => crypto.createHash('sha256').update(String(v).trim().toLowerCase()).digest('hex');

const payload = {
  data: [
    {
      event_name: 'Purchase',
      event_time: Math.floor(Date.now() / 1000),
      event_id: `test_${Date.now()}`,
      action_source: 'website',
      event_source_url: 'https://paan.africa/payment/success',
      user_data: {
        em: sha256('capi-test@paan.africa'),
        ph: crypto.createHash('sha256').update('254700000000').digest('hex'),
      },
      custom_data: {
        currency: (currencyArg || 'USD').toUpperCase(),
        value: Number(valueArg || 25),
        content_name: 'summit ticket',
        content_type: 'product',
      },
    },
  ],
  test_event_code: testEventCode,
};

(async () => {
  const url = `https://graph.facebook.com/${version}/${pixelId}/events?access_token=${encodeURIComponent(
    accessToken
  )}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const body = await res.json();
  console.log('HTTP', res.status);
  console.log(JSON.stringify(body, null, 2));
  console.log(
    res.ok
      ? '\nOK - check Events Manager > Test Events for the Purchase event.'
      : '\nFailed - see error above.'
  );
  process.exit(res.ok ? 0 : 1);
})();
