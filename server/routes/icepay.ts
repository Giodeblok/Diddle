import { Router, Request, Response } from 'express';
import crypto from 'crypto';
import { updateOrderStatusByOrderNumber } from '../services/database.js';

const router = Router();
const ICEPAY_BASE = 'https://checkout.icepay.com/api';

function authHeader(): string {
  const id = process.env.ICEPAY_MERCHANT_ID ?? '';
  const secret = process.env.ICEPAY_MERCHANT_SECRET ?? '';
  return 'Basic ' + Buffer.from(`${id}:${secret}`).toString('base64');
}

// POST /api/icepay/payment — maak een betaling aan en geef checkout URL terug
router.post('/payment', async (req: Request, res: Response) => {
  try {
    const {
      productName,
      amountEuros,
      currency = 'EUR',
      email,
      paymentMethod,
      reference,
    } = req.body as {
      productName: string;
      amountEuros: number;
      currency?: string;
      email?: string;
      paymentMethod?: string;
      reference?: string;
    };

    if (!productName || !amountEuros) {
      res.status(400).json({ error: 'productName en amountEuros zijn verplicht' });
      return;
    }

    const payload: Record<string, unknown> = {
      reference: reference ?? `EDB-${Date.now()}`,
      description: productName,
      amount: {
        value: Math.round(amountEuros * 100),
        currency,
      },
      redirectUrl: `${process.env.FRONTEND_URL ?? 'http://localhost:5173'}/betaling/resultaat`,
      webhookUrl: `${process.env.SERVER_URL ?? 'http://localhost:3001'}/api/icepay/webhook`,
    };

    if (email) payload.customer = { email };
    if (paymentMethod) payload.paymentMethod = { type: paymentMethod };

    const upstream = await fetch(`${ICEPAY_BASE}/payments`, {
      method: 'POST',
      headers: {
        Authorization: authHeader(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!upstream.ok) {
      const errBody = await upstream.json().catch(() => ({}));
      console.error('[icepay] create payment failed', upstream.status, errBody);
      res.status(upstream.status).json({ error: 'iCEPAY fout', detail: errBody });
      return;
    }

    const data = await upstream.json() as {
      key: string;
      status: string;
      links?: { checkout?: string };
    };

    res.json({
      key: data.key,
      checkoutUrl: data.links?.checkout,
      status: data.status,
    });
  } catch (err) {
    console.error('[icepay] create payment exception', err);
    res.status(500).json({ error: 'Interne serverfout' });
  }
});

// GET /api/icepay/payment/:key — haal betaalstatus op
router.get('/payment/:key', async (req: Request, res: Response) => {
  try {
    const upstream = await fetch(`${ICEPAY_BASE}/payments/${req.params.key}`, {
      headers: { Authorization: authHeader() },
    });

    if (!upstream.ok) {
      res.status(upstream.status).json({ error: 'Betaling niet gevonden' });
      return;
    }

    const data = await upstream.json() as {
      key: string;
      status: string;
      amount: { value: number; currency: string };
      paymentMethod?: { type: string };
    };

    res.json({
      key: data.key,
      status: data.status,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
    });
  } catch (err) {
    console.error('[icepay] get payment exception', err);
    res.status(500).json({ error: 'Interne serverfout' });
  }
});

// POST /api/icepay/webhook — ontvang betalingsstatus-updates van iCEPAY
router.post('/webhook', async (req: Request, res: Response) => {
  const signature = req.headers['icepay-signature'] as string | undefined;

  if (signature) {
    const rawBody = (req as Request & { rawBody?: Buffer }).rawBody;
    const secret = process.env.ICEPAY_MERCHANT_SECRET ?? '';

    if (rawBody) {
      const expected = crypto
        .createHmac('sha256', secret)
        .update(rawBody)
        .digest('base64');

      if (signature !== expected) {
        console.warn('[icepay] webhook: ongeldige handtekening');
        res.status(401).json({ error: 'Ongeldige handtekening' });
        return;
      }
    }
  }

  const event = req.body as { key?: string; status?: string; reference?: string };
  console.log('[icepay] webhook ontvangen: key=%s status=%s reference=%s', event.key, event.status, event.reference);

  if (event.reference) {
    if (event.status === 'COMPLETED' || event.status === 'PAID') {
      await updateOrderStatusByOrderNumber(event.reference, 'paid').catch((err) =>
        console.error('[icepay] webhook: kon orderstatus niet bijwerken', err)
      );
    } else if (event.status === 'FAILED' || event.status === 'CANCELLED') {
      await updateOrderStatusByOrderNumber(event.reference, 'cancelled').catch((err) =>
        console.error('[icepay] webhook: kon orderstatus niet bijwerken', err)
      );
    }
  }

  res.status(200).json({ received: true });
});

export default router;