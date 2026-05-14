import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export function verifyJwt(req: Request, res: Response, next: NextFunction) {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    res.status(500).json({ error: 'Server is niet correct geconfigureerd.' });
    return;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Niet geautoriseerd.' });
    return;
  }

  const token = authHeader.slice(7);
  try {
    jwt.verify(token, jwtSecret);
    next();
  } catch {
    res.status(401).json({ error: 'Sessie verlopen of ongeldig token.' });
  }
}
