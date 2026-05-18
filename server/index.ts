import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import bolcomRouter from './routes/bolcom.js';
import myparcelRouter from './routes/myparcel.js';
import authRouter from './routes/auth.js';
import reviewsRouter from './routes/reviews.js';
import pricesRouter from './routes/prices.js';
import emailRouter from './routes/email.js';
import ordersRouter from './routes/orders.js';
import icepayRouter from './routes/icepay.js';
import { verifyJwt } from './middleware/verifyJwt.js';

const app = express();
const PORT = process.env.PORT ?? 3001;

const allowedOrigins = (process.env.FRONTEND_URL ?? 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

// ---- Middleware ----

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", ...allowedOrigins],
    },
  },
  hsts: {
    maxAge: 15552000,
    includeSubDomains: true,
  },
}));

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin niet toegestaan: ${origin}`));
    }
  },
  credentials: true,
}));

app.use(express.json({
  verify: (req: any, _res, buf) => { req.rawBody = buf; },
}));

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

// Auth login (public)
app.use('/api/auth', authRouter);

// Google Reviews (public, cached)
app.use('/api/reviews', reviewsRouter);

// Email: contact form + order confirmation (public)
app.use('/api/email', emailRouter);

// Orders: publiek plaatsen, admin beschermd
app.post('/api/orders', ordersRouter);
app.use('/api/orders', verifyJwt, ordersRouter);

// iCEPAY: betaling aanmaken (publiek) en webhook (publiek — komt van iCEPAY servers)
app.use('/api/icepay', icepayRouter);

// Product catalog with price/description overrides (GET public, PUT/DELETE require JWT)
app.use('/api/products', pricesRouter);

// Public webhook endpoint (bol.com posts here — no JWT needed)
app.post('/api/bol/webhook/events', bolcomRouter);

// All other bol.com and MyParcel endpoints require JWT
app.use('/api/bol', verifyJwt, bolcomRouter);
app.use('/api/myparcel', verifyJwt, myparcelRouter);

// ---- Error handler ----

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[server error]', err.message);

  if ((err as any).response) {
    const bolError = (err as any).response;
    res.status(bolError.status ?? 500).json({
      error: 'Upstream API error',
      status: bolError.status,
      detail: bolError.data,
    });
    return;
  }

  res.status(500).json({ error: err.message });
});

// ---- Start ----

app.listen(PORT, () => {
  console.log(`✓ Eeuwig Hart API server running on http://localhost:${PORT}`);
  console.log(`  bol.com demo mode: ${process.env.BOL_DEMO_MODE === 'true' ? 'YES' : 'NO'}`);
  console.log(`  credentials configured: ${!!(process.env.BOL_CLIENT_ID && process.env.BOL_CLIENT_SECRET)}`);
});
