import { Router, Request, Response, NextFunction } from 'express';
import {
  createOffer,
  listAllOffers,
  getOffer,
  updateOfferPrice,
  updateOfferStock,
  deleteOffer,
  getProcessStatus,
  PRODUCT_CATALOG,
} from '../services/bolcom-offers.js';
import {
  getOpenOrders,
  getAllOrders,
  getOrderById,
  cancelOrderItem,
  shipOrderItem,
} from '../services/bolcom-orders.js';
import {
  createWebhookSubscription,
  listSubscriptions,
  deleteSubscription,
  verifyWebhookPayload,
} from '../services/bolcom-webhooks.js';

const router = Router();

const wrap = (fn: (req: Request, res: Response) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res).catch(next);

// ---- Health ----

router.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    demo: process.env.BOL_DEMO_MODE === 'true',
    configured: !!(process.env.BOL_CLIENT_ID && process.env.BOL_CLIENT_SECRET),
  });
});

// ---- Product catalog ----

router.get('/catalog', (_req, res) => {
  res.json({ products: PRODUCT_CATALOG });
});

// ---- Offers ----

// List all your current bol.com offers
router.get('/offers', wrap(async (_req, res) => {
  const data = await listAllOffers();
  res.json(data);
}));

// Get a single offer
router.get('/offers/:offerId', wrap(async (req, res) => {
  const data = await getOffer(req.params.offerId);
  res.json(data);
}));

// Create offer for one of our catalog products
router.post('/offers', wrap(async (req, res) => {
  const { productId } = req.body as { productId: string };
  const product = PRODUCT_CATALOG.find((p) => p.id === productId);
  if (!product) {
    res.status(404).json({ error: 'Product not found in catalog' });
    return;
  }
  const status = await createOffer(product);
  res.json(status);
}));

// Create offers for ALL catalog products at once
router.post('/offers/publish-all', wrap(async (_req, res) => {
  const results = await Promise.all(PRODUCT_CATALOG.map(createOffer));
  res.json({ results });
}));

// Update price
router.put('/offers/:offerId/price', wrap(async (req, res) => {
  const { priceEur } = req.body as { priceEur: number };
  const status = await updateOfferPrice(req.params.offerId, priceEur);
  res.json(status);
}));

// Update stock
router.put('/offers/:offerId/stock', wrap(async (req, res) => {
  const { amount } = req.body as { amount: number };
  const status = await updateOfferStock(req.params.offerId, amount);
  res.json(status);
}));

// Delete offer
router.delete('/offers/:offerId', wrap(async (req, res) => {
  const status = await deleteOffer(req.params.offerId);
  res.json(status);
}));

// Process status polling
router.get('/process-status/:id', wrap(async (req, res) => {
  const status = await getProcessStatus(req.params.id);
  res.json(status);
}));

// ---- Orders ----

// Get open orders (new orders to process)
router.get('/orders/open', wrap(async (req, res) => {
  const minutes = Number(req.query.minutes ?? 60);
  const orders = await getOpenOrders(minutes);
  res.json({ orders, count: orders.length });
}));

// Get all orders
router.get('/orders', wrap(async (_req, res) => {
  const orders = await getAllOrders();
  res.json({ orders, count: orders.length });
}));

// Get single order
router.get('/orders/:orderId', wrap(async (req, res) => {
  const order = await getOrderById(req.params.orderId);
  res.json(order);
}));

// Cancel an order item
router.post('/orders/:orderId/cancel', wrap(async (req, res) => {
  const { orderItemId, reasonCode } = req.body as {
    orderItemId: string;
    reasonCode: string;
  };
  const status = await cancelOrderItem(req.params.orderId, orderItemId, reasonCode);
  res.json(status);
}));

// Ship an order item
router.post('/orders/ship', wrap(async (req, res) => {
  const { orderItemId, trackAndTrace, transporterCode } = req.body as {
    orderItemId: string;
    trackAndTrace: string;
    transporterCode?: string;
  };
  const status = await shipOrderItem(orderItemId, trackAndTrace, transporterCode);
  res.json(status);
}));

// ---- Webhooks ----

// Register webhook
router.post('/webhooks', wrap(async (req, res) => {
  const { webhookUrl } = req.body as { webhookUrl: string };
  const subscription = await createWebhookSubscription(webhookUrl);
  res.json(subscription);
}));

// List webhooks
router.get('/webhooks', wrap(async (_req, res) => {
  const subscriptions = await listSubscriptions();
  res.json({ subscriptions });
}));

// Delete webhook
router.delete('/webhooks/:id', wrap(async (req, res) => {
  await deleteSubscription(req.params.id);
  res.json({ success: true });
}));

// Receive bol.com webhook events (bol.com POSTs here when orders come in)
router.post('/webhook/events', (req, res) => {
  const body = req.body;

  if (!verifyWebhookPayload(body)) {
    res.status(400).json({ error: 'Invalid payload' });
    return;
  }

  console.log('[bol.com webhook] Event received:', JSON.stringify(body, null, 2));

  // TODO: process the event:
  // - if ORDER_PLACED: trigger your fulfillment workflow
  // - if RETURN_REQUESTED: handle the return
  // - if PROCESS_STATUS: update offer/shipment state

  res.status(200).json({ received: true });
});

export default router;
