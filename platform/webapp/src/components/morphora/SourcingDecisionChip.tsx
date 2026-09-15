'use client';

import clsx from 'clsx';
import type { SourcingChoice } from '@/services/domains/initiatives';

type Props = {
  value: SourcingChoice;
  onSelect?: (choice: Exclude<SourcingChoice, 'undecided'>) => void;
  disabled?: boolean;
};

const CHOICES: Array<Exclude<SourcingChoice, 'undecided'>> = [
  'build',
  'buy',
  'rent',
  'partner',
];

export function SourcingDecisionChip({ value, onSelect, disabled }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {CHOICES.map((choice) => (
        <button
          key={choice}
          type="button"
          disabled={disabled}
          onClick={() => onSelect?.(choice)}
          className={clsx(
            'rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide',
            value === choice
              ? 'border-teal bg-teal/15 text-teal'
              : 'border-steel/40 text-steel hover:border-ink/40 hover:text-ink',
          )}
        >
          {choice}
        </button>
      ))}
      {value === 'undecided' && (
        <span className="self-center font-mono text-[10px] uppercase text-signal">
          undecided
        </span>
      )}
    </div>
  );
}
