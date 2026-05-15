import { myparcelFetch } from './myparcel-client.js';
import { getOrderById } from './bolcom-orders.js';
import type { Env } from '../types/env.js';
import type {
  CreateShipmentParams,
  MyParcelCarrier,
  MyParcelCreatedShipment,
  MyParcelPackageType,
  MyParcelShipmentInput,
  MyParcelShipmentResponse,
  MyParcelGetShipmentResponse,
  MyParcelTrackTrace,
  MyParcelTrackTraceResponse,
} from '../types/myparcel.js';

export function splitStreetAddress(address: string): { street: string; number: string } {
  const match = address.match(/^(.+?)\s+(\d+\S*)$/);
  if (!match) return { street: address, number: '' };
  return { street: match[1], number: match[2] };
}

function toShipmentInput(params: CreateShipmentParams): MyParcelShipmentInput {
  return {
    recipient: params.recipient,
    carrier: params.carrier ?? 1,
    options: {
      package_type: params.packageType ?? 1,
      only_recipient: params.onlyRecipient ? 1 : 0,
      signature: params.requireSignature ? 1 : 0,
    },
    reference_identifier: params.reference,
  };
}

export async function createShipments(
  env: Env,
  shipments: CreateShipmentParams[]
): Promise<Array<{ id: number; reference_identifier?: string }>> {
  const res = await myparcelFetch(env, '/shipments', {
    method: 'POST',
    body: JSON.stringify({ data: { shipments: shipments.map(toShipmentInput) } }),
  });
  const data = await res.json() as MyParcelShipmentResponse;
  return data.data.ids;
}

export async function createShipment(
  env: Env,
  params: CreateShipmentParams
): Promise<{ id: number; reference_identifier?: string }> {
  const ids = await createShipments(env, [params]);
  return ids[0];
}

export async function getShipment(env: Env, shipmentId: number): Promise<MyParcelCreatedShipment> {
  const res = await myparcelFetch(env, `/shipments/${shipmentId}`);
  const data = await res.json() as MyParcelGetShipmentResponse;
  return data.data.shipments[0];
}

export async function getShipmentLabel(env: Env, shipmentId: number): Promise<ArrayBuffer> {
  const res = await myparcelFetch(env, '/pdfs', {
    method: 'POST',
    body: JSON.stringify({ data: { shipment_ids: [shipmentId] } }),
  });
  return res.arrayBuffer();
}

export async function trackShipment(
  env: Env,
  barcode: string,
  postalCode: string
): Promise<MyParcelTrackTrace> {
  const res = await myparcelFetch(env, `/tracktraces/${barcode}/${postalCode}`);
  const data = await res.json() as MyParcelTrackTraceResponse;
  return data.data.tracktraces[0];
}

export async function createShipmentFromBolOrder(
  env: Env,
  bolOrderId: string,
  options?: { carrier?: MyParcelCarrier; packageType?: MyParcelPackageType }
): Promise<{ id: number; reference_identifier?: string }> {
  const order = await getOrderById(env, bolOrderId);
  const details = order.customerDetails?.shipmentDetails;

  if (!details) throw new Error(`Bol.com order ${bolOrderId} heeft geen verzendadres`);

  const name = [details.firstName, details.surname].filter(Boolean).join(' ');

  return createShipment(env, {
    recipient: {
      cc: details.countryCode ?? 'NL',
      city: details.city ?? '',
      street: details.streetName ?? '',
      number: details.houseNumber ?? '',
      postal_code: details.zipCode ?? '',
      person: name,
      email: details.email,
    },
    carrier: options?.carrier,
    packageType: options?.packageType,
    reference: bolOrderId,
  });
}
