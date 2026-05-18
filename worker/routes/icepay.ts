import { Hono } from 'hono';
import type { Env } from '../types/env.js';
import { updateOrderStatusByOrderNumber } from '../services/database.js';

export const icepayRoutes = new Hono<{ Bindings: Env }>();

const ICEPAY_BASE = 'https://checkout.icepay.com/api';

function authHeader(env: Env): string {
  return 'Basic ' + btoa(`${env.ICEPAY_MERCHANT_ID}:${env.ICEPAY_MERCHANT_SECRET}`);
}

// POST /api/icepay/payment — maak betaling aan en geef checkout URL terug
icepayRoutes.post('/payment', async (c) => {
  const body = await c.req.json<{
    productName: string;
    amountEuros: number;
    currency?: string;
    email?: string;
    paymentMethod?: string;
    reference?: string;
  }>();

  const { productName, amountEuros, currency = 'EUR', email, paymentMethod, reference } = body;

  if (!productName || !amountEuros) {
    return c.json({ error: 'productName en amountEuros zijn verplicht' }, 400);
  }

  const payload: Record<string, unknown> = {
    reference: reference ?? `EDB-${Date.now()}`,
    description: productName,
    amount: {
      value: Math.round(amountEuros * 100),
      currency,
    },
    redirectUrl: `${c.env.FRONTEND_URL ?? 'http://localhost:5173'}/betaling/resultaat`,
    webhookUrl: `${c.env.SERVER_URL ?? 'https://eeuwighart-api.workers.dev'}/api/icepay/webhook`,
  };

  if (email) payload.customer = { email };
  if (paymentMethod) payload.paymentMethod = { type: paymentMethod };

  const upstream = await fetch(`${ICEPAY_BASE}/payments`, {
    method: 'POST',
    headers: {
      Authorization: authHeader(c.env),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!upstream.ok) {
    const errBody = await upstream.json().catch(() => ({}));
    console.error('[icepay] create payment failed', upstream.status, errBody);
    return c.json({ error: 'iCEPAY fout', detail: errBody }, upstream.status as any);
  }

  const data = await upstream.json() as {
    key: string;
    status: string;
    links?: { checkout?: string };
  };

  return c.json({
    key: data.key,
    checkoutUrl: data.links?.checkout,
    status: data.status,
  });
});

// GET /api/icepay/payment/:key — haal betaalstatus op
icepayRoutes.get('/payment/:key', async (c) => {
  const key = c.req.param('key');

  const upstream = await fetch(`${ICEPAY_BASE}/payments/${key}`, {
    headers: { Authorization: authHeader(c.env) },
  });

  if (!upstream.ok) {
    return c.json({ error: 'Betaling niet gevonden' }, upstream.status as any);
  }

  const data = await upstream.json() as {
    key: string;
    status: string;
    amount: { value: number; currency: string };
    paymentMethod?: { type: string };
  };

  return c.json({
    key: data.key,
    status: data.status,
    amount: data.amount,
    paymentMethod: data.paymentMethod,
  });
});

// POST /api/icepay/webhook — ontvang betalingsstatus-updates van iCEPAY
icepayRoutes.post('/webhook', async (c) => {
  const event = await c.req.json<{ key?: string; status?: string; reference?: string }>();
  console.log('[icepay] webhook ontvangen: key=%s status=%s reference=%s', event.key, event.status, event.reference);

  if (event.reference) {
    if (event.status === 'COMPLETED' || event.status === 'PAID') {
      await updateOrderStatusByOrderNumber(c.env, event.reference, 'paid').catch((err) =>
        console.error('[icepay] webhook: kon orderstatus niet bijwerken', err)
      );
    } else if (event.status === 'FAILED' || event.status === 'CANCELLED') {
      await updateOrderStatusByOrderNumber(c.env, event.reference, 'cancelled').catch((err) =>
        console.error('[icepay] webhook: kon orderstatus niet bijwerken', err)
      );
    }
  }

  return c.json({ received: true });
});
