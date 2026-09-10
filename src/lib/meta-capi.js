import crypto from 'crypto';

// Meta Conversions API (server-side) helper.
//
// Sends server-side events to the same Pixel used in the browser so that
// conversions are still recorded when the client-side Pixel is blocked or the
// user leaves the success page early (common with M-Pesa async completion).
//
// Browser and server events share the same `eventId` (the payment reference),
// so Meta deduplicates them and counts one Purchase.
//
// Required env vars:
//   META_PIXEL_ID            - e.g. 706159915533812 (falls back to NEXT_PUBLIC_META_PIXEL_ID)
//   META_CAPI_ACCESS_TOKEN   - System User / CAPI token generated in Events Manager
// Optional:
//   META_CAPI_TEST_EVENT_CODE - set while validating in Events Manager > Test Events
//   META_GRAPH_API_VERSION    - defaults to v21.0

const GRAPH_VERSION = process.env.META_GRAPH_API_VERSION || 'v21.0';

const sha256 = (value) => {
  if (value === undefined || value === null) return undefined;
  const normalized = String(value).trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash('sha256').update(normalized).digest('hex');
};

// Phone numbers must be hashed digits-only, ideally with country code.
const hashPhone = (value) => {
  if (!value) return undefined;
  const digits = String(value).replace(/[^0-9]/g, '');
  if (!digits) return undefined;
  return crypto.createHash('sha256').update(digits).digest('hex');
};

export const isMetaCapiConfigured = () =>
  Boolean(
    (process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID) &&
      process.env.META_CAPI_ACCESS_TOKEN
  );

/**
 * Send a server-side Purchase event to Meta.
 * Never throws - returns { ok, status, body|error }. Callers should not block on it.
 */
export const sendMetaPurchaseEvent = async ({
  eventId,
  value,
  currency = 'USD',
  email,
  phone,
  firstName,
  lastName,
  country,
  clientIpAddress,
  clientUserAgent,
  fbp,
  fbc,
  eventSourceUrl,
  contentName,
  actionSource = 'website',
  testEventCode,
} = {}) => {
  const pixelId = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    console.warn('[meta-capi] Skipped: META_PIXEL_ID or META_CAPI_ACCESS_TOKEN not set');
    return { ok: false, skipped: true };
  }

  const userData = {
    em: sha256(email),
    ph: hashPhone(phone),
    fn: sha256(firstName),
    ln: sha256(lastName),
    country: sha256(country),
    client_ip_address: clientIpAddress || undefined,
    client_user_agent: clientUserAgent || undefined,
    fbp: fbp || undefined,
    fbc: fbc || undefined,
  };
  Object.keys(userData).forEach((k) => userData[k] === undefined && delete userData[k]);

  const numericValue =
    value === undefined || value === null || Number.isNaN(Number(value))
      ? undefined
      : Number(Number(value).toFixed(2));

  const payload = {
    data: [
      {
        event_name: 'Purchase',
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId ? String(eventId) : undefined,
        action_source: actionSource,
        event_source_url: eventSourceUrl || undefined,
        user_data: userData,
        custom_data: {
          currency: String(currency || 'USD').toUpperCase(),
          value: numericValue,
          content_name: contentName || undefined,
          content_type: 'product',
        },
      },
    ],
  };

  const effectiveTestCode = testEventCode || process.env.META_CAPI_TEST_EVENT_CODE;
  if (effectiveTestCode) payload.test_event_code = effectiveTestCode;

  const url = `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(
    accessToken
  )}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error('[meta-capi] Purchase event rejected', res.status, body);
      return { ok: false, status: res.status, body };
    }
    console.log('[meta-capi] Purchase event sent', { eventId, value: numericValue, currency });
    return { ok: true, status: res.status, body };
  } catch (error) {
    console.error('[meta-capi] Purchase event request failed', error);
    return { ok: false, error: error.message };
  }
};
