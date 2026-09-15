/**
 * DispositionRepository — in-memory sandbox implementation.
 */

import type { DispositionRepository } from "@morphora/services/footprint";
import {
  ensureProductSeeds,
  nowIso,
  putSystem,
  publicSystem,
  responseMeta,
  systemsById,
} from "../_shared/sandbox-store.js";

export class DispositionRepositoryDdb implements DispositionRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async setCoreSystemDisposition(input: Parameters<DispositionRepository['setCoreSystemDisposition']>[0]): Promise<Awaited<ReturnType<DispositionRepository['setCoreSystemDisposition']>>> {
    const raw = input as Record<string, unknown>;
    ensureProductSeeds(String(raw.orgId ?? 'tnt_demo'));
    const row = systemsById.get(String(raw.systemId ?? ''));
    if (!row) return null as never;
    row.disposition = raw.disposition as typeof row.disposition;
    row.dispositionRationale = raw.rationale ? String(raw.rationale) : row.dispositionRationale;
    row.updatedAt = nowIso();
    putSystem(row);
    return { data: publicSystem(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }
}
