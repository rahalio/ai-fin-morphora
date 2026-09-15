import { apiClient } from '@/services/shared/infrastructure/api-client';
import { asItems, unwrap } from '@/services/shared/http';

export type ShadowITCaseStatus = 'open' | 'remediating' | 'closed';
export type RemediationAction = 'mapToFootprint' | 'retire' | 'escalate';

export type ShadowITCase = {
  caseId: string;
  systemName: string;
  status: ShadowITCaseStatus;
  discoveredVia: string;
  remediationAction?: RemediationAction;
  footprintSystemId?: string;
  remediationNotes?: string;
  closedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export const casesService = {
  async listCases() {
    return asItems<ShadowITCase>(
      await unwrap(apiClient.get('/v0/tenants/me/cases/shadow-it')),
    );
  },

  createCase(body: { systemName: string; discoveredVia: string }) {
    return unwrap<ShadowITCase>(
      apiClient.post('/v0/tenants/me/cases/shadow-it', { body }),
    );
  },

  remediate(
    caseId: string,
    body: {
      action: RemediationAction;
      footprintSystemId?: string;
      notes?: string;
    },
  ) {
    return unwrap<ShadowITCase>(
      apiClient.put(`/v0/tenants/me/cases/shadow-it/${caseId}/remediate`, {
        body,
      }),
    );
  },
};
