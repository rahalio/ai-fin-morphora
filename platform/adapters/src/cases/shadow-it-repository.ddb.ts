/**
 * ShadowItRepository — in-memory sandbox implementation.
 */

import type { ShadowItRepository } from "@morphora/services/cases";
import {
  casesById,
  ensureProductSeeds,
  listCases,
  nowIso,
  putCase,
  publicCase,
  responseMeta,
  sandboxId,
  type SandboxCase,
} from "../_shared/sandbox-store.js";

export class ShadowItRepositoryDdb implements ShadowItRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listShadowITCases(input: Parameters<ShadowItRepository['listShadowITCases']>[0]): Promise<Awaited<ReturnType<ShadowItRepository['listShadowITCases']>>> {
    const raw = input as Record<string, unknown>;
    const items = listCases(String(raw.orgId ?? 'tnt_demo')).map(publicCase);
    return { data: { items }, ...responseMeta(String(raw.correlationId ?? '')) };
  }

  async openShadowITCase(input: Parameters<ShadowItRepository['openShadowITCase']>[0]): Promise<Awaited<ReturnType<ShadowItRepository['openShadowITCase']>>> {
    const raw = input as Record<string, unknown>;
    const tenantId = String(raw.orgId ?? 'tnt_demo');
    ensureProductSeeds(tenantId);
    const now = nowIso();
    const row: SandboxCase = {
      caseId: String(raw.id ?? sandboxId('cse')),
      tenantId,
      systemName: String(raw.systemName ?? ''),
      status: 'open',
      discoveredVia: String(raw.discoveredVia ?? ''),
      createdAt: now,
      updatedAt: now,
    };
    putCase(row);
    return { data: publicCase(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }

  async getShadowITCase(input: Parameters<ShadowItRepository['getShadowITCase']>[0]): Promise<Awaited<ReturnType<ShadowItRepository['getShadowITCase']>>> {
    const raw = input as Record<string, unknown>;
    ensureProductSeeds(String(raw.orgId ?? 'tnt_demo'));
    const row = casesById.get(String(raw.caseId ?? ''));
    if (!row) return null as never;
    return { data: publicCase(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }
}
