'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import { useAuth } from '@/contexts/auth-context';

const NAV = [
  { href: '/cadence', label: 'Cadence' },
  { href: '/sensing', label: 'Sensing' },
  { href: '/footprint', label: 'Footprint' },
  { href: '/partners', label: 'Partners' },
  { href: '/challenger', label: 'Challenger' },
  { href: '/talent', label: 'Talent' },
  { href: '/shadow-it', label: 'Shadow IT' },
  { href: '/packs', label: 'Packs' },
  { href: '/ledger', label: 'Ledger' },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { ready, authenticated, operator, signOut } = useAuth();
  const hideNav = pathname === '/login';

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-indigo-950 text-steel">
        Loading Morphora…
      </div>
    );
  }

  if (!authenticated && !hideNav) {
    if (typeof window !== 'undefined') router.replace('/login');
    return null;
  }

  if (hideNav) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-indigo-950 text-ink">
      <aside className="flex w-56 shrink-0 flex-col border-r border-steel/20 bg-indigo-900/80">
        <div className="border-b border-steel/20 px-4 py-5">
          <Link href="/cadence" className="block">
            <span className="text-xl font-semibold tracking-tight text-teal">
              Morphora
            </span>
            <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-steel">
              Dual-speed map
            </span>
          </Link>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-2">
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'rounded-sm px-3 py-2 text-sm transition-colors',
                  active
                    ? 'bg-teal/15 text-teal'
                    : 'text-ink/70 hover:bg-indigo-950/60 hover:text-ink',
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-steel/20 p-3">
          <p className="truncate text-xs text-ink/80">
            {operator?.displayName ?? 'Operator'}
          </p>
          <p className="truncate font-mono text-[10px] text-steel">
            {operator?.email ?? '—'}
          </p>
          <button
            type="button"
            onClick={() => {
              signOut();
              router.replace('/login');
            }}
            className="mt-2 text-xs text-steel hover:text-signal"
          >
            Sign out
          </button>
        </div>
      </aside>
      <main className="rail-bg flex-1 overflow-auto p-6 lg:p-8">{children}</main>
    </div>
  );
}
