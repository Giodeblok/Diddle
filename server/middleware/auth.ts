import { Request, Response, NextFunction } from 'express';

// Simple admin API key protection for the bol.com management endpoints
export function requireAdminKey(req: Request, res: Response, next: NextFunction) {
  const adminKey = process.env.ADMIN_API_KEY;

  // If no key is configured, allow all (development only)
  if (!adminKey) {
    console.warn('[auth] ADMIN_API_KEY not set — admin routes are unprotected!');
    return next();
  }

  const providedKey =
    req.headers['x-admin-key'] ?? req.query.key;

  if (providedKey !== adminKey) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
}
