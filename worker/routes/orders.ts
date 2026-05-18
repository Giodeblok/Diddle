import { Hono } from 'hono';
import type { Env } from '../types/env.js';
import { createOrder, getWebsiteOrders, updateOrderStatus, getOrderById, type CreateOrderInput } from '../services/database.js';
import { sendOrderConfirmationToCustomer, sendOrderNotificationToAdmin } from '../services/email.js';

export const ordersRoutes = new Hono<{ Bindings: Env }>();

// POST /api/orders — publiek: klant plaatst bestelling
ordersRoutes.post('/', async (c) => {
  const body = await c.req.json<Partial<CreateOrderInput>>();

  const required: (keyof CreateOrderInput)[] = [
    'firstName', 'lastName', 'email',
    'address', 'postalCode', 'city',
    'productId', 'productName', 'productSubtitle',
    'productPrice', 'shippingOption', 'shippingPrice', 'totalPrice',
  ];

  const missing = required.filter((k) => body[k] === undefined || body[k] === null || body[k] === '');
  if (missing.length > 0) {
    return c.json({ error: `Ontbrekende velden: ${missing.join(', ')}` }, 400);
  }

  const input = body as CreateOrderInput;
  const { orderId, orderNumber } = await createOrder(c.env, input);

  // Stuur emails parallel — laat een mislukte email de bestelling niet blokkeren
  c.executionCtx.waitUntil(
    Promise.all([
      sendOrderConfirmationToCustomer(c.env, {
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
      sendOrderNotificationToAdmin(c.env, {
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
    })
  );

  return c.json({ orderId, orderNumber }, 201);
});

// GET /api/orders/website — admin: alle website bestellingen
ordersRoutes.get('/website', async (c) => {
  const status = c.req.query('status') ?? undefined;
  const limit = parseInt(c.req.query('limit') ?? '20', 10);
  const offset = parseInt(c.req.query('offset') ?? '0', 10);

  const result = await getWebsiteOrders(c.env, { status, limit, offset });
  return c.json(result);
});

// GET /api/orders/website/:orderId — admin: één bestelling met items
ordersRoutes.get('/website/:orderId', async (c) => {
  const order = await getOrderById(c.env, c.req.param('orderId'));
  if (!order) return c.json({ error: 'Bestelling niet gevonden.' }, 404);
  return c.json(order);
});

// PATCH /api/orders/website/:orderId/status — admin: status wijzigen
ordersRoutes.patch('/website/:orderId/status', async (c) => {
  const { status } = await c.req.json<{ status?: string }>();
  const validStatuses = ['pending', 'paid', 'in_production', 'shipped', 'delivered', 'cancelled'];

  if (!status || !validStatuses.includes(status)) {
    return c.json({ error: `Ongeldige status. Kies uit: ${validStatuses.join(', ')}` }, 400);
  }

  await updateOrderStatus(c.env, c.req.param('orderId'), status);
  return c.json({ success: true });
});
