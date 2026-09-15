/**
 * PublishPublisherAdapter — sandbox publish via in-memory pack store.
 */

import type { PublishPublisher } from "@morphora/services/packs";
import {
  ensureProductSeeds,
  nowIso,
  packsById,
  putPack,
  publicPack,
  responseMeta,
  sandboxId,
} from "../_shared/sandbox-store.js";

export class PublishPublisherAdapter implements PublishPublisher {
  constructor(_http?: unknown) {}

  async publishExecPack(input: Parameters<PublishPublisher['publishExecPack']>[0]): Promise<Awaited<ReturnType<PublishPublisher['publishExecPack']>>> {
    const raw = input as Record<string, unknown>;
    const tenantId = String(raw.orgId ?? 'tnt_demo');
    ensureProductSeeds(tenantId);
    const packId = String(raw.packId ?? '');
    const row = packsById.get(packId);
    if (!row) return null as never;

    const now = nowIso();
    if (raw.narrative !== undefined) row.narrative = String(raw.narrative);
    if (raw.stretchSqueezeNote !== undefined) row.stretchSqueezeNote = String(raw.stretchSqueezeNote);
    if (raw.spendMixNote !== undefined) row.spendMixNote = String(raw.spendMixNote);
    if (raw.concentrationNote !== undefined) row.concentrationNote = String(raw.concentrationNote);
    if (raw.challengerNote !== undefined) row.challengerNote = String(raw.challengerNote);

    row.status = 'published';
    row.publishedAt = now;
    row.updatedAt = now;
    row.shareToken = row.shareToken ?? sandboxId('shr');
    row.downloadUri = row.downloadUri ?? `https://sandbox.local/packs/${packId}.pdf`;
    putPack(row);

    return { data: publicPack(row), ...responseMeta(String(raw.correlationId ?? '')) };
  }
}
