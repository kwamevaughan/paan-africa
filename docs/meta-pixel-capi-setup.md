# Meta Pixel + Conversions API (Summit ticket Purchase tracking)

## What fires where

| Event | Source | Location |
| --- | --- | --- |
| `PageView`, `ViewContent`, `AddToCart`, `InitiateCheckout` | Browser Pixel | base code in `src/pages/_app.js` + component-level calls |
| `Purchase` (browser) | Browser Pixel | `src/pages/payment/success.js` — fires on `/payment/success`, deduped per reference via `sessionStorage`, passes `value`, `currency`, and `eventID` (= payment reference) |
| `Purchase` (server) | Conversions API | `src/pages/api/paystack/webhook.js` → `handleSuccessfulPayment()` → `src/lib/meta-capi.js`, fired on Paystack `charge.success` (signature-verified), same `event_id` = payment reference |

Browser and server `Purchase` events share `event_id`, so Meta deduplicates them
into one conversion. The server event is the reliable one for M-Pesa, which can
complete after the buyer has left the success page.

## Required environment variables

Add to the deployment environment (and `.env.local` for testing):

```
META_PIXEL_ID=706159915533812
META_CAPI_ACCESS_TOKEN=<System User token from Events Manager > Settings > Conversions API>
# Optional, only while validating:
META_CAPI_TEST_EVENT_CODE=<from Events Manager > Test Events>
# Optional:
META_GRAPH_API_VERSION=v21.0
```

> The Pixel base-code ID in `_app.js` is currently hardcoded. `META_PIXEL_ID`
> here is for the server. Keep them the same value.

## Meta side (must be done in Events Manager — not in code)

1. Events Manager → Data Sources → the PAAN Pixel (`706159915533812`).
2. Settings → Conversions API → **Generate access token** → set as `META_CAPI_ACCESS_TOKEN`.
3. Rotate/regenerate any token that was shared in plaintext.

## Validating without a real payment

1. Events Manager → Test Events → copy the test event code.
2. `npm run test:meta-capi TEST12345` (optionally `... TEST12345 25 USD`).
3. Confirm the `Purchase` event appears in Test Events.
4. For the full browser flow, switch the site to Paystack **test keys** and pay
   with a Paystack test card — this exercises `/payment/success` (browser Pixel)
   and the test webhook (CAPI) together.
5. M-Pesa is not available in Paystack test mode — verify it with one small
   real-tier M-Pesa purchase, then refund via Paystack.

## Notes / limitations

- The browser `Purchase` still triggers off Paystack's client-side success
  callback, not a server verification. The CAPI event (from the
  signature-verified webhook) is the trustworthy one.
- `value` in the browser event comes from a URL param and is user-editable; the
  CAPI event uses the amount reported by Paystack.
- The Paystack webhook URL must be registered in the Paystack dashboard for the
  server event to fire.
