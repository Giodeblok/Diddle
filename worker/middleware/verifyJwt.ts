import { verify } from 'hono/jwt';
import type { MiddlewareHandler } from 'hono';
import type { Env } from '../types/env.js';

export const verifyJwt: MiddlewareHandler<{ Bindings: Env }> = async (c, next) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return c.json({ error: 'Niet geautoriseerd.' }, 401);
  }
  const token = authHeader.slice(7);
  try {
    await verify(token, c.env.JWT_SECRET);
    await next();
  } catch {
    return c.json({ error: 'Sessie verlopen of ongeldig token.' }, 401);
  }
};
