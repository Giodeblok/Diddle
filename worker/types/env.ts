export type Env = {
  FRONTEND_URL: string;
  ADMIN_USERNAME: string;
  ADMIN_PASSWORD_HASH: string;
  JWT_SECRET: string;
  BOL_CLIENT_ID: string;
  BOL_CLIENT_SECRET: string;
  BOL_DEMO_MODE: string;
  MYPARCEL_API_KEY: string;
  GOOGLE_PLACES_API_KEY: string;
  GOOGLE_PLACE_ID: string;
  PRICE_OVERRIDES: KVNamespace;
};
