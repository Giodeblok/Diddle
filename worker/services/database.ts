import type { Env } from '../types/env.js';

function headers(env: Env): HeadersInit {
  return {
    'apikey': env.SUPABASE_SERVICE_ROLE_KEY,
    'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation',
  };
}

function url(env: Env, table: string, query = ''): string {
  return `${env.SUPABASE_URL}/rest/v1/${table}${query ? `?${query}` : ''}`;
}

async function supabaseFetch(env: Env, path: string, options: RequestInit = {}): Promise<any> {
  const res = await fetch(`${env.SUPABASE_URL}/rest/v1/${path}`, {
    ...options,
    headers: { ...headers(env), ...(options.headers ?? {}) },
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase fout (${res.status}): ${err}`);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const suffix = Math.floor(Math.random() * 9000) + 1000;
  return `EDB-${year}-${suffix}`;
}

export interface CreateOrderInput {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address: string;
  postalCode: string;
  city: string;
  productId: string;
  productName: string;
  productSubtitle: string;
  productPrice: number;
  shippingOption: 'standard' | 'express';
  shippingPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  order_number: string;
  status: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  postal_code: string;
  city: string;
  country: string;
  product_price: number;
  shipping_price: number;
  total_price: number;
  shipping_option: string;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  product_subtitle: string | null;
  unit_price: number;
  quantity: number;
  created_at: string;
}

export async function createOrder(env: Env, input: CreateOrderInput): Promise<{ orderId: string; orderNumber: string }> {
  const orderNumber = generateOrderNumber();

  const [order] = await supabaseFetch(env, 'orders', {
    method: 'POST',
    body: JSON.stringify({
      order_number: orderNumber,
      status: 'pending',
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      address: input.address,
      postal_code: input.postalCode,
      city: input.city,
      product_price: input.productPrice,
      shipping_price: input.shippingPrice,
      total_price: input.totalPrice,
      shipping_option: input.shippingOption,
    }),
    headers: { 'Prefer': 'return=representation' },
  });

  await supabaseFetch(env, 'order_items', {
    method: 'POST',
    body: JSON.stringify({
      order_id: order.id,
      product_id: input.productId,
      product_name: input.productName,
      product_subtitle: input.productSubtitle,
      unit_price: input.productPrice,
      quantity: 1,
    }),
  });

  return { orderId: order.id, orderNumber };
}

export async function getWebsiteOrders(env: Env, options: {
  status?: string;
  limit?: number;
  offset?: number;
} = {}): Promise<{ orders: Order[]; count: number }> {
  const limit = options.limit ?? 20;
  const offset = options.offset ?? 0;

  const params = new URLSearchParams({
    order: 'created_at.desc',
    limit: String(limit),
    offset: String(offset),
  });
  if (options.status) params.set('status', `eq.${options.status}`);

  const res = await fetch(`${url(env, 'orders', params.toString())}`, {
    headers: {
      ...headers(env),
      'Prefer': 'count=exact',
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase fout (${res.status}): ${err}`);
  }

  const countHeader = res.headers.get('content-range');
  const total = countHeader ? parseInt(countHeader.split('/')[1] ?? '0', 10) : 0;
  const orders = await res.json() as Order[];

  return { orders, count: total };
}

export async function updateOrderStatus(env: Env, orderId: string, status: string): Promise<void> {
  await supabaseFetch(env, `orders?id=eq.${orderId}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
    headers: { 'Prefer': 'return=minimal' },
  });
}

export async function updateOrderStatusByOrderNumber(env: Env, orderNumber: string, status: string): Promise<void> {
  await supabaseFetch(env, `orders?order_number=eq.${orderNumber}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
    headers: { 'Prefer': 'return=minimal' },
  });
}

export async function getOrderById(env: Env, orderId: string): Promise<Order | null> {
  const orders = await supabaseFetch(env, `orders?id=eq.${orderId}&limit=1`, {});
  if (!orders || orders.length === 0) return null;

  const items = await supabaseFetch(env, `order_items?order_id=eq.${orderId}`, {});
  return { ...orders[0], items: items ?? [] };
}
