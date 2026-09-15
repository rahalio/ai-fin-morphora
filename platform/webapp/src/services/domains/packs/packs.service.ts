import { apiClient } from '@/services/shared/infrastructure/api-client';
import { asItems, unwrap } from '@/services/shared/http';

export type ExecPackStatus = 'draft' | 'published';

export type ExecPack = {
  packId: string;
  status: ExecPackStatus;
  periodLabel: string;
  narrative?: string;
  downloadUri?: string;
  shareToken?: string;
  stretchSqueezeNote?: string;
  spendMixNote?: string;
  concentrationNote?: string;
  challengerNote?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export const packsService = {
  async listPacks() {
    return asItems<ExecPack>(
      await unwrap(apiClient.get('/v0/tenants/me/packs')),
    );
  },

  createPack(body: {
    periodLabel: string;
    narrative?: string;
    stretchSqueezeNote?: string;
    spendMixNote?: string;
    concentrationNote?: string;
    challengerNote?: string;
  }) {
    return unwrap<ExecPack>(apiClient.post('/v0/tenants/me/packs', { body }));
  },

  publishPack(
    packId: string,
    body?: {
      narrative?: string;
      stretchSqueezeNote?: string;
      spendMixNote?: string;
      concentrationNote?: string;
      challengerNote?: string;
    },
  ) {
    return unwrap<ExecPack>(
      apiClient.post(`/v0/tenants/me/packs/${packId}/publish`, {
        body: body ?? {},
      }),
    );
  },
};
