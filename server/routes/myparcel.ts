import { Router, Request, Response, NextFunction } from 'express';
import { isConfigured } from '../services/myparcel-client.js';
import {
  createShipment,
  getShipment,
  getShipmentLabel,
  trackShipment,
  createShipmentFromBolOrder,
  splitStreetAddress,
} from '../services/myparcel-shipments.js';
import type { MyParcelCarrier, MyParcelPackageType, MyParcelRecipient } from '../types/myparcel.js';

const router = Router();

const wrap = (fn: (req: Request, res: Response) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res).catch(next);

// ---- Health ----

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', configured: isConfigured() });
});

// ---- Zendingen ----

// Maak een zending van een bol.com order
router.post('/shipments/from-bol/:orderId', wrap(async (req, res) => {
  const { orderId } = req.params;
  const { carrier, packageType } = req.body as {
    carrier?: MyParcelCarrier;
    packageType?: MyParcelPackageType;
  };

  const result = await createShipmentFromBolOrder(orderId, { carrier, packageType });
  res.status(201).json(result);
}));

// Maak een zending handmatig aan
router.post('/shipments', wrap(async (req, res) => {
  const {
    address,
    street,
    number,
    postalCode,
    city,
    name,
    email,
    phone,
    countryCode,
    carrier,
    packageType,
    onlyRecipient,
    requireSignature,
    reference,
  } = req.body as {
    address?: string;
    street?: string;
    number?: string;
    postalCode: string;
    city: string;
    name: string;
    email?: string;
    phone?: string;
    countryCode?: string;
    carrier?: MyParcelCarrier;
    packageType?: MyParcelPackageType;
    onlyRecipient?: boolean;
    requireSignature?: boolean;
    reference?: string;
  };

  // Accepteer zowel een gecombineerd "address"-veld als aparte street/number velden
  let resolvedStreet = street ?? '';
  let resolvedNumber = number ?? '';
  if (address && !street) {
    const split = splitStreetAddress(address);
    resolvedStreet = split.street;
    resolvedNumber = split.number;
  }

  const recipient: MyParcelRecipient = {
    cc: countryCode ?? 'NL',
    city,
    street: resolvedStreet,
    number: resolvedNumber,
    postal_code: postalCode,
    person: name,
    email,
    phone,
  };

  const result = await createShipment({
    recipient,
    carrier,
    packageType,
    onlyRecipient,
    requireSignature,
    reference,
  });

  res.status(201).json(result);
}));

// Haal zendingsstatus op
router.get('/shipments/:id', wrap(async (req, res) => {
  const shipment = await getShipment(Number(req.params.id));
  res.json(shipment);
}));

// Download verzendlabel als PDF
router.get('/shipments/:id/label', wrap(async (req, res) => {
  const id = Number(req.params.id);
  const pdfBuffer = await getShipmentLabel(id);
  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': `attachment; filename="label-${id}.pdf"`,
    'Content-Length': pdfBuffer.length,
  });
  res.send(pdfBuffer);
}));

// Track een zending
router.get('/track/:barcode/:postalCode', wrap(async (req, res) => {
  const { barcode, postalCode } = req.params;
  const trace = await trackShipment(barcode, postalCode);
  res.json(trace);
}));

export default router;
