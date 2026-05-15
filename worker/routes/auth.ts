import { Hono } from 'hono';
import bcrypt from 'bcryptjs';
import { sign } from 'hono/jwt';
import type { Env } from '../types/env.js';

export const authRoutes = new Hono<{ Bindings: Env }>();

authRoutes.post('/login', async (c) => {
  const { username, password } = await c.req.json<{ username?: string; password?: string }>();

  if (!username || !password) {
    return c.json({ error: 'Gebruikersnaam en wachtwoord zijn verplicht.' }, 400);
  }

  if (!c.env.ADMIN_USERNAME || !c.env.ADMIN_PASSWORD_HASH || !c.env.JWT_SECRET) {
    console.error('[auth] ADMIN_USERNAME, ADMIN_PASSWORD_HASH of JWT_SECRET niet ingesteld');
    return c.json({ error: 'Server is niet correct geconfigureerd.' }, 500);
  }

  if (username !== c.env.ADMIN_USERNAME) {
    return c.json({ error: 'Ongeldige inloggegevens.' }, 401);
  }

  const passwordMatch = await bcrypt.compare(password, c.env.ADMIN_PASSWORD_HASH);
  if (!passwordMatch) {
    return c.json({ error: 'Ongeldige inloggegevens.' }, 401);
  }

  const exp = Math.floor(Date.now() / 1000) + 8 * 3600;
  const token = await sign({ role: 'admin', exp }, c.env.JWT_SECRET);
  return c.json({ token });
});
