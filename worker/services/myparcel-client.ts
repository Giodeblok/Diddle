import type { Env } from '../types/env.js';

const MYPARCEL_API_BASE = 'https://api.myparcel.nl';

export async function myparcelFetch(
  env: Env,
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  const credentials = btoa(`${env.MYPARCEL_API_KEY}:`);

  const headers = new Headers(init.headers as HeadersInit);
  headers.set('Authorization', `basic ${credentials}`);
  headers.set('Content-Type', 'application/json;charset=utf-8');
  headers.set('Accept', 'application/json;charset=utf-8');

  const res = await fetch(`${MYPARCEL_API_BASE}${path}`, { ...init, headers });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.warn(`[myparcel] API fout ${res.status}:`, text);
    throw new Error(`MyParcel API fout: ${res.status}`);
  }

  return res;
}

export function isConfigured(env: Env): boolean {
  return !!env.MYPARCEL_API_KEY;
}
