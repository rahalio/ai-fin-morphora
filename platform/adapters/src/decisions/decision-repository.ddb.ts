/**
 * DecisionRepository — in-memory sandbox implementation.
 */

import type { DecisionRepository } from "@morphora/services/decisions";
import {
  decisionsById,
  ensureProductSeeds,
  listDecisions,
  nowIso,
  putDecision,
  publicDecision,
  responseMeta,
  sandboxId,
  type SandboxDecision,
} from "../_shared/sandbox-store.js";

export class DecisionRepositoryDdb implements DecisionRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listDecisions(input: Parameters<DecisionRepository['listDecisions']>[0]): Promise<Awaited<ReturnType<DecisionRepository['listDecisions']>>> {
    const raw = input as Record<string, unknown>;
    const items = listDecisions(String(raw.orgId ?? 'tnt_demo')).map(publicDecision);
    return { data: { items }, ...responseMeta(String(raw.correlationId ?? '')) };
  }

  async recordDecision(input: Parameters<DecisionRepository['recordDecision']>[0]): Promise<Awaited<ReturnType<DecisionRepository['recordDecision']>>> {
    const raw = input as Record<string, unknown>;
    const tenantId = String(raw.orgId ?? 'tnt_demo');
    ensureProductSeeds(tenantId);
    const now = nowIso();
    const row: SandboxDecision = {
      decisionId: String(raw.id ?? sandboxId('dec')),
      tenantId,
      decisionType: String(raw.decisionType ?? ''),
      outcome: String(raw.outcome ?? ''),
      rationale: String(raw.rationale ?? ''),
      relatedEntityId: raw.relatedEntityId ? String(raw.relatedEntityId) : undefined,
      relatedEntityType: raw.relatedEntityType as SandboxDecision['relatedEntityType'],
      shapeshifterRole: raw.shapeshifterRole as SandboxDecision['shapeshifterRole'],
      decidedAt: raw.decidedAt ? String(raw.decidedAt) : now,
      createdAt: now,
    };
    putDecision(row);
    return { data: publicDecision(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }

  async getDecision(input: Parameters<DecisionRepository['getDecision']>[0]): Promise<Awaited<ReturnType<DecisionRepository['getDecision']>>> {
    const raw = input as Record<string, unknown>;
    ensureProductSeeds(String(raw.orgId ?? 'tnt_demo'));
    const row = decisionsById.get(String(raw.decisionId ?? ''));
    if (!row) return null as never;
    return { data: publicDecision(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }
}
