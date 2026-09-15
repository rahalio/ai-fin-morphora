'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChallengerKillGate, SourcingDecisionChip } from '@/components/morphora';
import {
  initiativesService,
  type InitiativeStatus,
  type ShapeshifterRole,
  type SourcingChoice,
} from '@/services/domains/initiatives';
import { formatProblem } from '@/services/shared/http';

const COLUMNS: InitiativeStatus[] = ['experiment', 'scale', 'killed'];

export default function ChallengerPage() {
  const qc = useQueryClient();
  const list = useQuery({
    queryKey: ['initiatives'],
    queryFn: () => initiativesService.listInitiatives(),
  });
  const [name, setName] = useState('');
  const [role, setRole] = useState<ShapeshifterRole>('startup');
  const [killMetric, setKillMetric] = useState('');
  const [error, setError] = useState<string | null>(null);

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: ['initiatives'] });
    qc.invalidateQueries({ queryKey: ['decisions'] });
  };

  const create = useMutation({
    mutationFn: () =>
      initiativesService.createInitiative({
        name: name.trim(),
        role,
        killMetric: killMetric.trim() || undefined,
      }),
    onSuccess: () => {
      setName('');
      setKillMetric('');
      invalidate();
    },
    onError: (e) => setError(formatProblem(e)),
  });

  const sourcing = useMutation({
    mutationFn: ({
      id,
      choice,
    }: {
      id: string;
      choice: Exclude<SourcingChoice, 'undecided'>;
    }) =>
      initiativesService.setSourcing(id, {
        sourcing: choice,
        rationale: `Sourcing decided: ${choice}`,
      }),
    onSuccess: invalidate,
    onError: (e) => setError(formatProblem(e)),
  });

  const kill = useMutation({
    mutationFn: ({ id, rationale }: { id: string; rationale: string }) =>
      initiativesService.kill(id, { rationale }),
    onSuccess: invalidate,
    onError: (e) => setError(formatProblem(e)),
  });

  const scale = useMutation({
    mutationFn: ({ id, rationale }: { id: string; rationale: string }) =>
      initiativesService.scale(id, { rationale }),
    onSuccess: invalidate,
    onError: (e) => setError(formatProblem(e)),
  });

  const items = list.data ?? [];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="page-title">Challenger portfolio</h1>
        <p className="page-sub">
          Testable increments with kill/scale criteria — no museum labs.
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
          placeholder="Initiative name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select
          className="field"
          value={role}
          onChange={(e) => setRole(e.target.value as ShapeshifterRole)}
        >
          <option value="strategist">Strategist</option>
          <option value="bridge">Bridge</option>
          <option value="ecosystem">Ecosystem</option>
          <option value="startup">Start-up</option>
        </select>
        <input
          className="field"
          placeholder="Kill metric"
          value={killMetric}
          onChange={(e) => setKillMetric(e.target.value)}
        />
        <button type="submit" className="btn-primary" disabled={create.isPending}>
          Create
        </button>
      </form>

      <div className="grid gap-4 lg:grid-cols-3">
        {COLUMNS.map((col) => (
          <div key={col} className="space-y-2">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-steel">
              {col}
            </h2>
            {items
              .filter((i) => i.status === col)
              .map((i) => (
                <div key={i.initiativeId} className="space-y-2">
                  <ChallengerKillGate
                    initiative={i}
                    busy={kill.isPending || scale.isPending}
                    onKill={(rationale) =>
                      kill.mutate({ id: i.initiativeId, rationale })
                    }
                    onScale={(rationale) =>
                      scale.mutate({ id: i.initiativeId, rationale })
                    }
                  />
                  {i.status === 'experiment' && (
                    <div className="px-1">
                      <SourcingDecisionChip
                        value={i.sourcing}
                        onSelect={(choice) =>
                          sourcing.mutate({ id: i.initiativeId, choice })
                        }
                      />
                    </div>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
