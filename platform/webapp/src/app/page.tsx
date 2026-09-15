'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

export default function HomePage() {
  const { ready, authenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    router.replace(authenticated ? '/cadence' : '/login');
  }, [ready, authenticated, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-indigo-950 text-steel">
      Routing…
    </div>
  );
}
