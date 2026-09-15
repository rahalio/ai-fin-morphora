'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ExecPackComposer } from '@/components/morphora';
import { packsService } from '@/services/domains/packs';
import { formatProblem } from '@/services/shared/http';

export default function PacksPage() {
  const qc = useQueryClient();
  const list = useQuery({
    queryKey: ['packs'],
    queryFn: () => packsService.listPacks(),
  });
  const [error, setError] = useState<string | null>(null);

  const create = useMutation({
    mutationFn: (draft: {
      periodLabel: string;
      stretchSqueezeNote: string;
      spendMixNote: string;
      concentrationNote: string;
      challengerNote: string;
      narrative: string;
    }) => packsService.createPack(draft),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['packs'] }),
    onError: (e) => setError(formatProblem(e)),
  });

  const publish = useMutation({
    mutationFn: (packId: string) => packsService.publishPack(packId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['packs'] });
      qc.invalidateQueries({ queryKey: ['decisions'] });
    },
    onError: (e) => setError(formatProblem(e)),
  });

  const packs = list.data ?? [];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="page-title">Exec packs</h1>
        <p className="page-sub">
          One narrative: stretch/squeeze, spend mix, concentration, challenger.
        </p>
      </header>

      {error && <p className="text-sm text-breach">{error}</p>}

      <div className="grid gap-6 lg:grid-cols-2">
        <ExecPackComposer
          busy={create.isPending}
          onCreate={async (draft) => {
            setError(null);
            await create.mutateAsync(draft);
          }}
        />
        <ul className="space-y-2">
          {packs.map((p) => (
            <li key={p.packId} className="panel space-y-2">
              <div className="flex justify-between gap-2">
                <div>
                  <p className="font-semibold text-teal">{p.periodLabel}</p>
                  <p className="font-mono text-[10px] uppercase text-steel">
                    {p.status}
                    {p.publishedAt
                      ? ` · ${new Date(p.publishedAt).toLocaleString()}`
                      : ''}
                  </p>
                </div>
                <span className="font-mono text-[10px] text-steel">
                  {p.packId}
                </span>
              </div>
              {p.narrative && (
                <p className="line-clamp-3 text-sm text-ink/80">{p.narrative}</p>
              )}
              {p.status === 'draft' && (
                <button
                  type="button"
                  className="btn-primary"
                  disabled={publish.isPending}
                  onClick={() => publish.mutate(p.packId)}
                >
                  Publish
                </button>
              )}
            </li>
          ))}
          {!list.isLoading && packs.length === 0 && (
            <li className="text-sm text-steel">No packs yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
