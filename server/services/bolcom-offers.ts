import { createBolClient, isDemo } from './bolcom-client.js';
import type {
  CreateOfferRequest,
  UpdateOfferRequest,
  Offer,
  ProcessStatus,
} from '../types/bolcom.js';

// Our product catalog mapped to bol.com EANs
// You must register EAN codes for your products via bol.com's catalog
// or use existing EANs if applicable.
export interface LocalProduct {
  id: string;
  name: string;
  ean: string;          // EAN-13 barcode — required by bol.com
  priceEur: number;
  stock: number;
  reference: string;
}

export const PRODUCT_CATALOG: LocalProduct[] = [
  {
    id: 'small-heart',
    name: 'Klein Glazen Hart (8×8 cm)',
    ean: '0000000000001',   // TODO: vervang door echte EAN codes
    priceEur: 59.00,
    stock: 50,
    reference: 'EDB-HEART-SM',
  },
  {
    id: 'medium-heart',
    name: 'Medium Glazen Hart (12×12 cm)',
    ean: '0000000000002',
    priceEur: 89.00,
    stock: 50,
    reference: 'EDB-HEART-MD',
  },
  {
    id: 'large-heart',
    name: 'Groot Luxe Glazen Hart (16×16 cm)',
    ean: '0000000000003',
    priceEur: 129.00,
    stock: 30,
    reference: 'EDB-HEART-LG',
  },
  {
    id: 'memorial-set',
    name: 'Gedenkset Glazen Hart met LED-basis',
    ean: '0000000000004',
    priceEur: 169.00,
    stock: 20,
    reference: 'EDB-HEART-SET',
  },
];

export async function createOffer(product: LocalProduct): Promise<ProcessStatus> {
  const client = createBolClient(isDemo());

  const body: CreateOfferRequest = {
    ean: product.ean,
    condition: 'NEW',
    reference: product.reference,
    onHoldByRetailer: false,
    pricing: {
      bundlePrices: [
        { quantity: 1, unitPrice: Math.round(product.priceEur * 100) }, // prijs in centen
      ],
    },
    stock: {
      amount: product.stock,
      managedByRetailer: true,
    },
    fulfilment: {
      method: 'FBR',
      deliveryCode: 'WITHIN_4_8_BUSINESS_DAYS',
    },
  };

  const response = await client.post<ProcessStatus>('/offers', body);
  return response.data;
}

export async function listAllOffers(): Promise<{ offers: Offer[] }> {
  const client = createBolClient(isDemo());
  const response = await client.get<{ offers: Offer[] }>('/offers/export');
  return response.data;
}

export async function getOffer(offerId: string): Promise<Offer> {
  const client = createBolClient(isDemo());
  const response = await client.get<Offer>(`/offers/${offerId}`);
  return response.data;
}

export async function updateOfferPrice(offerId: string, priceEur: number): Promise<ProcessStatus> {
  const client = createBolClient(isDemo());
  const body: UpdateOfferRequest = {
    pricing: {
      bundlePrices: [
        { quantity: 1, unitPrice: Math.round(priceEur * 100) },
      ],
    },
  };
  const response = await client.put<ProcessStatus>(`/offers/${offerId}/price`, body);
  return response.data;
}

export async function updateOfferStock(offerId: string, amount: number): Promise<ProcessStatus> {
  const client = createBolClient(isDemo());
  const body: UpdateOfferRequest = {
    stock: { amount, managedByRetailer: true },
  };
  const response = await client.put<ProcessStatus>(`/offers/${offerId}/stock`, body);
  return response.data;
}

export async function deleteOffer(offerId: string): Promise<ProcessStatus> {
  const client = createBolClient(isDemo());
  const response = await client.delete<ProcessStatus>(`/offers/${offerId}`);
  return response.data;
}

export async function getProcessStatus(processStatusId: string): Promise<ProcessStatus> {
  const client = createBolClient(isDemo());
  const response = await client.get<ProcessStatus>(`/process-status/${processStatusId}`);
  return response.data;
}
