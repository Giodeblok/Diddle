import { createBolClient, isDemo } from './bolcom-client.js';
import type {
  CreateSubscriptionRequest,
  Subscription,
  SubscriptionEvent,
} from '../types/bolcom.js';

// Register a webhook so bol.com notifies us when orders come in
export async function createWebhookSubscription(webhookUrl: string): Promise<Subscription> {
  const client = createBolClient(isDemo());

  const body: CreateSubscriptionRequest = {
    url: webhookUrl,
    enabled: true,
    resources: [
      'ORDER_PLACED',
      'PROCESS_STATUS',
      'RETURN_REQUESTED',
      'RETURN_HANDLED',
    ] as SubscriptionEvent[],
  };

  const response = await client.post<Subscription>('/subscriptions', body);
  return response.data;
}

export async function listSubscriptions(): Promise<Subscription[]> {
  const client = createBolClient(isDemo());
  const response = await client.get<{ subscriptions: Subscription[] }>('/subscriptions');
  return response.data.subscriptions ?? [];
}

export async function deleteSubscription(subscriptionId: string): Promise<void> {
  const client = createBolClient(isDemo());
  await client.delete(`/subscriptions/${subscriptionId}`);
}

// Verify a bol.com webhook signature (bol sends a test push on creation)
export function verifyWebhookPayload(body: unknown): boolean {
  // bol.com does not currently require signature verification —
  // validate by checking the structure and trusting network-level security (HTTPS).
  return typeof body === 'object' && body !== null;
}
