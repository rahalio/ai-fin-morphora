'use client';

import type { CoreSystem } from '@/services/domains/footprint';

type Props = {
  systems: CoreSystem[];
};

export function RunSloStrip({ systems }: Props) {
  const withSlo = systems.filter((s) => typeof s.sloCompliance === 'number');
  const avg =
    withSlo.length === 0
      ? null
      : withSlo.reduce((a, s) => a + (s.sloCompliance ?? 0), 0) / withSlo.length;
  const changeFast = systems.filter((s) => s.speedTag === 'changeFast').length;
  const runCareful = systems.filter((s) => s.speedTag === 'runCareful').length;
  const runShare =
    systems.length === 0
      ? null
      : systems.reduce((a, s) => a + (s.runSpendShare ?? 0.75), 0) /
        systems.length;

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Strip
        label="SLO compliance"
        value={avg == null ? '—' : `${(avg * 100).toFixed(0)}%`}
        tone={avg != null && avg < 0.95 ? 'warn' : 'ok'}
      />
      <Strip
        label="Run vs change"
        value={`${runCareful} careful / ${changeFast} fast`}
        tone="neutral"
      />
      <Strip
        label="Run spend share"
        value={runShare == null ? '—' : `${(runShare * 100).toFixed(0)}%`}
        tone={runShare != null && runShare > 0.8 ? 'warn' : 'ok'}
        hint={
          runShare != null && runShare > 0.8
            ? '75–80% trap risk'
            : undefined
        }
      />
    </div>
  );
}

function Strip({
  label,
  value,
  tone,
  hint,
}: {
  label: string;
  value: string;
  tone: 'ok' | 'warn' | 'neutral';
  hint?: string;
}) {
  const color =
    tone === 'ok' ? 'text-teal' : tone === 'warn' ? 'text-signal' : 'text-ink';
  return (
    <div className="rounded-md border border-steel/25 bg-indigo-900/50 px-4 py-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-steel">
        {label}
      </p>
      <p className={`mt-1 text-lg font-semibold ${color}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-signal">{hint}</p>}
    </div>
  );
}
