import { createBolClient, isDemo } from './bolcom-client.js';
import type {
  Order,
  OrdersPage,
  OrderStatus,
  CreateShipmentRequest,
  ProcessStatus,
} from '../types/bolcom.js';

export async function getOpenOrders(changeIntervalMinutes = 60): Promise<Order[]> {
  const client = createBolClient(isDemo());
  const response = await client.get<OrdersPage>('/orders', {
    params: {
      'fulfilment-method': 'FBR',
      status: 'OPEN',
      'change-interval-minute': changeIntervalMinutes,
      page: 1,
    },
  });
  return response.data.orders ?? [];
}

export async function getAllOrders(): Promise<Order[]> {
  const client = createBolClient(isDemo());
  const response = await client.get<OrdersPage>('/orders', {
    params: {
      'fulfilment-method': 'ALL',
      status: 'ALL',
      page: 1,
    },
  });
  return response.data.orders ?? [];
}

export async function getOrderById(orderId: string): Promise<Order> {
  const client = createBolClient(isDemo());
  const response = await client.get<Order>(`/orders/${orderId}`);
  return response.data;
}

export async function cancelOrderItem(
  orderId: string,
  orderItemId: string,
  reasonCode: string
): Promise<ProcessStatus> {
  const client = createBolClient(isDemo());
  const response = await client.put<ProcessStatus>(
    `/orders/${orderId}/cancellation`,
    {
      orderItems: [
        {
          orderItemId,
          reasonCode,
        },
      ],
    }
  );
  return response.data;
}

export async function createShipment(shipment: CreateShipmentRequest): Promise<ProcessStatus> {
  const client = createBolClient(isDemo());
  const response = await client.post<ProcessStatus>('/shipments', shipment);
  return response.data;
}

export async function getShipmentById(shipmentId: string) {
  const client = createBolClient(isDemo());
  const response = await client.get(`/shipments/${shipmentId}`);
  return response.data;
}

// Convenience: ship a single order item via PostNL
export async function shipOrderItem(
  orderItemId: string,
  trackAndTrace: string,
  transporterCode = 'TNT'
): Promise<ProcessStatus> {
  return createShipment({
    orderItems: [{ orderItemId, quantity: 1 }],
    transport: {
      transporterCode,
      trackAndTrace,
    },
  });
}
