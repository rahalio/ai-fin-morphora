'use client';

import { motion } from 'framer-motion';
import type { ChallengerInitiative } from '@/services/domains/initiatives';

type Props = {
  initiative: ChallengerInitiative;
  onKill: (rationale: string) => void;
  onScale: (rationale: string) => void;
  busy?: boolean;
};

export function ChallengerKillGate({
  initiative,
  onKill,
  onScale,
  busy,
}: Props) {
  const aging = (initiative.daysInLab ?? 0) >= 90;
  const noKill = !initiative.killMetric;
  const killed = initiative.status === 'killed';

  return (
    <motion.div
      layout
      animate={killed ? { opacity: 0.35, filter: 'grayscale(1)' } : { opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="space-y-2 rounded-md border border-steel/30 bg-indigo-900/60 p-3"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-medium text-ink">{initiative.name}</p>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-steel">
            {initiative.status} · {initiative.daysInLab ?? 0}d in lab
          </p>
        </div>
        {aging && !killed && (
          <span className="rounded-sm bg-breach/20 px-2 py-0.5 font-mono text-[10px] uppercase text-breach">
            museum risk
          </span>
        )}
      </div>
      <p className="text-xs text-ink/70">
        Kill metric:{' '}
        <span className={noKill ? 'text-signal' : 'text-teal'}>
          {initiative.killMetric || 'missing — cannot stay strategic'}
        </span>
      </p>
      {initiative.status === 'experiment' && (
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            disabled={busy}
            onClick={() =>
              onKill('Kill gate triggered — criteria not met or aging lab.')
            }
            className="rounded-sm border border-breach/50 px-2 py-1 text-xs text-breach hover:bg-breach/10"
          >
            Kill
          </button>
          <button
            type="button"
            disabled={busy || noKill}
            onClick={() =>
              onScale('Scale gate passed — kill criteria cleared.')
            }
            className="rounded-sm border border-teal/50 px-2 py-1 text-xs text-teal hover:bg-teal/10 disabled:opacity-40"
          >
            Scale
          </button>
        </div>
      )}
    </motion.div>
  );
}
