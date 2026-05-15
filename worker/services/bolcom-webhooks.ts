import { bolFetch, isDemo } from './bolcom-client.js';
import type { Env } from '../types/env.js';
import type { CreateSubscriptionRequest, Subscription, SubscriptionEvent } from '../types/bolcom.js';

export async function createWebhookSubscription(env: Env, webhookUrl: string): Promise<Subscription> {
  const body: CreateSubscriptionRequest = {
    url: webhookUrl,
    enabled: true,
    resources: ['ORDER_PLACED', 'PROCESS_STATUS', 'RETURN_REQUESTED', 'RETURN_HANDLED'] as SubscriptionEvent[],
  };
  const res = await bolFetch(env, '/subscriptions', {
    method: 'POST',
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Bol API fout: ${res.status}`);
  return res.json() as Promise<Subscription>;
}

export async function listSubscriptions(env: Env): Promise<Subscription[]> {
  const res = await bolFetch(env, '/subscriptions');
  if (!res.ok) throw new Error(`Bol API fout: ${res.status}`);
  const data = await res.json() as { subscriptions: Subscription[] };
  return data.subscriptions ?? [];
}

export async function deleteSubscription(env: Env, subscriptionId: string): Promise<void> {
  const res = await bolFetch(env, `/subscriptions/${subscriptionId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`Bol API fout: ${res.status}`);
}

export function verifyWebhookPayload(body: unknown): boolean {
  return typeof body === 'object' && body !== null;
}

export { isDemo };
