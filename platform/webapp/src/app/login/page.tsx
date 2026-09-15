'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { formatProblem } from '@/services/shared/http';

const DEMO_EMAIL = 'admin@demo.local';
const DEMO_PASSWORD = 'sandbox-admin-8';
const DEMO_API_KEY = 'morphora_demo_local_dev_key';

export default function LoginPage() {
  const { signInWithPassword, signInWithApiKey, authenticated, ready } =
    useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<'password' | 'apikey'>('password');
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [apiKey, setApiKey] = useState(DEMO_API_KEY);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (ready && authenticated) {
    router.replace('/cadence');
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === 'password') {
        await signInWithPassword(email, password);
      } else {
        await signInWithApiKey(apiKey);
      }
      router.replace('/cadence');
    } catch (err) {
      setError(formatProblem(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rail-bg relative flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-md">
        <p className="text-5xl font-semibold tracking-tight text-teal md:text-6xl">
          Morphora
        </p>
        <h1 className="mt-4 text-xl text-ink md:text-2xl">
          Four roles. One dual-speed map.
        </h1>
        <p className="mt-2 text-sm text-steel">
          CIO weekly war room — sense, stamp, kill, publish.
        </p>

        <div className="mt-8 flex gap-2">
          <button
            type="button"
            className={
              mode === 'password'
                ? 'btn-primary'
                : 'btn-ghost'
            }
            onClick={() => setMode('password')}
          >
            Password
          </button>
          <button
            type="button"
            className={mode === 'apikey' ? 'btn-primary' : 'btn-ghost'}
            onClick={() => setMode('apikey')}
          >
            API key
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-6 space-y-3">
          {mode === 'password' ? (
            <>
              <input
                className="field"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                className="field"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </>
          ) : (
            <input
              className="field font-mono text-xs"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="X-API-Key"
              required
            />
          )}
          {error && (
            <p className="text-sm text-breach" role="alert">
              {error}
            </p>
          )}
          <button type="submit" disabled={busy} className="btn-primary w-full">
            {busy ? 'Signing in…' : 'Enter Morphora'}
          </button>
        </form>
      </div>
    </div>
  );
}
