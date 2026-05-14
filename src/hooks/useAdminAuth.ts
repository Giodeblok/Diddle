import { useState, useCallback } from 'react';

const SESSION_KEY = 'gl_admin_token';
const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

function getStoredToken(): string | null {
  return sessionStorage.getItem(SESSION_KEY);
}

export function useAdminAuth() {
  const [token, setToken] = useState<string | null>(getStoredToken);

  const login = useCallback(async (username: string, password: string): Promise<void> => {
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Inloggen mislukt.' }));
      throw new Error(err.error ?? 'Inloggen mislukt.');
    }

    const { token: newToken } = await res.json();
    sessionStorage.setItem(SESSION_KEY, newToken);
    setToken(newToken);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setToken(null);
  }, []);

  return {
    token,
    isAuthenticated: !!token,
    login,
    logout,
  };
}
