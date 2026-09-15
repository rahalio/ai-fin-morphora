'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { SpeedTag } from '@/services/domains/footprint';

type Props = {
  value: SpeedTag;
  onChange?: (tag: SpeedTag) => void;
  disabled?: boolean;
};

export function DualSpeedTrack({ value, onChange, disabled }: Props) {
  const isChange = value === 'changeFast';

  return (
    <div className="relative inline-flex items-center gap-2 rounded-md border border-steel/30 bg-indigo-950 p-1">
      <motion.span
        layout
        transition={{ duration: 0.22, ease: 'easeInOut' }}
        className={clsx(
          'pointer-events-none absolute inset-y-1 w-[calc(50%-0.25rem)] rounded-sm',
          isChange ? 'left-[calc(50%+0.125rem)] bg-teal' : 'left-1 bg-steel/50',
        )}
        aria-hidden
      />
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange?.('runCareful')}
        className={clsx(
          'relative z-10 min-w-[6.5rem] rounded-sm px-3 py-1 text-xs font-medium',
          !isChange ? 'text-ink' : 'text-steel',
        )}
      >
        Run careful
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange?.('changeFast')}
        className={clsx(
          'relative z-10 min-w-[6.5rem] rounded-sm px-3 py-1 text-xs font-medium',
          isChange ? 'text-indigo-950' : 'text-steel',
        )}
      >
        Change fast
      </button>
    </div>
  );
}
