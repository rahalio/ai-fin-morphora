'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  talentService,
  type TalentSeverity,
} from '@/services/domains/talent';
import { formatProblem } from '@/services/shared/http';

const SEVERITIES: TalentSeverity[] = ['low', 'medium', 'high'];

export default function TalentPage() {
  const qc = useQueryClient();
  const list = useQuery({
    queryKey: ['talent-gaps'],
    queryFn: () => talentService.listGaps(),
  });
  const [roleName, setRoleName] = useState('');
  const [coverage, setCoverage] = useState(0.5);
  const [severity, setSeverity] = useState<TalentSeverity>('medium');
  const [error, setError] = useState<string | null>(null);

  const create = useMutation({
    mutationFn: () =>
      talentService.createGap({
        roleName: roleName.trim(),
        coverage,
        severity,
      }),
    onSuccess: () => {
      setRoleName('');
      qc.invalidateQueries({ queryKey: ['talent-gaps'] });
    },
    onError: (e) => setError(formatProblem(e)),
  });

  const update = useMutation({
    mutationFn: ({
      gapId,
      coverage: cov,
      severity: sev,
    }: {
      gapId: string;
      coverage: number;
      severity: TalentSeverity;
    }) => talentService.updateGap(gapId, { coverage: cov, severity: sev }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['talent-gaps'] }),
    onError: (e) => setError(formatProblem(e)),
  });

  const gaps = list.data ?? [];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="page-title">Talent coverage</h1>
        <p className="page-sub">
          Critical-role gaps for dual-speed delivery — high severity blocks scale.
        </p>
      </header>

      {error && <p className="text-sm text-breach">{error}</p>}

      <form
        className="panel grid gap-3 md:grid-cols-4"
        onSubmit={(e) => {
          e.preventDefault();
          create.mutate();
        }}
      >
        <input
          className="field"
          placeholder="Role name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          required
        />
        <label className="text-xs text-steel">
          Coverage {(coverage * 100).toFixed(0)}%
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={coverage}
            onChange={(e) => setCoverage(Number(e.target.value))}
            className="mt-1 w-full accent-[var(--color-teal-change)]"
          />
        </label>
        <select
          className="field"
          value={severity}
          onChange={(e) => setSeverity(e.target.value as TalentSeverity)}
        >
          {SEVERITIES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button type="submit" className="btn-primary" disabled={create.isPending}>
          Flag gap
        </button>
      </form>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {gaps.map((g) => {
          const heat =
            g.severity === 'high'
              ? 'border-breach/50 bg-breach/10'
              : g.severity === 'medium'
                ? 'border-signal/40 bg-signal/5'
                : 'border-steel/30';
          return (
            <div key={g.gapId} className={`panel space-y-2 ${heat}`}>
              <div className="flex justify-between gap-2">
                <p className="font-medium text-ink">{g.roleName}</p>
                <span className="font-mono text-[10px] uppercase text-steel">
                  {g.severity}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-sm bg-indigo-950">
                <div
                  className="h-full bg-teal"
                  style={{ width: `${g.coverage * 100}%` }}
                />
              </div>
              <p className="font-mono text-[10px] text-steel">
                {(g.coverage * 100).toFixed(0)}% coverage
              </p>
              <div className="flex flex-wrap gap-1">
                {SEVERITIES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="btn-ghost !px-2 !py-0.5 !text-[10px]"
                    onClick={() =>
                      update.mutate({
                        gapId: g.gapId,
                        coverage: g.coverage,
                        severity: s,
                      })
                    }
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {!list.isLoading && gaps.length === 0 && (
        <p className="text-sm text-steel">No gaps flagged.</p>
      )}
    </div>
  );
}
