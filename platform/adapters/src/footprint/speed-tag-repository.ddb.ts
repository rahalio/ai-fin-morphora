/**
 * SpeedTagRepository — in-memory sandbox implementation.
 */

import type { SpeedTagRepository } from "@morphora/services/footprint";
import {
  ensureProductSeeds,
  nowIso,
  putSystem,
  publicSystem,
  responseMeta,
  systemsById,
} from "../_shared/sandbox-store.js";

export class SpeedTagRepositoryDdb implements SpeedTagRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async setCoreSystemSpeedTag(input: Parameters<SpeedTagRepository['setCoreSystemSpeedTag']>[0]): Promise<Awaited<ReturnType<SpeedTagRepository['setCoreSystemSpeedTag']>>> {
    const raw = input as Record<string, unknown>;
    ensureProductSeeds(String(raw.orgId ?? 'tnt_demo'));
    const row = systemsById.get(String(raw.systemId ?? ''));
    if (!row) return null as never;
    row.speedTag = raw.speedTag as typeof row.speedTag;
    row.updatedAt = nowIso();
    putSystem(row);
    return { data: publicSystem(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }
}
