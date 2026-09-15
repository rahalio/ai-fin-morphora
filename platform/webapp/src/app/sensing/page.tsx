'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { HypeFilterStamp } from '@/components/morphora';
import {
  sensingService,
  type HypeFilterOutcome,
  type SensingSignal,
} from '@/services/domains/sensing';
import { formatProblem } from '@/services/shared/http';

export default function SensingPage() {
  const qc = useQueryClient();
  const list = useQuery({
    queryKey: ['sensing-signals'],
    queryFn: () => sensingService.listSignals(),
  });
  const [title, setTitle] = useState('');
  const [area, setArea] = useState('');
  const [selected, setSelected] = useState<SensingSignal | null>(null);
  const [hypeScore, setHypeScore] = useState(0.5);
  const [rationale, setRationale] = useState('');
  const [error, setError] = useState<string | null>(null);

  const create = useMutation({
    mutationFn: () =>
      sensingService.createSignal({
        title: title.trim(),
        technologyArea: area.trim(),
      }),
    onSuccess: () => {
      setTitle('');
      setArea('');
      qc.invalidateQueries({ queryKey: ['sensing-signals'] });
    },
    onError: (e) => setError(formatProblem(e)),
  });

  const assess = useMutation({
    mutationFn: () =>
      sensingService.upsertHypeAssessment(selected!.signalId, {
        hypeScore,
        recommendedOutcome:
          hypeScore > 0.7 ? 'reject' : hypeScore > 0.4 ? 'watch' : 'adopt',
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['sensing-signals'] }),
    onError: (e) => setError(formatProblem(e)),
  });

  const stamp = useMutation({
    mutationFn: (outcome: HypeFilterOutcome) =>
      sensingService.stampDecision(selected!.signalId, {
        outcome,
        rationale: rationale.trim() || `Stamped ${outcome}`,
      }),
    onSuccess: (sig) => {
      setSelected(sig);
      setRationale('');
      qc.invalidateQueries({ queryKey: ['sensing-signals'] });
      qc.invalidateQueries({ queryKey: ['decisions'] });
    },
    onError: (e) => setError(formatProblem(e)),
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="page-title">Sensing backlog</h1>
        <p className="page-sub">
          File signals, score hype vs reality, stamp adopt / watch / reject.
        </p>
      </header>

      {error && (
        <p className="text-sm text-breach" role="alert">
          {error}
        </p>
      )}

      <form
        className="panel grid gap-3 md:grid-cols-[1fr_1fr_auto]"
        onSubmit={(e) => {
          e.preventDefault();
          setError(null);
          create.mutate();
        }}
      >
        <input
          className="field"
          placeholder="Signal title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="field"
          placeholder="Technology area"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary" disabled={create.isPending}>
          File signal
        </button>
      </form>

      <div className="grid gap-4 lg:grid-cols-2">
        <ul className="space-y-2">
          {(list.data ?? []).map((s) => (
            <li key={s.signalId}>
              <button
                type="button"
                onClick={() => {
                  setSelected(s);
                  setHypeScore(s.hypeAssessment?.hypeScore ?? 0.5);
                  setError(null);
                }}
                className={`panel w-full text-left transition ${
                  selected?.signalId === s.signalId
                    ? 'border-signal/50'
                    : 'hover:border-steel/50'
                }`}
              >
                <div className="flex justify-between gap-2">
                  <span className="font-medium text-ink">{s.title}</span>
                  <span className="font-mono text-[10px] uppercase text-signal">
                    {s.status}
                  </span>
                </div>
                <p className="mt-1 text-xs text-steel">
                  {s.technologyArea}
                  {s.decisionOutcome ? ` · ${s.decisionOutcome}` : ''}
                </p>
              </button>
            </li>
          ))}
          {!list.isLoading && (list.data ?? []).length === 0 && (
            <li className="text-sm text-steel">No signals — file the first one.</li>
          )}
        </ul>

        <div className="panel space-y-4">
          {!selected ? (
            <p className="text-sm text-steel">Select a signal to assess and stamp.</p>
          ) : (
            <>
              <div>
                <h2 className="text-lg font-semibold text-ink">{selected.title}</h2>
                <p className="font-mono text-[10px] text-steel">{selected.signalId}</p>
              </div>
              <label className="block text-xs text-steel">
                Hype score (0 grounded → 1 pure hype): {hypeScore.toFixed(2)}
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={hypeScore}
                  disabled={selected.status === 'decided'}
                  onChange={(e) => setHypeScore(Number(e.target.value))}
                  className="mt-2 w-full accent-[var(--color-signal-yellow)]"
                />
              </label>
              <button
                type="button"
                className="btn-ghost"
                disabled={selected.status === 'decided' || assess.isPending}
                onClick={() => assess.mutate()}
              >
                Save hype assessment
              </button>
              <textarea
                className="field min-h-[72px]"
                placeholder="Stamp rationale"
                value={rationale}
                disabled={selected.status === 'decided'}
                onChange={(e) => setRationale(e.target.value)}
              />
              <HypeFilterStamp
                value={selected.decisionOutcome}
                disabled={stamp.isPending}
                onStamp={(outcome) => stamp.mutate(outcome)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
