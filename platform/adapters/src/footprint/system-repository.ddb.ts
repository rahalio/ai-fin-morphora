/**
 * SystemRepository — in-memory sandbox implementation.
 */

import type { SystemRepository } from "@morphora/services/footprint";
import {
  ensureProductSeeds,
  listSystems,
  nowIso,
  putSystem,
  publicSystem,
  responseMeta,
  sandboxId,
  systemsById,
  type SandboxSystem,
} from "../_shared/sandbox-store.js";

export class SystemRepositoryDdb implements SystemRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listCoreSystems(input: Parameters<SystemRepository['listCoreSystems']>[0]): Promise<Awaited<ReturnType<SystemRepository['listCoreSystems']>>> {
    const raw = input as Record<string, unknown>;
    const items = listSystems(String(raw.orgId ?? 'tnt_demo')).map(publicSystem);
    return { data: { items }, ...responseMeta(String(raw.correlationId ?? '')) };
  }

  async createCoreSystem(input: Parameters<SystemRepository['createCoreSystem']>[0]): Promise<Awaited<ReturnType<SystemRepository['createCoreSystem']>>> {
    const raw = input as Record<string, unknown>;
    const tenantId = String(raw.orgId ?? 'tnt_demo');
    ensureProductSeeds(tenantId);
    const now = nowIso();
    const row: SandboxSystem = {
      systemId: String(raw.id ?? sandboxId('ftp')),
      tenantId,
      name: String(raw.name ?? ''),
      speedTag: (raw.speedTag as SandboxSystem['speedTag']) ?? 'runCareful',
      disposition: 'undecided',
      runSpendShare: typeof raw.runSpendShare === 'number' ? raw.runSpendShare : undefined,
      sloCompliance: typeof raw.sloCompliance === 'number' ? raw.sloCompliance : undefined,
      couplingWarning: typeof raw.couplingWarning === 'boolean' ? raw.couplingWarning : undefined,
      createdAt: now,
      updatedAt: now,
    };
    putSystem(row);
    return { data: publicSystem(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }

  async getCoreSystem(input: Parameters<SystemRepository['getCoreSystem']>[0]): Promise<Awaited<ReturnType<SystemRepository['getCoreSystem']>>> {
    const raw = input as Record<string, unknown>;
    ensureProductSeeds(String(raw.orgId ?? 'tnt_demo'));
    const row = systemsById.get(String(raw.systemId ?? ''));
    if (!row) return null as never;
    return { data: publicSystem(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }
}
