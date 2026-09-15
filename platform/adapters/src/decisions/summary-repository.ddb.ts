/**
 * SummaryRepository — in-memory sandbox implementation.
 */

import type { SummaryRepository } from "@morphora/services/decisions";
import {
  ensureProductSeeds,
  listCases,
  listDecisions,
  listSignals,
  nowIso,
  responseMeta,
} from "../_shared/sandbox-store.js";

export class SummaryRepositoryDdb implements SummaryRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async getCadenceSummary(input: Parameters<SummaryRepository['getCadenceSummary']>[0]): Promise<Awaited<ReturnType<SummaryRepository['getCadenceSummary']>>> {
    const raw = input as Record<string, unknown>;
    const tenantId = String(raw.orgId ?? 'tnt_demo');
    ensureProductSeeds(tenantId);
    const openSensingCount = listSignals(tenantId).filter((s) => s.status !== 'decided').length;
    const openShadowCaseCount = listCases(tenantId).filter((c) => c.status !== 'closed').length;
    const decisions = listDecisions(tenantId);
    return {
      data: {
        dueDecisionCount: Math.max(1, openSensingCount),
        overdueDecisionCount: 0,
        openSensingCount,
        openShadowCaseCount,
        roleRituals: [
          { role: 'strategist', ritualStatus: 'due', nextDueAt: nowIso() },
          { role: 'bridge', ritualStatus: 'onTrack', lastCompletedAt: decisions[0]?.decidedAt },
          { role: 'ecosystem', ritualStatus: 'onTrack' },
          { role: 'startup', ritualStatus: 'due', nextDueAt: nowIso() },
        ],
        generatedAt: nowIso(),
      },
      ...responseMeta(String(raw.correlationId ?? '')),
    };
  }
}
