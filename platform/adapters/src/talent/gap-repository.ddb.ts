/**
 * GapRepository — in-memory sandbox implementation.
 */

import type { GapRepository } from "@morphora/services/talent";
import {
  ensureProductSeeds,
  listTalentGaps,
  nowIso,
  putTalentGap,
  publicTalentGap,
  responseMeta,
  sandboxId,
  talentGapsById,
  type SandboxTalentGap,
} from "../_shared/sandbox-store.js";

export class GapRepositoryDdb implements GapRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listTalentGaps(input: Parameters<GapRepository['listTalentGaps']>[0]): Promise<Awaited<ReturnType<GapRepository['listTalentGaps']>>> {
    const raw = input as Record<string, unknown>;
    const items = listTalentGaps(String(raw.orgId ?? 'tnt_demo')).map(publicTalentGap);
    return { data: { items }, ...responseMeta(String(raw.correlationId ?? '')) };
  }

  async createTalentGap(input: Parameters<GapRepository['createTalentGap']>[0]): Promise<Awaited<ReturnType<GapRepository['createTalentGap']>>> {
    const raw = input as Record<string, unknown>;
    const tenantId = String(raw.orgId ?? 'tnt_demo');
    ensureProductSeeds(tenantId);
    const now = nowIso();
    const row: SandboxTalentGap = {
      gapId: String(raw.id ?? sandboxId('tln')),
      tenantId,
      roleName: String(raw.roleName ?? ''),
      coverage: typeof raw.coverage === 'number' ? raw.coverage : 0,
      relatedInitiativeId: raw.relatedInitiativeId ? String(raw.relatedInitiativeId) : undefined,
      severity: (raw.severity as SandboxTalentGap['severity']) ?? 'medium',
      notes: raw.notes ? String(raw.notes) : undefined,
      createdAt: now,
      updatedAt: now,
    };
    putTalentGap(row);
    return { data: publicTalentGap(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }

  async getTalentGap(input: Parameters<GapRepository['getTalentGap']>[0]): Promise<Awaited<ReturnType<GapRepository['getTalentGap']>>> {
    const raw = input as Record<string, unknown>;
    ensureProductSeeds(String(raw.orgId ?? 'tnt_demo'));
    const row = talentGapsById.get(String(raw.gapId ?? ''));
    if (!row) return null as never;
    return { data: publicTalentGap(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }

  async updateTalentGap(input: Parameters<GapRepository['updateTalentGap']>[0]): Promise<Awaited<ReturnType<GapRepository['updateTalentGap']>>> {
    const raw = input as Record<string, unknown>;
    ensureProductSeeds(String(raw.orgId ?? 'tnt_demo'));
    const row = talentGapsById.get(String(raw.gapId ?? ''));
    if (!row) return null as never;
    if (raw.roleName !== undefined) row.roleName = String(raw.roleName);
    if (typeof raw.coverage === 'number') row.coverage = raw.coverage;
    if (raw.relatedInitiativeId !== undefined) row.relatedInitiativeId = String(raw.relatedInitiativeId);
    if (raw.severity !== undefined) row.severity = raw.severity as SandboxTalentGap['severity'];
    if (raw.notes !== undefined) row.notes = String(raw.notes);
    row.updatedAt = nowIso();
    putTalentGap(row);
    return { data: publicTalentGap(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }
}
