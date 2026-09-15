/**
 * InitiativeRepository — in-memory sandbox implementation.
 */

import type { InitiativeRepository } from "@morphora/services/initiatives";
import {
  ensureProductSeeds,
  initiativesById,
  listInitiatives,
  nowIso,
  putInitiative,
  publicInitiative,
  responseMeta,
  sandboxId,
  type SandboxInitiative,
} from "../_shared/sandbox-store.js";

export class InitiativeRepositoryDdb implements InitiativeRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listChallengerInitiatives(input: Parameters<InitiativeRepository['listChallengerInitiatives']>[0]): Promise<Awaited<ReturnType<InitiativeRepository['listChallengerInitiatives']>>> {
    const raw = input as Record<string, unknown>;
    const items = listInitiatives(String(raw.orgId ?? 'tnt_demo')).map(publicInitiative);
    return { data: { items }, ...responseMeta(String(raw.correlationId ?? '')) };
  }

  async createChallengerInitiative(input: Parameters<InitiativeRepository['createChallengerInitiative']>[0]): Promise<Awaited<ReturnType<InitiativeRepository['createChallengerInitiative']>>> {
    const raw = input as Record<string, unknown>;
    const tenantId = String(raw.orgId ?? 'tnt_demo');
    ensureProductSeeds(tenantId);
    const now = nowIso();
    const row: SandboxInitiative = {
      initiativeId: String(raw.id ?? sandboxId('ini')),
      tenantId,
      name: String(raw.name ?? ''),
      status: 'experiment',
      role: (raw.role as SandboxInitiative['role']) ?? 'startup',
      sourcing: 'undecided',
      killMetric: raw.killMetric ? String(raw.killMetric) : undefined,
      daysInLab: 0,
      sensingSignalId: raw.sensingSignalId ? String(raw.sensingSignalId) : undefined,
      sponsorName: raw.sponsorName ? String(raw.sponsorName) : undefined,
      createdAt: now,
      updatedAt: now,
    };
    putInitiative(row);
    return { data: publicInitiative(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }

  async getChallengerInitiative(input: Parameters<InitiativeRepository['getChallengerInitiative']>[0]): Promise<Awaited<ReturnType<InitiativeRepository['getChallengerInitiative']>>> {
    const raw = input as Record<string, unknown>;
    ensureProductSeeds(String(raw.orgId ?? 'tnt_demo'));
    const row = initiativesById.get(String(raw.initiativeId ?? ''));
    if (!row) return null as never;
    return { data: publicInitiative(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }
}
