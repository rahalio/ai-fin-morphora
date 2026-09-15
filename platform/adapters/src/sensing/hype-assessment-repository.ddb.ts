/**
 * HypeAssessmentRepository — in-memory sandbox implementation.
 */

import type { HypeAssessmentRepository } from "@morphora/services/sensing";
import {
  ensureProductSeeds,
  nowIso,
  putSignal,
  publicSignal,
  responseMeta,
  signalsById,
} from "../_shared/sandbox-store.js";

export class HypeAssessmentRepositoryDdb implements HypeAssessmentRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async upsertHypeAssessment(input: Parameters<HypeAssessmentRepository['upsertHypeAssessment']>[0]): Promise<Awaited<ReturnType<HypeAssessmentRepository['upsertHypeAssessment']>>> {
    const raw = input as Record<string, unknown>;
    const tenantId = String(raw.orgId ?? 'tnt_demo');
    ensureProductSeeds(tenantId);
    const signalId = String(raw.signalId ?? '');
    const row = signalsById.get(signalId);
    if (!row) return null as never;
    const now = nowIso();
    row.hypeAssessment = {
      signalId,
      hypeScore: typeof raw.hypeScore === 'number' ? raw.hypeScore : row.hypeAssessment?.hypeScore,
      recommendedOutcome: (raw.recommendedOutcome as SandboxOutcome | undefined) ?? row.hypeAssessment?.recommendedOutcome,
      assessmentNotes: raw.assessmentNotes ? String(raw.assessmentNotes) : row.hypeAssessment?.assessmentNotes,
      assessedAt: now,
      assessedBy: String(raw.assessedBy ?? 'sandbox'),
    };
    row.status = row.status === 'decided' ? 'decided' : 'assessing';
    row.updatedAt = now;
    putSignal(row);
    return { data: publicSignal(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }
}

type SandboxOutcome = 'adopt' | 'watch' | 'reject';
