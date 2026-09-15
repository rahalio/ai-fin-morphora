'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { RoleRitualStatus, ShapeshifterRole } from '@/services/domains/decisions';

const ROLES: Array<{ id: ShapeshifterRole; label: string; hint: string }> = [
  { id: 'strategist', label: 'Strategist', hint: 'Sense & stamp' },
  { id: 'bridge', label: 'Bridge', hint: 'Dual-speed core' },
  { id: 'ecosystem', label: 'Ecosystem', hint: 'Partners & SPOF' },
  { id: 'startup', label: 'Start-up', hint: 'Kill or scale' },
];

const STATUS_TONE: Record<RoleRitualStatus, string> = {
  onTrack: 'border-teal/50 text-teal',
  due: 'border-signal/60 text-signal',
  overdue: 'border-breach/70 text-breach',
  skipped: 'border-steel/40 text-steel',
};

type Props = {
  rituals?: Array<{
    role: ShapeshifterRole;
    ritualStatus: RoleRitualStatus;
  }>;
};

export function ShapeshifterCompass({ rituals = [] }: Props) {
  const byRole = Object.fromEntries(rituals.map((r) => [r.role, r.ritualStatus]));

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {ROLES.map((role, i) => {
        const status = (byRole[role.id] as RoleRitualStatus | undefined) ?? 'due';
        return (
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.22 }}
            className={clsx(
              'rounded-md border bg-indigo-900/80 px-4 py-5',
              STATUS_TONE[status],
            )}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel">
              {status}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-ink">{role.label}</h3>
            <p className="mt-1 text-sm text-ink/60">{role.hint}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
