import { Hono } from 'hono';
import type { Env } from '../types/env.js';
import { sendContactEmail, sendOrderConfirmationToCustomer, sendOrderNotificationToAdmin, type OrderConfirmationData } from '../services/email.js';

export const emailRoutes = new Hono<{ Bindings: Env }>();

emailRoutes.post('/contact', async (c) => {
  const { name, email, message } = await c.req.json<Record<string, string>>();

  if (!name || !email || !message) {
    return c.json({ error: 'Vul alle verplichte velden in: naam, e-mail en bericht.' }, 400);
  }

  await sendContactEmail(c.env, { name, email, message });
  return c.json({ success: true });
});

emailRoutes.post('/order-confirmation', async (c) => {
  const body = await c.req.json<Partial<OrderConfirmationData>>();

  const required: (keyof OrderConfirmationData)[] = [
    'customerEmail', 'customerName', 'orderNumber',
    'productName', 'productSubtitle', 'shippingOption',
    'productPrice', 'shippingPrice', 'total',
    'address', 'postalCode', 'city',
  ];

  const missing = required.filter((k) => body[k] === undefined || body[k] === null || body[k] === '');
  if (missing.length > 0) {
    return c.json({ error: `Ontbrekende velden: ${missing.join(', ')}` }, 400);
  }

  const data = body as OrderConfirmationData;

  await Promise.all([
    sendOrderConfirmationToCustomer(c.env, data),
    sendOrderNotificationToAdmin(c.env, {
      orderNumber: data.orderNumber,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      productName: data.productName,
      total: data.total,
      address: data.address,
      postalCode: data.postalCode,
      city: data.city,
    }),
  ]);

  return c.json({ success: true });
});
