/**
 * PartnerRepository — in-memory sandbox implementation.
 */

import type { PartnerRepository } from "@morphora/services/partners";
import {
  ensureProductSeeds,
  listPartners,
  nowIso,
  partnersById,
  putPartner,
  publicPartner,
  responseMeta,
  sandboxId,
  type SandboxPartner,
} from "../_shared/sandbox-store.js";

export class PartnerRepositoryDdb implements PartnerRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listPartners(input: Parameters<PartnerRepository['listPartners']>[0]): Promise<Awaited<ReturnType<PartnerRepository['listPartners']>>> {
    const raw = input as Record<string, unknown>;
    const items = listPartners(String(raw.orgId ?? 'tnt_demo')).map(publicPartner);
    return { data: { items }, ...responseMeta(String(raw.correlationId ?? '')) };
  }

  async createPartner(input: Parameters<PartnerRepository['createPartner']>[0]): Promise<Awaited<ReturnType<PartnerRepository['createPartner']>>> {
    const raw = input as Record<string, unknown>;
    const tenantId = String(raw.orgId ?? 'tnt_demo');
    ensureProductSeeds(tenantId);
    const now = nowIso();
    const row: SandboxPartner = {
      partnerId: String(raw.id ?? sandboxId('prt')),
      tenantId,
      name: String(raw.name ?? ''),
      partnerType: String(raw.partnerType ?? ''),
      criticality: (raw.criticality as SandboxPartner['criticality']) ?? 'medium',
      concentrationScore: typeof raw.concentrationScore === 'number' ? raw.concentrationScore : undefined,
      spof: typeof raw.spof === 'boolean' ? raw.spof : false,
      createdAt: now,
      updatedAt: now,
    };
    putPartner(row);
    return { data: publicPartner(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }

  async getPartner(input: Parameters<PartnerRepository['getPartner']>[0]): Promise<Awaited<ReturnType<PartnerRepository['getPartner']>>> {
    const raw = input as Record<string, unknown>;
    ensureProductSeeds(String(raw.orgId ?? 'tnt_demo'));
    const row = partnersById.get(String(raw.partnerId ?? ''));
    if (!row) return null as never;
    return { data: publicPartner(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }
}
