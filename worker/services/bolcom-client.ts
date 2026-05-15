import type { Env } from '../types/env.js';
import type { BolToken } from '../types/bolcom.js';

const BOL_AUTH_URL = 'https://login.bol.com/token';
const BOL_API_BASE = 'https://api.bol.com';
const BOL_API_VERSION = 'v10';
const ACCEPT_HEADER = `application/vnd.retailer.${BOL_API_VERSION}+json`;

let cachedToken: BolToken | null = null;

export async function getBolToken(env: Env): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expires_at - 30_000) {
    return cachedToken.access_token;
  }

  const credentials = btoa(`${env.BOL_CLIENT_ID}:${env.BOL_CLIENT_SECRET}`);

  const res = await fetch(BOL_AUTH_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: 'grant_type=client_credentials',
  });

  if (!res.ok) throw new Error(`Bol.com auth mislukt: ${res.status}`);

  const data = await res.json() as BolToken;
  cachedToken = { ...data, expires_at: Date.now() + data.expires_in * 1000 };
  return cachedToken.access_token;
}

export async function bolFetch(
  env: Env,
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  const token = await getBolToken(env);
  const base = isDemo(env)
    ? `${BOL_API_BASE}/retailer/demo`
    : `${BOL_API_BASE}/retailer`;

  const headers = new Headers(init.headers as HeadersInit);
  headers.set('Authorization', `Bearer ${token}`);
  headers.set('Accept', ACCEPT_HEADER);
  if (!headers.has('Content-Type')) headers.set('Content-Type', ACCEPT_HEADER);

  const doFetch = () => fetch(`${base}${path}`, { ...init, headers });
  let res = await doFetch();

  if (res.status === 429) {
    const retryAfter = Number(res.headers.get('retry-after') ?? 5);
    console.warn(`[bol.com] Rate limited. Retrying after ${retryAfter}s`);
    await new Promise((r) => setTimeout(r, retryAfter * 1000));
    res = await doFetch();
  }

  const remaining = res.headers.get('x-ratelimit-remaining');
  if (remaining !== null && Number(remaining) < 10) {
    console.warn(`[bol.com] Rate limit laag: ${remaining} requests over`);
  }

  return res;
}

export function isDemo(env: Env): boolean {
  return env.BOL_DEMO_MODE === 'true';
}
