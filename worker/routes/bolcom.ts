import { Hono } from 'hono';
import type { Env } from '../types/env.js';
import {
  createOffer, listAllOffers, getOffer, updateOfferPrice, updateOfferStock,
  deleteOffer, getProcessStatus, PRODUCT_CATALOG, isDemo,
} from '../services/bolcom-offers.js';
import {
  getOpenOrders, getAllOrders, getOrderById, cancelOrderItem, shipOrderItem,
} from '../services/bolcom-orders.js';
import {
  createWebhookSubscription, listSubscriptions, deleteSubscription, verifyWebhookPayload,
} from '../services/bolcom-webhooks.js';

export const bolcomRoutes = new Hono<{ Bindings: Env }>();

// ---- Health ----

bolcomRoutes.get('/health', (c) =>
  c.json({ status: 'ok', demo: isDemo(c.env), configured: !!(c.env.BOL_CLIENT_ID && c.env.BOL_CLIENT_SECRET) })
);

// ---- Catalog ----

bolcomRoutes.get('/catalog', (c) => c.json({ products: PRODUCT_CATALOG }));

// ---- Offers ----

bolcomRoutes.get('/offers', async (c) => c.json(await listAllOffers(c.env)));
bolcomRoutes.get('/offers/:offerId', async (c) => c.json(await getOffer(c.env, c.req.param('offerId'))));

bolcomRoutes.post('/offers', async (c) => {
  const { productId } = await c.req.json<{ productId: string }>();
  const product = PRODUCT_CATALOG.find((p) => p.id === productId);
  if (!product) return c.json({ error: 'Product niet gevonden in catalogus' }, 404);
  return c.json(await createOffer(c.env, product));
});

bolcomRoutes.post('/offers/publish-all', async (c) => {
  const results = await Promise.all(PRODUCT_CATALOG.map((p) => createOffer(c.env, p)));
  return c.json({ results });
});

bolcomRoutes.put('/offers/:offerId/price', async (c) => {
  const { priceEur } = await c.req.json<{ priceEur: number }>();
  return c.json(await updateOfferPrice(c.env, c.req.param('offerId'), priceEur));
});

bolcomRoutes.put('/offers/:offerId/stock', async (c) => {
  const { amount } = await c.req.json<{ amount: number }>();
  return c.json(await updateOfferStock(c.env, c.req.param('offerId'), amount));
});

bolcomRoutes.delete('/offers/:offerId', async (c) =>
  c.json(await deleteOffer(c.env, c.req.param('offerId')))
);

bolcomRoutes.get('/process-status/:id', async (c) =>
  c.json(await getProcessStatus(c.env, c.req.param('id')))
);

// ---- Orders ----

bolcomRoutes.get('/orders/open', async (c) => {
  const minutes = Number(c.req.query('minutes') ?? 60);
  const orders = await getOpenOrders(c.env, minutes);
  return c.json({ orders, count: orders.length });
});

bolcomRoutes.get('/orders', async (c) => {
  const orders = await getAllOrders(c.env);
  return c.json({ orders, count: orders.length });
});

bolcomRoutes.get('/orders/:orderId', async (c) =>
  c.json(await getOrderById(c.env, c.req.param('orderId')))
);

bolcomRoutes.post('/orders/:orderId/cancel', async (c) => {
  const { orderItemId, reasonCode } = await c.req.json<{ orderItemId: string; reasonCode: string }>();
  return c.json(await cancelOrderItem(c.env, c.req.param('orderId'), orderItemId, reasonCode));
});

bolcomRoutes.post('/orders/ship', async (c) => {
  const { orderItemId, trackAndTrace, transporterCode } = await c.req.json<{
    orderItemId: string;
    trackAndTrace: string;
    transporterCode?: string;
  }>();
  return c.json(await shipOrderItem(c.env, orderItemId, trackAndTrace, transporterCode));
});

// ---- Webhooks ----

bolcomRoutes.post('/webhooks', async (c) => {
  const { webhookUrl } = await c.req.json<{ webhookUrl: string }>();
  return c.json(await createWebhookSubscription(c.env, webhookUrl));
});

bolcomRoutes.get('/webhooks', async (c) => {
  const subscriptions = await listSubscriptions(c.env);
  return c.json({ subscriptions });
});

bolcomRoutes.delete('/webhooks/:id', async (c) => {
  await deleteSubscription(c.env, c.req.param('id'));
  return c.json({ success: true });
});

// Publiek — geen JWT vereist (bol.com POST hier naar toe)
bolcomRoutes.post('/webhook/events', async (c) => {
  const body = await c.req.json();
  if (!verifyWebhookPayload(body)) return c.json({ error: 'Invalid payload' }, 400);
  console.log('[bol.com webhook] Event ontvangen:', JSON.stringify(body, null, 2));
  return c.json({ received: true });
});
