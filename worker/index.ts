import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import type { Env } from './types/env.js';
import { authRoutes } from './routes/auth.js';
import { reviewsRoutes } from './routes/reviews.js';
import { bolcomRoutes } from './routes/bolcom.js';
import { myparcelRoutes } from './routes/myparcel.js';
import { pricesRoutes } from './routes/prices.js';
import { verifyJwt } from './middleware/verifyJwt.js';

const app = new Hono<{ Bindings: Env }>();

// ---- Middleware ----

app.use('*', secureHeaders());

app.use('*', async (c, next) => {
  const origins = (c.env.FRONTEND_URL ?? 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  return cors({ origin: origins, credentials: true })(c, next);
});

// ---- Routes ----

// Publiek webhook (bol.com POST hier naartoe — vóór JWT middleware)
app.post('/api/bol/webhook/events', (c) => bolcomRoutes.fetch(c.req.raw, c.env));

app.route('/api/auth', authRoutes);
app.route('/api/reviews', reviewsRoutes);

// Beveiligd met JWT
app.use('/api/products/:id', verifyJwt);
app.use('/api/bol/*', verifyJwt);
app.use('/api/myparcel/*', verifyJwt);

app.route('/api/products', pricesRoutes);
app.route('/api/bol', bolcomRoutes);
app.route('/api/myparcel', myparcelRoutes);

// ---- Error handler ----

app.onError((err, c) => {
  console.error('[worker error]', err.message);
  return c.json({ error: err.message }, 500);
});

app.notFound((c) => c.json({ error: 'Niet gevonden' }, 404));

export default app;
