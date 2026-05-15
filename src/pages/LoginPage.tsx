import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../utils/auth';

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Inloggen mislukt.');
        return;
      }
      setToken(data.token);
      navigate('/admin');
    } catch {
      setError('Kan de server niet bereiken.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-sans text-xs tracking-[0.2em] uppercase text-taupe block mb-2">
            Beheerpaneel
          </span>
          <h1 className="font-serif text-2xl text-anthracite">Inloggen</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-sans text-xs tracking-[0.12em] uppercase text-taupe mb-1.5">
              Gebruikersnaam
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full border border-beige bg-ivory px-4 py-2.5 font-sans text-sm text-anthracite focus:outline-none focus:border-gold/60"
            />
          </div>

          <div>
            <label className="block font-sans text-xs tracking-[0.12em] uppercase text-taupe mb-1.5">
              Wachtwoord
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full border border-beige bg-ivory px-4 py-2.5 font-sans text-sm text-anthracite focus:outline-none focus:border-gold/60"
            />
          </div>

          {error && (
            <p className="font-sans text-xs text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-anthracite text-ivory font-sans text-xs tracking-[0.15em] uppercase py-3 hover:bg-brown transition-colors disabled:opacity-50"
          >
            {loading ? 'Bezig...' : 'Inloggen'}
          </button>
        </form>
      </div>
    </div>
  );
}
