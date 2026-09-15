/**
 * KillRepository — in-memory sandbox implementation.
 */

import type { KillRepository } from "@morphora/services/initiatives";
import {
  ensureProductSeeds,
  initiativesById,
  nowIso,
  putInitiative,
  publicInitiative,
  responseMeta,
} from "../_shared/sandbox-store.js";

export class KillRepositoryDdb implements KillRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async killInitiative(input: Parameters<KillRepository['killInitiative']>[0]): Promise<Awaited<ReturnType<KillRepository['killInitiative']>>> {
    const raw = input as Record<string, unknown>;
    ensureProductSeeds(String(raw.orgId ?? 'tnt_demo'));
    const row = initiativesById.get(String(raw.initiativeId ?? ''));
    if (!row) return null as never;
    row.status = 'killed';
    row.killRationale = String(raw.rationale ?? '');
    row.updatedAt = nowIso();
    putInitiative(row);
    return { data: publicInitiative(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }
}
