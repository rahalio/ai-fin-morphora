'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { DualSpeedTrack, RunSloStrip } from '@/components/morphora';
import {
  footprintService,
  type Disposition,
  type SpeedTag,
} from '@/services/domains/footprint';
import { formatProblem } from '@/services/shared/http';

const DISPOSITIONS: Array<Exclude<Disposition, 'undecided'>> = [
  'modernise',
  'adapt',
  'replace',
  'retire',
];

export default function FootprintPage() {
  const qc = useQueryClient();
  const list = useQuery({
    queryKey: ['footprint-systems'],
    queryFn: () => footprintService.listSystems(),
  });
  const [name, setName] = useState('');
  const [speedTag, setSpeedTag] = useState<SpeedTag>('runCareful');
  const [error, setError] = useState<string | null>(null);

  const create = useMutation({
    mutationFn: () => footprintService.createSystem({ name: name.trim(), speedTag }),
    onSuccess: () => {
      setName('');
      qc.invalidateQueries({ queryKey: ['footprint-systems'] });
    },
    onError: (e) => setError(formatProblem(e)),
  });

  const setDisposition = useMutation({
    mutationFn: ({
      systemId,
      disposition,
    }: {
      systemId: string;
      disposition: Exclude<Disposition, 'undecided'>;
    }) =>
      footprintService.setDisposition(systemId, {
        disposition,
        rationale: `Set disposition to ${disposition}`,
      }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['footprint-systems'] }),
    onError: (e) => setError(formatProblem(e)),
  });

  const setSpeed = useMutation({
    mutationFn: ({
      systemId,
      tag,
    }: {
      systemId: string;
      tag: SpeedTag;
    }) => footprintService.setSpeedTag(systemId, { speedTag: tag }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['footprint-systems'] }),
    onError: (e) => setError(formatProblem(e)),
  });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="page-title">Dual-speed footprint</h1>
        <p className="page-sub">
          Inventory core systems — disposition and run-careful vs change-fast.
        </p>
      </header>

      {error && <p className="text-sm text-breach">{error}</p>}

      <RunSloStrip systems={list.data ?? []} />

      <form
        className="panel flex flex-wrap items-end gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          create.mutate();
        }}
      >
        <input
          className="field max-w-xs"
          placeholder="System name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <DualSpeedTrack value={speedTag} onChange={setSpeedTag} />
        <button type="submit" className="btn-primary" disabled={create.isPending}>
          Add system
        </button>
      </form>

      <ul className="space-y-3">
        {(list.data ?? []).map((s) => (
          <li key={s.systemId} className="panel space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-medium text-ink">{s.name}</p>
                <p className="font-mono text-[10px] text-steel">{s.systemId}</p>
                {s.couplingWarning && (
                  <p className="mt-1 text-xs text-breach">
                    Coupling warning — change-fast touches careful-run.
                  </p>
                )}
              </div>
              <DualSpeedTrack
                value={s.speedTag}
                onChange={(tag) =>
                  setSpeed.mutate({ systemId: s.systemId, tag })
                }
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {DISPOSITIONS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() =>
                    setDisposition.mutate({
                      systemId: s.systemId,
                      disposition: d,
                    })
                  }
                  className={`rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase ${
                    s.disposition === d
                      ? 'border-teal bg-teal/15 text-teal'
                      : 'border-steel/40 text-steel hover:text-ink'
                  }`}
                >
                  {d}
                </button>
              ))}
              {s.disposition === 'undecided' && (
                <span className="self-center font-mono text-[10px] text-signal">
                  undecided blocks change releases
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
