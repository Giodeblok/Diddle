import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body as { username?: string; password?: string };

  if (!username || !password) {
    res.status(400).json({ error: 'Gebruikersnaam en wachtwoord zijn verplicht.' });
    return;
  }

  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  const jwtSecret = process.env.JWT_SECRET;

  if (!adminUsername || !adminPasswordHash || !jwtSecret) {
    console.error('[auth] ADMIN_USERNAME, ADMIN_PASSWORD_HASH of JWT_SECRET niet ingesteld in .env');
    res.status(500).json({ error: 'Server is niet correct geconfigureerd.' });
    return;
  }

  if (username !== adminUsername) {
    res.status(401).json({ error: 'Ongeldige inloggegevens.' });
    return;
  }

  const passwordMatch = await bcrypt.compare(password, adminPasswordHash);
  if (!passwordMatch) {
    res.status(401).json({ error: 'Ongeldige inloggegevens.' });
    return;
  }

  const token = jwt.sign({ role: 'admin' }, jwtSecret, { expiresIn: '8h' });
  res.json({ token });
});

export default router;
