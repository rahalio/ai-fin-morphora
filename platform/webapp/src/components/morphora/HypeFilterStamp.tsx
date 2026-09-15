'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { HypeFilterOutcome } from '@/services/domains/sensing';

type Props = {
  value?: HypeFilterOutcome;
  disabled?: boolean;
  onStamp: (outcome: HypeFilterOutcome) => void;
};

const OUTCOMES: HypeFilterOutcome[] = ['adopt', 'watch', 'reject'];

export function HypeFilterStamp({ value, disabled, onStamp }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {OUTCOMES.map((outcome) => {
        const active = value === outcome;
        return (
          <motion.button
            key={outcome}
            type="button"
            disabled={disabled || Boolean(value)}
            whileTap={value ? undefined : { scale: 0.94, rotate: -2 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={() => onStamp(outcome)}
            className={clsx(
              'rounded-sm border px-3 py-1.5 font-mono text-xs uppercase tracking-wider',
              active &&
                outcome === 'adopt' &&
                'border-teal bg-teal/20 text-teal shadow-[0_0_0_1px_rgba(45,212,191,0.35)]',
              active &&
                outcome === 'watch' &&
                'border-signal bg-signal/15 text-signal',
              active &&
                outcome === 'reject' &&
                'border-breach bg-breach/15 text-breach',
              !active &&
                'border-chalk/20 bg-chalk/5 text-chalk/80 hover:border-chalk/50',
              (disabled || value) && !active && 'opacity-40',
            )}
          >
            {outcome}
          </motion.button>
        );
      })}
    </div>
  );
}
