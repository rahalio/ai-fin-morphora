'use client';

import { useQuery } from '@tanstack/react-query';
import { decisionsService } from '@/services/domains/decisions';
import { formatProblem } from '@/services/shared/http';

export default function LedgerPage() {
  const list = useQuery({
    queryKey: ['decisions'],
    queryFn: () => decisionsService.listDecisions(),
  });

  const rows = (list.data ?? [])
    .slice()
    .sort(
      (a, b) =>
        new Date(b.decidedAt).getTime() - new Date(a.decidedAt).getTime(),
    );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="page-title">
          Decision <span className="text-teal">ledger</span>
        </h1>
        <p className="page-sub">
          Immutable CIO operating decisions with attribution.
        </p>
      </header>

      {list.isError && (
        <p className="text-sm text-breach">{formatProblem(list.error)}</p>
      )}

      <ol className="relative space-y-0 border-l border-steel/30 pl-6">
        {rows.map((d) => (
          <li key={d.decisionId} className="relative pb-6">
            <span className="absolute -left-[1.65rem] top-1 h-2.5 w-2.5 rounded-full bg-teal" />
            <div className="panel">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-sm text-ink">
                  <span className="font-semibold text-teal">{d.outcome}</span>
                  <span className="text-steel"> · {d.decisionType}</span>
                  {d.shapeshifterRole && (
                    <span className="text-steel">
                      {' '}
                      · {d.shapeshifterRole}
                    </span>
                  )}
                </p>
                <time className="font-mono text-[10px] text-steel">
                  {new Date(d.decidedAt).toLocaleString()}
                </time>
              </div>
              <p className="mt-2 text-sm text-ink/80">{d.rationale}</p>
              <p className="mt-2 font-mono text-[10px] text-teal">
                {d.decisionId}
                {d.relatedEntityId ? ` → ${d.relatedEntityId}` : ''}
              </p>
            </div>
          </li>
        ))}
      </ol>
      {!list.isLoading && rows.length === 0 && (
        <p className="text-sm text-steel">Ledger empty — stamp a decision.</p>
      )}
    </div>
  );
}
