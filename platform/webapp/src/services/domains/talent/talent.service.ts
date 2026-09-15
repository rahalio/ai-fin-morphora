import { apiClient } from '@/services/shared/infrastructure/api-client';
import { asItems, unwrap } from '@/services/shared/http';

export type TalentSeverity = 'low' | 'medium' | 'high';

export type TalentGap = {
  gapId: string;
  roleName: string;
  coverage: number;
  relatedInitiativeId?: string;
  severity: TalentSeverity;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export const talentService = {
  async listGaps() {
    return asItems<TalentGap>(
      await unwrap(apiClient.get('/v0/tenants/me/talent/gaps')),
    );
  },

  createGap(body: {
    roleName: string;
    coverage: number;
    severity: TalentSeverity;
    relatedInitiativeId?: string;
    notes?: string;
  }) {
    return unwrap<TalentGap>(
      apiClient.post('/v0/tenants/me/talent/gaps', { body }),
    );
  },

  updateGap(
    gapId: string,
    body: {
      roleName?: string;
      coverage?: number;
      relatedInitiativeId?: string;
      severity?: TalentSeverity;
      notes?: string;
    },
  ) {
    return unwrap<TalentGap>(
      apiClient.patch(`/v0/tenants/me/talent/gaps/${gapId}`, { body }),
    );
  },
};
