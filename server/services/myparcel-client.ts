import axios, { AxiosInstance, AxiosError } from 'axios';

const MYPARCEL_API_BASE = 'https://api.myparcel.nl';

export function createMyParcelClient(): AxiosInstance {
  const apiKey = process.env.MYPARCEL_API_KEY;

  if (!apiKey) {
    throw new Error('MYPARCEL_API_KEY must be set in environment variables');
  }

  // MyParcel basic auth: base64 encode "apikey:" (key + colon, no password)
  const credentials = Buffer.from(`${apiKey}:`).toString('base64');

  const client = axios.create({
    baseURL: MYPARCEL_API_BASE,
    headers: {
      Authorization: `basic ${credentials}`,
      'Content-Type': 'application/json;charset=utf-8',
      Accept: 'application/json;charset=utf-8',
    },
  });

  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response) {
        console.warn(
          `[myparcel] API error ${error.response.status}:`,
          JSON.stringify(error.response.data)
        );
      }
      throw error;
    }
  );

  return client;
}

export function isConfigured(): boolean {
  return !!process.env.MYPARCEL_API_KEY;
}
