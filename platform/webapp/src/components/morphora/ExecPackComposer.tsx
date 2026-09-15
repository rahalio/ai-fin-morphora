'use client';

import { useState } from 'react';

type Draft = {
  periodLabel: string;
  stretchSqueezeNote: string;
  spendMixNote: string;
  concentrationNote: string;
  challengerNote: string;
  narrative: string;
};

type Props = {
  onCreate: (draft: Draft) => Promise<void>;
  busy?: boolean;
};

const EMPTY: Draft = {
  periodLabel: '',
  stretchSqueezeNote: '',
  spendMixNote: '',
  concentrationNote: '',
  challengerNote: '',
  narrative: '',
};

export function ExecPackComposer({ onCreate, busy }: Props) {
  const [draft, setDraft] = useState<Draft>(EMPTY);

  return (
    <form
      className="space-y-3 rounded-md border border-steel/30 bg-indigo-900/50 p-4"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!draft.periodLabel.trim()) return;
        await onCreate(draft);
        setDraft(EMPTY);
      }}
    >
      <h3 className="text-sm font-semibold text-teal">Compose exec pack</h3>
      <input
        className="field"
        placeholder="Period label (e.g. FY26 Q1 ExCo)"
        value={draft.periodLabel}
        onChange={(e) => setDraft({ ...draft, periodLabel: e.target.value })}
        required
      />
      <textarea
        className="field min-h-[64px]"
        placeholder="Stretch / squeeze"
        value={draft.stretchSqueezeNote}
        onChange={(e) =>
          setDraft({ ...draft, stretchSqueezeNote: e.target.value })
        }
      />
      <textarea
        className="field min-h-[64px]"
        placeholder="Spend mix"
        value={draft.spendMixNote}
        onChange={(e) => setDraft({ ...draft, spendMixNote: e.target.value })}
      />
      <textarea
        className="field min-h-[64px]"
        placeholder="Concentration"
        value={draft.concentrationNote}
        onChange={(e) =>
          setDraft({ ...draft, concentrationNote: e.target.value })
        }
      />
      <textarea
        className="field min-h-[64px]"
        placeholder="Challenger outcomes"
        value={draft.challengerNote}
        onChange={(e) =>
          setDraft({ ...draft, challengerNote: e.target.value })
        }
      />
      <textarea
        className="field min-h-[80px]"
        placeholder="Board narrative"
        value={draft.narrative}
        onChange={(e) => setDraft({ ...draft, narrative: e.target.value })}
      />
      <button type="submit" disabled={busy} className="btn-primary">
        Create draft
      </button>
    </form>
  );
}
