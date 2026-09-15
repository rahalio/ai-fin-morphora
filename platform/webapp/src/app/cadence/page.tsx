'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ShapeshifterCompass, RunSloStrip } from '@/components/morphora';
import { decisionsService } from '@/services/domains/decisions';
import { footprintService } from '@/services/domains/footprint';
import { formatProblem } from '@/services/shared/http';

export default function CadencePage() {
  const summary = useQuery({
    queryKey: ['cadence-summary'],
    queryFn: () => decisionsService.getCadenceSummary(),
  });
  const decisions = useQuery({
    queryKey: ['decisions'],
    queryFn: () => decisionsService.listDecisions(),
  });
  const systems = useQuery({
    queryKey: ['footprint-systems'],
    queryFn: () => footprintService.listSystems(),
  });

  const due = (decisions.data ?? [])
    .slice()
    .sort(
      (a, b) =>
        new Date(b.decidedAt).getTime() - new Date(a.decidedAt).getTime(),
    )
    .slice(0, 6);

  const runShare =
    (systems.data ?? []).length === 0
      ? null
      : (systems.data ?? []).reduce(
          (a, s) => a + (s.runSpendShare ?? 0.75),
          0,
        ) / (systems.data ?? []).length;

  return (
    <div className="space-y-8">
      <header>
        <h1 className="page-title">Shapeshifter cadence</h1>
        <p className="page-sub">
          Visit all four roles this week — stretch where change-fast wins,
          squeeze where run spend traps the budget.
        </p>
      </header>

      {summary.isError && (
        <p className="text-sm text-breach">{formatProblem(summary.error)}</p>
      )}

      <ShapeshifterCompass rituals={summary.data?.roleRituals} />

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="panel lg:col-span-2">
          <h2 className="text-sm font-semibold text-teal">Stretch / squeeze</h2>
          <p className="mt-2 text-lg text-ink">
            {runShare != null && runShare > 0.8
              ? 'Squeeze run spend — you are above the 75–80% trap line.'
              : 'Stretch change-fast where kill metrics are clear; hold careful-run SLOs.'}
          </p>
          <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs text-steel">
            <span>Due: {summary.data?.dueDecisionCount ?? '—'}</span>
            <span>Overdue: {summary.data?.overdueDecisionCount ?? '—'}</span>
            <span>Open sensing: {summary.data?.openSensingCount ?? '—'}</span>
            <span>
              Shadow cases: {summary.data?.openShadowCaseCount ?? '—'}
            </span>
          </div>
        </div>
        <div className="panel space-y-2">
          <h2 className="text-sm font-semibold text-ink">Jump</h2>
          <Link className="block text-sm text-teal hover:underline" href="/sensing">
            Open sensing backlog
          </Link>
          <Link
            className="block text-sm text-teal hover:underline"
            href="/challenger"
          >
            Overdue kills
          </Link>
          <Link className="block text-sm text-teal hover:underline" href="/packs">
            Publish pack draft
          </Link>
          <Link
            className="block text-sm text-teal hover:underline"
            href="/footprint"
          >
            Footprint conflicts
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-ink">
          Run SLOs beside change
        </h2>
        <RunSloStrip systems={systems.data ?? []} />
      </section>

      <section>
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-sm font-semibold text-ink">Recent decisions</h2>
          <Link href="/ledger" className="text-xs text-teal hover:underline">
            Full ledger
          </Link>
        </div>
        <ul className="space-y-2">
          {due.map((d) => (
            <li key={d.decisionId} className="panel flex justify-between gap-4">
              <div>
                <p className="text-sm text-ink">
                  <span className="text-teal">{d.outcome}</span>
                  <span className="text-steel"> · {d.decisionType}</span>
                </p>
                <p className="mt-1 line-clamp-1 text-xs text-steel">
                  {d.rationale}
                </p>
              </div>
              <span className="shrink-0 font-mono text-[10px] text-steel">
                {d.decisionId}
              </span>
            </li>
          ))}
          {due.length === 0 && !decisions.isLoading && (
            <li className="text-sm text-steel">
              No decisions yet — stamp a sensing signal to open the ledger.
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
