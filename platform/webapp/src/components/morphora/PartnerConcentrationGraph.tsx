'use client';

import clsx from 'clsx';
import type { Partner } from '@/services/domains/partners';

type Props = {
  partners: Partner[];
};

export function PartnerConcentrationGraph({ partners }: Props) {
  const max = Math.max(
    0.01,
    ...partners.map((p) => p.concentrationScore ?? 0),
  );

  if (partners.length === 0) {
    return (
      <p className="text-sm text-steel">No partners mapped yet.</p>
    );
  }

  return (
    <div className="space-y-3">
      {partners.map((p) => {
        const score = p.concentrationScore ?? 0;
        const breach = score >= 0.7 || p.spof || p.criticality === 'systemic';
        return (
          <div key={p.partnerId} className="space-y-1">
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-sm text-ink">{p.name}</span>
              <span className="font-mono text-[10px] text-steel">
                {(score * 100).toFixed(0)}%
                {p.spof ? ' · SPOF' : ''}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-sm bg-indigo-950">
              <div
                className={clsx(
                  'h-full rounded-sm transition-all duration-rail',
                  breach ? 'bg-breach' : 'bg-teal',
                )}
                style={{ width: `${(score / max) * 100}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
