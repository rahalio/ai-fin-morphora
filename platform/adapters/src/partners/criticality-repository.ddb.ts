/**
 * CriticalityRepository — in-memory sandbox implementation.
 */

import type { CriticalityRepository } from "@morphora/services/partners";
import {
  ensureProductSeeds,
  nowIso,
  partnersById,
  putPartner,
  publicPartner,
  responseMeta,
} from "../_shared/sandbox-store.js";

export class CriticalityRepositoryDdb implements CriticalityRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async setPartnerCriticality(input: Parameters<CriticalityRepository['setPartnerCriticality']>[0]): Promise<Awaited<ReturnType<CriticalityRepository['setPartnerCriticality']>>> {
    const raw = input as Record<string, unknown>;
    ensureProductSeeds(String(raw.orgId ?? 'tnt_demo'));
    const row = partnersById.get(String(raw.partnerId ?? ''));
    if (!row) return null as never;
    row.criticality = raw.criticality as typeof row.criticality;
    row.concentrationScore = typeof raw.concentrationScore === 'number' ? raw.concentrationScore : row.concentrationScore;
    if (typeof raw.spof === 'boolean') row.spof = raw.spof;
    row.updatedAt = nowIso();
    putPartner(row);
    return { data: publicPartner(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }
}
