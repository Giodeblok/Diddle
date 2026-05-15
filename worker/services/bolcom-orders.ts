import { bolFetch, isDemo } from './bolcom-client.js';
import type { Env } from '../types/env.js';
import type { Order, OrdersPage, CreateShipmentRequest, ProcessStatus } from '../types/bolcom.js';

export async function getOpenOrders(env: Env, changeIntervalMinutes = 60): Promise<Order[]> {
  const params = new URLSearchParams({
    'fulfilment-method': 'FBR',
    status: 'OPEN',
    'change-interval-minute': String(changeIntervalMinutes),
    page: '1',
  });
  const res = await bolFetch(env, `/orders?${params}`);
  if (!res.ok) throw new Error(`Bol API fout: ${res.status}`);
  const data = await res.json() as OrdersPage;
  return data.orders ?? [];
}

export async function getAllOrders(env: Env): Promise<Order[]> {
  const params = new URLSearchParams({ 'fulfilment-method': 'ALL', status: 'ALL', page: '1' });
  const res = await bolFetch(env, `/orders?${params}`);
  if (!res.ok) throw new Error(`Bol API fout: ${res.status}`);
  const data = await res.json() as OrdersPage;
  return data.orders ?? [];
}

export async function getOrderById(env: Env, orderId: string): Promise<Order> {
  const res = await bolFetch(env, `/orders/${orderId}`);
  if (!res.ok) throw new Error(`Bol API fout: ${res.status}`);
  return res.json() as Promise<Order>;
}

export async function cancelOrderItem(
  env: Env,
  orderId: string,
  orderItemId: string,
  reasonCode: string
): Promise<ProcessStatus> {
  const res = await bolFetch(env, `/orders/${orderId}/cancellation`, {
    method: 'PUT',
    body: JSON.stringify({ orderItems: [{ orderItemId, reasonCode }] }),
  });
  if (!res.ok) throw new Error(`Bol API fout: ${res.status}`);
  return res.json() as Promise<ProcessStatus>;
}

export async function createShipment(env: Env, shipment: CreateShipmentRequest): Promise<ProcessStatus> {
  const res = await bolFetch(env, '/shipments', { method: 'POST', body: JSON.stringify(shipment) });
  if (!res.ok) throw new Error(`Bol API fout: ${res.status}`);
  return res.json() as Promise<ProcessStatus>;
}

export async function shipOrderItem(
  env: Env,
  orderItemId: string,
  trackAndTrace: string,
  transporterCode = 'TNT'
): Promise<ProcessStatus> {
  return createShipment(env, {
    orderItems: [{ orderItemId, quantity: 1 }],
    transport: { transporterCode, trackAndTrace },
  });
}

export { isDemo };
