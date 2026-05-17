import { Hono } from 'hono';
import type { Env } from '../types/env.js';
import { products } from '../../src/data/products.js';

interface ProductOverride {
  priceDisplay?: string;
  description?: string;
}

async function loadOverrides(kv: KVNamespace): Promise<Record<string, ProductOverride>> {
  const raw = await kv.get('overrides', 'json') as Record<string, ProductOverride> | null;
  return raw ?? {};
}

async function saveOverrides(kv: KVNamespace, data: Record<string, ProductOverride>) {
  await kv.put('overrides', JSON.stringify(data));
}

export const pricesRoutes = new Hono<{ Bindings: Env }>();

pricesRoutes.get('/', async (c) => {
  const overrides = await loadOverrides(c.env.PRICE_OVERRIDES);
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
  return c.json({ products: result });
});

pricesRoutes.put('/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json<{ priceDisplay?: string; description?: string }>();
  const { priceDisplay, description } = body;

  if (!priceDisplay && !description) {
    return c.json({ error: 'priceDisplay of description is verplicht.' }, 400);
  }

  const product = products.find((p) => p.id === id);
  if (!product) {
    return c.json({ error: 'Product niet gevonden.' }, 404);
  }

  const overrides = await loadOverrides(c.env.PRICE_OVERRIDES);
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

  await saveOverrides(c.env.PRICE_OVERRIDES, overrides);
  return c.json({
    id,
    priceDisplay: current.priceDisplay ?? product.priceDisplay,
    description: current.description ?? product.description,
  });
});

pricesRoutes.delete('/:id', async (c) => {
  const id = c.req.param('id');
  const overrides = await loadOverrides(c.env.PRICE_OVERRIDES);
  delete overrides[id];
  await saveOverrides(c.env.PRICE_OVERRIDES, overrides);
  const product = products.find((p) => p.id === id);
  return c.json({
    id,
    priceDisplay: product?.priceDisplay ?? null,
    description: product?.description ?? null,
  });
});
