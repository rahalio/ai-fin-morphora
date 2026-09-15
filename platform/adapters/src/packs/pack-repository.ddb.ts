/**
 * PackRepository — in-memory sandbox implementation.
 */

import type { PackRepository } from "@morphora/services/packs";
import {
  ensureProductSeeds,
  listPacks,
  nowIso,
  packsById,
  putPack,
  publicPack,
  responseMeta,
  sandboxId,
  type SandboxPack,
} from "../_shared/sandbox-store.js";

export class PackRepositoryDdb implements PackRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listExecPacks(input: Parameters<PackRepository['listExecPacks']>[0]): Promise<Awaited<ReturnType<PackRepository['listExecPacks']>>> {
    const raw = input as Record<string, unknown>;
    const items = listPacks(String(raw.orgId ?? 'tnt_demo')).map(publicPack);
    return { data: { items }, ...responseMeta(String(raw.correlationId ?? '')) };
  }

  async createExecPack(input: Parameters<PackRepository['createExecPack']>[0]): Promise<Awaited<ReturnType<PackRepository['createExecPack']>>> {
    const raw = input as Record<string, unknown>;
    const tenantId = String(raw.orgId ?? 'tnt_demo');
    ensureProductSeeds(tenantId);
    const now = nowIso();
    const row: SandboxPack = {
      packId: String(raw.id ?? sandboxId('pck')),
      tenantId,
      status: 'draft',
      periodLabel: String(raw.periodLabel ?? ''),
      narrative: raw.narrative ? String(raw.narrative) : undefined,
      stretchSqueezeNote: raw.stretchSqueezeNote ? String(raw.stretchSqueezeNote) : undefined,
      spendMixNote: raw.spendMixNote ? String(raw.spendMixNote) : undefined,
      concentrationNote: raw.concentrationNote ? String(raw.concentrationNote) : undefined,
      challengerNote: raw.challengerNote ? String(raw.challengerNote) : undefined,
      createdAt: now,
      updatedAt: now,
    };
    putPack(row);
    return { data: publicPack(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }

  async getExecPack(input: Parameters<PackRepository['getExecPack']>[0]): Promise<Awaited<ReturnType<PackRepository['getExecPack']>>> {
    const raw = input as Record<string, unknown>;
    ensureProductSeeds(String(raw.orgId ?? 'tnt_demo'));
    const row = packsById.get(String(raw.packId ?? ''));
    if (!row) return null as never;
    return { data: publicPack(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }
}
