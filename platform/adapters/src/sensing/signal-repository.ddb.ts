/**
 * SignalRepository — in-memory sandbox implementation.
 */

import type { SignalRepository } from "@morphora/services/sensing";
import {
  ensureProductSeeds,
  listSignals,
  nowIso,
  putSignal,
  publicSignal,
  responseMeta,
  sandboxId,
  signalsById,
  type SandboxSignal,
} from "../_shared/sandbox-store.js";

export class SignalRepositoryDdb implements SignalRepository {
  constructor(private readonly _dynamoClient: unknown) {}

  async listSensingSignals(input: Parameters<SignalRepository['listSensingSignals']>[0]): Promise<Awaited<ReturnType<SignalRepository['listSensingSignals']>>> {
    const raw = input as Record<string, unknown>;
    const tenantId = String(raw.orgId ?? 'tnt_demo');
    const items = listSignals(tenantId).map(publicSignal);
    return { data: { items }, ...responseMeta(String(raw.correlationId ?? '')) };
  }

  async createSensingSignal(input: Parameters<SignalRepository['createSensingSignal']>[0]): Promise<Awaited<ReturnType<SignalRepository['createSensingSignal']>>> {
    const raw = input as Record<string, unknown>;
    const tenantId = String(raw.orgId ?? 'tnt_demo');
    ensureProductSeeds(tenantId);
    const now = nowIso();
    const signalId = String(raw.id ?? sandboxId('sns'));
    const row: SandboxSignal = {
      signalId,
      tenantId,
      title: String(raw.title ?? ''),
      technologyArea: String(raw.technologyArea ?? ''),
      sourceUri: raw.sourceUri ? String(raw.sourceUri) : undefined,
      status: 'new',
      createdAt: now,
      updatedAt: now,
    };
    putSignal(row);
    return { data: publicSignal(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }

  async getSensingSignal(input: Parameters<SignalRepository['getSensingSignal']>[0]): Promise<Awaited<ReturnType<SignalRepository['getSensingSignal']>>> {
    const raw = input as Record<string, unknown>;
    ensureProductSeeds(String(raw.orgId ?? 'tnt_demo'));
    const row = signalsById.get(String(raw.signalId ?? ''));
    if (!row) return null as never;
    return { data: publicSignal(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }
}
