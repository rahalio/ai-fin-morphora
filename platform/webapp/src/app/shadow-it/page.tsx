'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  casesService,
  type RemediationAction,
} from '@/services/domains/cases';
import { formatProblem } from '@/services/shared/http';

const ACTIONS: RemediationAction[] = ['retire', 'escalate'];

export default function ShadowItPage() {
  const qc = useQueryClient();
  const list = useQuery({
    queryKey: ['shadow-cases'],
    queryFn: () => casesService.listCases(),
  });
  const [systemName, setSystemName] = useState('');
  const [discoveredVia, setDiscoveredVia] = useState('spend');
  const [error, setError] = useState<string | null>(null);

  const create = useMutation({
    mutationFn: () =>
      casesService.createCase({
        systemName: systemName.trim(),
        discoveredVia: discoveredVia.trim(),
      }),
    onSuccess: () => {
      setSystemName('');
      qc.invalidateQueries({ queryKey: ['shadow-cases'] });
    },
    onError: (e) => setError(formatProblem(e)),
  });

  const remediate = useMutation({
    mutationFn: ({
      caseId,
      action,
    }: {
      caseId: string;
      action: RemediationAction;
    }) =>
      casesService.remediate(caseId, {
        action,
        notes: `Remediation: ${action}`,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['shadow-cases'] });
      qc.invalidateQueries({ queryKey: ['cadence-summary'] });
    },
    onError: (e) => setError(formatProblem(e)),
  });

  const cases = list.data ?? [];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="page-title">Shadow IT cases</h1>
        <p className="page-sub">
          Discoveries outside the dual-speed map — map, retire, or escalate.
        </p>
      </header>

      {error && <p className="text-sm text-breach">{error}</p>}

      <form
        className="panel flex flex-wrap gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          create.mutate();
        }}
      >
        <input
          className="field max-w-xs"
          placeholder="Discovered system"
          value={systemName}
          onChange={(e) => setSystemName(e.target.value)}
          required
        />
        <input
          className="field max-w-[12rem]"
          placeholder="Discovered via"
          value={discoveredVia}
          onChange={(e) => setDiscoveredVia(e.target.value)}
          required
        />
        <button type="submit" className="btn-primary" disabled={create.isPending}>
          Open case
        </button>
      </form>

      <ul className="space-y-2">
        {cases.map((c) => (
          <li key={c.caseId} className="panel space-y-3">
            <div className="flex flex-wrap justify-between gap-2">
              <div>
                <p className="font-medium text-ink">{c.systemName}</p>
                <p className="text-xs text-steel">
                  via {c.discoveredVia} ·{' '}
                  <span className="font-mono uppercase">{c.status}</span>
                </p>
              </div>
              <span className="font-mono text-[10px] text-steel">{c.caseId}</span>
            </div>
            {c.status !== 'closed' && (
              <div className="flex flex-wrap gap-2">
                    {ACTIONS.map((action) => (
                  <button
                    key={action}
                    type="button"
                    className="btn-ghost !text-xs"
                    disabled={remediate.isPending}
                    onClick={() =>
                      remediate.mutate({ caseId: c.caseId, action })
                    }
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
            {c.remediationAction && (
              <p className="text-xs text-teal">
                Action: {c.remediationAction}
                {c.remediationNotes ? ` — ${c.remediationNotes}` : ''}
              </p>
            )}
          </li>
        ))}
      </ul>
      {!list.isLoading && cases.length === 0 && (
        <p className="text-sm text-teal">
          Empty queue — healthy discovery scan message.
        </p>
      )}
    </div>
  );
}
