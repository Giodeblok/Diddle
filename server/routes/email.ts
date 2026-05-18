import { Router, Request, Response, NextFunction } from 'express';
import {
  sendContactEmail,
  sendOrderConfirmationToCustomer,
  sendOrderNotificationToAdmin,
  type OrderConfirmationData,
} from '../services/email.js';

const router = Router();

const wrap = (fn: (req: Request, res: Response) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res).catch(next);

router.post('/contact', wrap(async (req, res) => {
  const { name, email, message } = req.body as Record<string, string>;

  if (!name || !email || !message) {
    res.status(400).json({ error: 'Vul alle verplichte velden in: naam, e-mail en bericht.' });
    return;
  }

  await sendContactEmail({ name, email, message });
  res.json({ success: true });
}));

router.post('/order-confirmation', wrap(async (req, res) => {
  const body = req.body as Partial<OrderConfirmationData>;

  const required: (keyof OrderConfirmationData)[] = [
    'customerEmail', 'customerName', 'orderNumber',
    'productName', 'productSubtitle', 'shippingOption',
    'productPrice', 'shippingPrice', 'total',
    'address', 'postalCode', 'city',
  ];

  const missing = required.filter((k) => body[k] === undefined || body[k] === null || body[k] === '');
  if (missing.length > 0) {
    res.status(400).json({ error: `Ontbrekende velden: ${missing.join(', ')}` });
    return;
  }

  const data = body as OrderConfirmationData;

  await Promise.all([
    sendOrderConfirmationToCustomer(data),
    sendOrderNotificationToAdmin({
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

  res.json({ success: true });
}));

export default router;
