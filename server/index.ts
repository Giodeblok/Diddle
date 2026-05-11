import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import bolcomRouter from './routes/bolcom.js';
import { requireAdminKey } from './middleware/auth.js';

const app = express();
const PORT = process.env.PORT ?? 3001;

// ---- Middleware ----

app.use(cors({
  origin: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

// Rate limit the admin API
const limiter = rateLimit({
  windowMs: 60_000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please slow down.' },
});
app.use('/api', limiter);

// ---- Routes ----

// Public webhook endpoint (bol.com posts here — no admin key needed)
app.post('/api/bol/webhook/events', bolcomRouter);

// All other bol.com endpoints require admin key
app.use('/api/bol', requireAdminKey, bolcomRouter);

// ---- Error handler ----

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[server error]', err.message);

  // Forward bol.com API errors clearly
  if ((err as any).response) {
    const bolError = (err as any).response;
    res.status(bolError.status ?? 500).json({
      error: 'bol.com API error',
      status: bolError.status,
      detail: bolError.data,
    });
    return;
  }

  res.status(500).json({ error: err.message });
});

// ---- Start ----

app.listen(PORT, () => {
  console.log(`✓ Eeuwig Dichtbij API server running on http://localhost:${PORT}`);
  console.log(`  bol.com demo mode: ${process.env.BOL_DEMO_MODE === 'true' ? 'YES' : 'NO'}`);
  console.log(`  credentials configured: ${!!(process.env.BOL_CLIENT_ID && process.env.BOL_CLIENT_SECRET)}`);
});
