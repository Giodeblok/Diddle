import { bolFetch, isDemo } from './bolcom-client.js';
import type { Env } from '../types/env.js';
import type { CreateOfferRequest, UpdateOfferRequest, Offer, ProcessStatus } from '../types/bolcom.js';

export interface LocalProduct {
  id: string;
  name: string;
  ean: string;
  priceEur: number;
  stock: number;
  reference: string;
}

export const PRODUCT_CATALOG: LocalProduct[] = [
  { id: 'small-heart',   name: 'Klein Glazen Hart (8×8 cm)',            ean: '0000000000001', priceEur: 59.00,  stock: 50, reference: 'EDB-HEART-SM' },
  { id: 'medium-heart',  name: 'Medium Glazen Hart (12×12 cm)',          ean: '0000000000002', priceEur: 89.00,  stock: 50, reference: 'EDB-HEART-MD' },
  { id: 'large-heart',   name: 'Groot Luxe Glazen Hart (16×16 cm)',      ean: '0000000000003', priceEur: 129.00, stock: 30, reference: 'EDB-HEART-LG' },
  { id: 'memorial-set',  name: 'Gedenkset Glazen Hart met LED-basis',    ean: '0000000000004', priceEur: 169.00, stock: 20, reference: 'EDB-HEART-SET' },
];

export async function createOffer(env: Env, product: LocalProduct): Promise<ProcessStatus> {
  const body: CreateOfferRequest = {
    ean: product.ean,
    condition: 'NEW',
    reference: product.reference,
    onHoldByRetailer: false,
    pricing: { bundlePrices: [{ quantity: 1, unitPrice: Math.round(product.priceEur * 100) }] },
    stock: { amount: product.stock, managedByRetailer: true },
    fulfilment: { method: 'FBR', deliveryCode: 'WITHIN_4_8_BUSINESS_DAYS' },
  };
  const res = await bolFetch(env, '/offers', { method: 'POST', body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`Bol API fout: ${res.status}`);
  return res.json() as Promise<ProcessStatus>;
}

export async function listAllOffers(env: Env): Promise<{ offers: Offer[] }> {
  const res = await bolFetch(env, '/offers/export');
  if (!res.ok) throw new Error(`Bol API fout: ${res.status}`);
  return res.json() as Promise<{ offers: Offer[] }>;
}

export async function getOffer(env: Env, offerId: string): Promise<Offer> {
  const res = await bolFetch(env, `/offers/${offerId}`);
  if (!res.ok) throw new Error(`Bol API fout: ${res.status}`);
  return res.json() as Promise<Offer>;
}

export async function updateOfferPrice(env: Env, offerId: string, priceEur: number): Promise<ProcessStatus> {
  const body: UpdateOfferRequest = {
    pricing: { bundlePrices: [{ quantity: 1, unitPrice: Math.round(priceEur * 100) }] },
  };
  const res = await bolFetch(env, `/offers/${offerId}/price`, { method: 'PUT', body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`Bol API fout: ${res.status}`);
  return res.json() as Promise<ProcessStatus>;
}

export async function updateOfferStock(env: Env, offerId: string, amount: number): Promise<ProcessStatus> {
  const body: UpdateOfferRequest = { stock: { amount, managedByRetailer: true } };
  const res = await bolFetch(env, `/offers/${offerId}/stock`, { method: 'PUT', body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`Bol API fout: ${res.status}`);
  return res.json() as Promise<ProcessStatus>;
}

export async function deleteOffer(env: Env, offerId: string): Promise<ProcessStatus> {
  const res = await bolFetch(env, `/offers/${offerId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Bol API fout: ${res.status}`);
  return res.json() as Promise<ProcessStatus>;
}

export async function getProcessStatus(env: Env, processStatusId: string): Promise<ProcessStatus> {
  const res = await bolFetch(env, `/process-status/${processStatusId}`);
  if (!res.ok) throw new Error(`Bol API fout: ${res.status}`);
  return res.json() as Promise<ProcessStatus>;
}

export { isDemo };
