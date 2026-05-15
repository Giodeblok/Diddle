import { Hono } from 'hono';
import type { Env } from '../types/env.js';
import { isConfigured } from '../services/myparcel-client.js';
import {
  createShipment, getShipment, getShipmentLabel, trackShipment,
  createShipmentFromBolOrder, splitStreetAddress,
} from '../services/myparcel-shipments.js';
import type { MyParcelCarrier, MyParcelPackageType, MyParcelRecipient } from '../types/myparcel.js';

export const myparcelRoutes = new Hono<{ Bindings: Env }>();

myparcelRoutes.get('/health', (c) =>
  c.json({ status: 'ok', configured: isConfigured(c.env) })
);

myparcelRoutes.post('/shipments/from-bol/:orderId', async (c) => {
  const { carrier, packageType } = await c.req.json<{
    carrier?: MyParcelCarrier;
    packageType?: MyParcelPackageType;
  }>();
  const result = await createShipmentFromBolOrder(c.env, c.req.param('orderId'), { carrier, packageType });
  return c.json(result, 201);
});

myparcelRoutes.post('/shipments', async (c) => {
  const {
    address, street, number, postalCode, city, name,
    email, phone, countryCode, carrier, packageType,
    onlyRecipient, requireSignature, reference,
  } = await c.req.json<{
    address?: string; street?: string; number?: string;
    postalCode: string; city: string; name: string;
    email?: string; phone?: string; countryCode?: string;
    carrier?: MyParcelCarrier; packageType?: MyParcelPackageType;
    onlyRecipient?: boolean; requireSignature?: boolean; reference?: string;
  }>();

  let resolvedStreet = street ?? '';
  let resolvedNumber = number ?? '';
  if (address && !street) {
    const split = splitStreetAddress(address);
    resolvedStreet = split.street;
    resolvedNumber = split.number;
  }

  const recipient: MyParcelRecipient = {
    cc: countryCode ?? 'NL', city, street: resolvedStreet,
    number: resolvedNumber, postal_code: postalCode, person: name, email, phone,
  };

  const result = await createShipment(c.env, { recipient, carrier, packageType, onlyRecipient, requireSignature, reference });
  return c.json(result, 201);
});

myparcelRoutes.get('/shipments/:id', async (c) => {
  const shipment = await getShipment(c.env, Number(c.req.param('id')));
  return c.json(shipment);
});

myparcelRoutes.get('/shipments/:id/label', async (c) => {
  const id = Number(c.req.param('id'));
  const pdfBuffer = await getShipmentLabel(c.env, id);
  return new Response(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="label-${id}.pdf"`,
    },
  });
});

myparcelRoutes.get('/track/:barcode/:postalCode', async (c) => {
  const trace = await trackShipment(c.env, c.req.param('barcode'), c.req.param('postalCode'));
  return c.json(trace);
});
