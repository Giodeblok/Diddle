import axios, { AxiosInstance, AxiosError } from 'axios';
import type { BolToken } from '../types/bolcom.js';

const BOL_AUTH_URL = 'https://login.bol.com/token';
const BOL_API_BASE = 'https://api.bol.com';
const BOL_DEMO_BASE = 'https://api.bol.com';
const BOL_API_VERSION = 'v10';

const ACCEPT_HEADER = `application/vnd.retailer.${BOL_API_VERSION}+json`;
const CONTENT_TYPE_HEADER = `application/vnd.retailer.${BOL_API_VERSION}+json`;

let cachedToken: BolToken | null = null;

export async function getBolToken(): Promise<string> {
  const clientId = process.env.BOL_CLIENT_ID;
  const clientSecret = process.env.BOL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('BOL_CLIENT_ID and BOL_CLIENT_SECRET must be set in environment variables');
  }

  // Reuse token if still valid (with 30s buffer)
  if (cachedToken && Date.now() < cachedToken.expires_at - 30_000) {
    return cachedToken.access_token;
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const response = await axios.post<BolToken>(
    BOL_AUTH_URL,
    'grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    }
  );

  cachedToken = {
    ...response.data,
    expires_at: Date.now() + response.data.expires_in * 1000,
  };

  return cachedToken.access_token;
}

export function createBolClient(demo = false): AxiosInstance {
  const base = demo ? `${BOL_DEMO_BASE}/retailer/demo` : `${BOL_API_BASE}/retailer`;

  const client = axios.create({
    baseURL: base,
    headers: {
      Accept: ACCEPT_HEADER,
      'Content-Type': CONTENT_TYPE_HEADER,
    },
  });

  // Auto-inject Bearer token
  client.interceptors.request.use(async (config) => {
    const token = await getBolToken();
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  // Log rate-limit headers and handle 429
  client.interceptors.response.use(
    (response) => {
      const remaining = response.headers['x-ratelimit-remaining'];
      if (remaining !== undefined && Number(remaining) < 10) {
        console.warn(`[bol.com] Rate limit low: ${remaining} requests remaining`);
      }
      return response;
    },
    async (error: AxiosError) => {
      if (error.response?.status === 429) {
        const retryAfter = Number(error.response.headers['retry-after'] ?? 5);
        console.warn(`[bol.com] Rate limited. Retrying after ${retryAfter}s`);
        await new Promise((r) => setTimeout(r, retryAfter * 1000));
        return client.request(error.config!);
      }
      throw error;
    }
  );

  return client;
}

export function isDemo(): boolean {
  return process.env.BOL_DEMO_MODE === 'true';
}
