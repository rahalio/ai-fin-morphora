/**
 * RemediateRepository — in-memory sandbox implementation.
 */

import type { RemediateRepository } from "@morphora/services/cases";
import {
  casesById,
  ensureProductSeeds,
  nowIso,
  putCase,
  publicCase,
  responseMeta,
} from "../_shared/sandbox-store.js";

export class RemediateRepositoryDdb implements RemediateRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async remediateShadowITCase(input: Parameters<RemediateRepository['remediateShadowITCase']>[0]): Promise<Awaited<ReturnType<RemediateRepository['remediateShadowITCase']>>> {
    const raw = input as Record<string, unknown>;
    ensureProductSeeds(String(raw.orgId ?? 'tnt_demo'));
    const row = casesById.get(String(raw.caseId ?? ''));
    if (!row) return null as never;
    const now = nowIso();
    row.remediationAction = raw.action as typeof row.remediationAction;
    row.footprintSystemId = raw.footprintSystemId ? String(raw.footprintSystemId) : row.footprintSystemId;
    row.remediationNotes = raw.notes ? String(raw.notes) : row.remediationNotes;
    row.status = raw.action === 'escalate' ? 'remediating' : 'closed';
    if (row.status === 'closed') row.closedAt = now;
    row.updatedAt = now;
    putCase(row);
    return { data: publicCase(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }
}
