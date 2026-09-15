/**
 * DecisionRepository (sensing stamp) — in-memory sandbox implementation.
 */

import type { DecisionRepository } from "@morphora/services/sensing";
import {
  ensureProductSeeds,
  nowIso,
  putSignal,
  publicSignal,
  responseMeta,
  signalsById,
} from "../_shared/sandbox-store.js";

export class DecisionRepositoryDdb implements DecisionRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async stampSensingDecision(input: Parameters<DecisionRepository['stampSensingDecision']>[0]): Promise<Awaited<ReturnType<DecisionRepository['stampSensingDecision']>>> {
    const raw = input as Record<string, unknown>;
    ensureProductSeeds(String(raw.orgId ?? 'tnt_demo'));
    const row = signalsById.get(String(raw.signalId ?? ''));
    if (!row) return null as never;
    const now = nowIso();
    row.status = 'decided';
    row.decisionOutcome = raw.outcome as 'adopt' | 'watch' | 'reject';
    row.decisionRationale = String(raw.rationale ?? '');
    row.decidedAt = now;
    row.updatedAt = now;
    putSignal(row);
    return { data: publicSignal(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }
}
