import { Router, Request, Response } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { verifyJwt } from '../middleware/verifyJwt.js';
import { products } from '../../src/data/products.js';

const router = Router();
const __dirname = dirname(fileURLToPath(import.meta.url));
const PRICES_FILE = join(__dirname, '../data/prices.json');

function loadOverrides(): Record<string, string> {
  try {
    return JSON.parse(readFileSync(PRICES_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

function saveOverrides(data: Record<string, string>) {
  writeFileSync(PRICES_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Publiek: geeft alle producten terug met actuele prijs
router.get('/', (_req: Request, res: Response) => {
  const overrides = loadOverrides();
  const result = products.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    priceDisplay: overrides[p.id] ?? p.priceDisplay,
    defaultPrice: p.priceDisplay,
    hasOverride: !!overrides[p.id],
  }));
  res.json({ prices: result });
});

// Admin: prijs bijwerken voor één product
router.put('/:id', verifyJwt, (req: Request, res: Response) => {
  const { id } = req.params;
  const { priceDisplay } = req.body as { priceDisplay?: string };

  if (!priceDisplay || typeof priceDisplay !== 'string' || !priceDisplay.trim()) {
    res.status(400).json({ error: 'priceDisplay is verplicht.' });
    return;
  }

  const product = products.find((p) => p.id === id);
  if (!product) {
    res.status(404).json({ error: 'Product niet gevonden.' });
    return;
  }

  const overrides = loadOverrides();

  // Als de nieuwe prijs gelijk is aan de standaard, verwijder de override
  if (priceDisplay.trim() === product.priceDisplay) {
    delete overrides[id];
  } else {
    overrides[id] = priceDisplay.trim();
  }

  saveOverrides(overrides);
  res.json({ id, priceDisplay: priceDisplay.trim() });
});

// Admin: reset prijs naar standaard
router.delete('/:id', verifyJwt, (req: Request, res: Response) => {
  const { id } = req.params;
  const overrides = loadOverrides();
  delete overrides[id];
  saveOverrides(overrides);
  res.json({ id, priceDisplay: products.find((p) => p.id === id)?.priceDisplay ?? null });
});

export default router;
