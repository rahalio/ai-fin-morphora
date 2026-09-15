/**
 * SourcingRepository — in-memory sandbox implementation.
 */

import type { SourcingRepository } from "@morphora/services/initiatives";
import {
  ensureProductSeeds,
  initiativesById,
  nowIso,
  putInitiative,
  publicInitiative,
  responseMeta,
} from "../_shared/sandbox-store.js";

export class SourcingRepositoryDdb implements SourcingRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async setInitiativeSourcing(input: Parameters<SourcingRepository['setInitiativeSourcing']>[0]): Promise<Awaited<ReturnType<SourcingRepository['setInitiativeSourcing']>>> {
    const raw = input as Record<string, unknown>;
    ensureProductSeeds(String(raw.orgId ?? 'tnt_demo'));
    const row = initiativesById.get(String(raw.initiativeId ?? ''));
    if (!row) return null as never;
    row.sourcing = raw.sourcing as typeof row.sourcing;
    row.sourcingRationale = raw.rationale ? String(raw.rationale) : row.sourcingRationale;
    row.updatedAt = nowIso();
    putInitiative(row);
    return { data: publicInitiative(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }
}
