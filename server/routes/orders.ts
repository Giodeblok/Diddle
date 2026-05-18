import { Router, Request, Response, NextFunction } from 'express';
import { createOrder, getWebsiteOrders, updateOrderStatus, getOrderById, type CreateOrderInput } from '../services/database.js';
import { sendOrderConfirmationToCustomer, sendOrderNotificationToAdmin } from '../services/email.js';

const router = Router();

const wrap = (fn: (req: Request, res: Response) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res).catch(next);

// POST /api/orders — publiek: klant plaatst bestelling
router.post('/', wrap(async (req, res) => {
  const body = req.body as Partial<CreateOrderInput>;

  const required: (keyof CreateOrderInput)[] = [
    'firstName', 'lastName', 'email',
    'address', 'postalCode', 'city',
    'productId', 'productName', 'productSubtitle',
    'productPrice', 'shippingOption', 'shippingPrice', 'totalPrice',
  ];

  const missing = required.filter((k) => body[k] === undefined || body[k] === null || body[k] === '');
  if (missing.length > 0) {
    res.status(400).json({ error: `Ontbrekende velden: ${missing.join(', ')}` });
    return;
  }

  const input = body as CreateOrderInput;
  const { orderId, orderNumber } = await createOrder(input);

  // Stuur emails parallel — laat een mislukte email de bestelling niet blokkeren
  Promise.all([
    sendOrderConfirmationToCustomer({
      customerEmail: input.email,
      customerName: `${input.firstName} ${input.lastName}`,
      orderNumber,
      productName: input.productName,
      productSubtitle: input.productSubtitle,
      shippingOption: input.shippingOption,
      productPrice: input.productPrice,
      shippingPrice: input.shippingPrice,
      total: input.totalPrice,
      address: input.address,
      postalCode: input.postalCode,
      city: input.city,
    }),
    sendOrderNotificationToAdmin({
      orderNumber,
      customerName: `${input.firstName} ${input.lastName}`,
      customerEmail: input.email,
      productName: input.productName,
      total: input.totalPrice,
      address: input.address,
      postalCode: input.postalCode,
      city: input.city,
    }),
  ]).catch((err) => {
    console.error('[orders] Email fout na opslaan bestelling:', err.message);
  });

  res.status(201).json({ orderId, orderNumber });
}));

// GET /api/orders/website — admin: alle website bestellingen
router.get('/website', wrap(async (req, res) => {
  const status = typeof req.query.status === 'string' ? req.query.status : undefined;
  const limit = parseInt(String(req.query.limit ?? '20'), 10);
  const offset = parseInt(String(req.query.offset ?? '0'), 10);

  const result = await getWebsiteOrders({ status, limit, offset });
  res.json(result);
}));

// GET /api/orders/website/:orderId — admin: één bestelling met items
router.get('/website/:orderId', wrap(async (req, res) => {
  const order = await getOrderById(req.params.orderId as string);
  if (!order) {
    res.status(404).json({ error: 'Bestelling niet gevonden.' });
    return;
  }
  res.json(order);
}));

// PATCH /api/orders/website/:orderId/status — admin: status wijzigen
router.patch('/website/:orderId/status', wrap(async (req, res) => {
  const { status } = req.body as { status?: string };
  const validStatuses = ['pending', 'paid', 'in_production', 'shipped', 'delivered', 'cancelled'];

  if (!status || !validStatuses.includes(status)) {
    res.status(400).json({ error: `Ongeldige status. Kies uit: ${validStatuses.join(', ')}` });
    return;
  }

  await updateOrderStatus(req.params.orderId as string, status);
  res.json({ success: true });
}));

export default router;
