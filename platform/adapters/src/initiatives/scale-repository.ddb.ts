/**
 * ScaleRepository — in-memory sandbox implementation.
 */

import type { ScaleRepository } from "@morphora/services/initiatives";
import {
  ensureProductSeeds,
  initiativesById,
  nowIso,
  putInitiative,
  publicInitiative,
  responseMeta,
} from "../_shared/sandbox-store.js";

export class ScaleRepositoryDdb implements ScaleRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async scaleInitiative(input: Parameters<ScaleRepository['scaleInitiative']>[0]): Promise<Awaited<ReturnType<ScaleRepository['scaleInitiative']>>> {
    const raw = input as Record<string, unknown>;
    ensureProductSeeds(String(raw.orgId ?? 'tnt_demo'));
    const row = initiativesById.get(String(raw.initiativeId ?? ''));
    if (!row) return null as never;
    row.status = 'scale';
    row.scaleRationale = String(raw.rationale ?? '');
    row.updatedAt = nowIso();
    putInitiative(row);
    return { data: publicInitiative(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }
}
