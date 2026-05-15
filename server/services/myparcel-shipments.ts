import { createMyParcelClient } from './myparcel-client.js';
import { getOrderById } from './bolcom-orders.js';
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

// Split "Keizersgracht 123A" into { street: "Keizersgracht", number: "123A" }
function splitStreetAddress(address: string): { street: string; number: string } {
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
  shipments: CreateShipmentParams[]
): Promise<Array<{ id: number; reference_identifier?: string }>> {
  const client = createMyParcelClient();
  const response = await client.post<MyParcelShipmentResponse>('/shipments', {
    data: { shipments: shipments.map(toShipmentInput) },
  });
  return response.data.data.ids;
}

export async function createShipment(
  params: CreateShipmentParams
): Promise<{ id: number; reference_identifier?: string }> {
  const ids = await createShipments([params]);
  return ids[0];
}

export async function getShipment(shipmentId: number): Promise<MyParcelCreatedShipment> {
  const client = createMyParcelClient();
  const response = await client.get<MyParcelGetShipmentResponse>(`/shipments/${shipmentId}`);
  return response.data.data.shipments[0];
}

export async function getShipmentLabel(shipmentId: number): Promise<Buffer> {
  const client = createMyParcelClient();
  const response = await client.post(
    '/pdfs',
    { data: { shipment_ids: [shipmentId] } },
    { responseType: 'arraybuffer' }
  );
  return Buffer.from(response.data as ArrayBuffer);
}

export async function trackShipment(
  barcode: string,
  postalCode: string
): Promise<MyParcelTrackTrace> {
  const client = createMyParcelClient();
  const response = await client.get<MyParcelTrackTraceResponse>(
    `/tracktraces/${barcode}/${postalCode}`
  );
  return response.data.data.tracktraces[0];
}

export async function createShipmentFromBolOrder(
  bolOrderId: string,
  options?: { carrier?: MyParcelCarrier; packageType?: MyParcelPackageType }
): Promise<{ id: number; reference_identifier?: string }> {
  const order = await getOrderById(bolOrderId);
  const details = order.customerDetails?.shipmentDetails;

  if (!details) {
    throw new Error(`Bol.com order ${bolOrderId} heeft geen verzendadres`);
  }

  const name = [details.firstName, details.surname].filter(Boolean).join(' ');

  return createShipment({
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

export { splitStreetAddress };
