import { apiClient } from '@/services/shared/infrastructure/api-client';
import { asItems, unwrap } from '@/services/shared/http';

export type HypeFilterOutcome = 'adopt' | 'watch' | 'reject';

export type SensingSignal = {
  signalId: string;
  title: string;
  technologyArea: string;
  sourceUri?: string;
  status: 'new' | 'assessing' | 'decided';
  decisionOutcome?: HypeFilterOutcome;
  decisionRationale?: string;
  decidedAt?: string;
  hypeAssessment?: {
    signalId: string;
    hypeScore?: number;
    recommendedOutcome?: HypeFilterOutcome;
    assessmentNotes?: string;
    assessedAt: string;
  };
  createdAt: string;
  updatedAt: string;
};

export const sensingService = {
  async listSignals() {
    return asItems<SensingSignal>(
      await unwrap(apiClient.get('/v0/tenants/me/sensing/signals')),
    );
  },

  createSignal(body: {
    title: string;
    technologyArea: string;
    sourceUri?: string;
  }) {
    return unwrap<SensingSignal>(
      apiClient.post('/v0/tenants/me/sensing/signals', { body }),
    );
  },

  getSignal(signalId: string) {
    return unwrap<SensingSignal>(
      apiClient.get(`/v0/tenants/me/sensing/signals/${signalId}`),
    );
  },

  upsertHypeAssessment(
    signalId: string,
    body: {
      hypeScore: number;
      recommendedOutcome?: HypeFilterOutcome;
      assessmentNotes?: string;
    },
  ) {
    return unwrap(
      apiClient.put(`/v0/tenants/me/sensing/signals/${signalId}/hype-assessment`, {
        body,
      }),
    );
  },

  stampDecision(
    signalId: string,
    body: { outcome: HypeFilterOutcome; rationale: string },
  ) {
    return unwrap<SensingSignal>(
      apiClient.post(`/v0/tenants/me/sensing/signals/${signalId}/decision`, {
        body,
      }),
    );
  },
};
