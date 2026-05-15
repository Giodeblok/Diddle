import { Router, Request, Response } from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { verifyJwt } from '../middleware/verifyJwt.js';
import { products } from '../../src/data/products.js';

const router = Router();
const __dirname = dirname(fileURLToPath(import.meta.url));
const PRICES_FILE = join(__dirname, '../data/prices.json');

interface ProductOverride {
  priceDisplay?: string;
  description?: string;
}

function loadOverrides(): Record<string, ProductOverride> {
  try {
    const raw = JSON.parse(readFileSync(PRICES_FILE, 'utf-8'));
    // Migreer oud formaat: { productId: "€xx,xx" } → nieuw formaat
    const result: Record<string, ProductOverride> = {};
    for (const [id, val] of Object.entries(raw)) {
      if (typeof val === 'string') {
        result[id] = { priceDisplay: val };
      } else {
        result[id] = val as ProductOverride;
      }
    }
    return result;
  } catch {
    return {};
  }
}

function saveOverrides(data: Record<string, ProductOverride>) {
  writeFileSync(PRICES_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// Publiek: geeft alle producten terug met actuele prijzen en omschrijvingen
router.get('/', (_req: Request, res: Response) => {
  const overrides = loadOverrides();
  const result = products.map((p) => {
    const ov = overrides[p.id] ?? {};
    return {
      id: p.id,
      name: p.name,
      subtitle: p.subtitle,
      category: p.category,
      image: p.image,
      priceDisplay: ov.priceDisplay ?? p.priceDisplay,
      description: ov.description ?? p.description,
      defaultPrice: p.priceDisplay,
      defaultDescription: p.description,
      hasOverride: !!(ov.priceDisplay || ov.description),
    };
  });
  res.json({ products: result });
});

// Admin: prijs en/of omschrijving bijwerken voor één product
router.put('/:id', verifyJwt, (req: Request, res: Response) => {
  const id = req.params.id as string;
  const { priceDisplay, description } = req.body as {
    priceDisplay?: string;
    description?: string;
  };

  if (!priceDisplay && !description) {
    res.status(400).json({ error: 'priceDisplay of description is verplicht.' });
    return;
  }

  const product = products.find((p) => p.id === id);
  if (!product) {
    res.status(404).json({ error: 'Product niet gevonden.' });
    return;
  }

  const overrides = loadOverrides();
  const current = overrides[id] ?? {};

  if (priceDisplay !== undefined) {
    if (priceDisplay.trim() === product.priceDisplay) {
      delete current.priceDisplay;
    } else {
      current.priceDisplay = priceDisplay.trim();
    }
  }

  if (description !== undefined) {
    if (description.trim() === product.description) {
      delete current.description;
    } else {
      current.description = description.trim();
    }
  }

  if (!current.priceDisplay && !current.description) {
    delete overrides[id];
  } else {
    overrides[id] = current;
  }

  saveOverrides(overrides);
  res.json({
    id,
    priceDisplay: current.priceDisplay ?? product.priceDisplay,
    description: current.description ?? product.description,
  });
});

// Admin: reset alle overrides naar standaard
router.delete('/:id', verifyJwt, (req: Request, res: Response) => {
  const id = req.params.id as string;
  const overrides = loadOverrides();
  delete overrides[id];
  saveOverrides(overrides);
  const product = products.find((p) => p.id === id);
  res.json({
    id,
    priceDisplay: product?.priceDisplay ?? null,
    description: product?.description ?? null,
  });
});

export default router;
