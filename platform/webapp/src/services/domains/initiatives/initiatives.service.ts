import { apiClient } from '@/services/shared/infrastructure/api-client';
import { asItems, unwrap } from '@/services/shared/http';

export type InitiativeStatus = 'experiment' | 'scale' | 'killed';
export type SourcingChoice =
  | 'build'
  | 'buy'
  | 'rent'
  | 'partner'
  | 'undecided';
export type ShapeshifterRole =
  | 'strategist'
  | 'bridge'
  | 'ecosystem'
  | 'startup';

export type ChallengerInitiative = {
  initiativeId: string;
  name: string;
  status: InitiativeStatus;
  role: ShapeshifterRole;
  sourcing: SourcingChoice;
  killMetric?: string;
  daysInLab?: number;
  sensingSignalId?: string;
  sponsorName?: string;
  sourcingRationale?: string;
  killRationale?: string;
  scaleRationale?: string;
  createdAt: string;
  updatedAt: string;
};

export const initiativesService = {
  async listInitiatives() {
    return asItems<ChallengerInitiative>(
      await unwrap(apiClient.get('/v0/tenants/me/initiatives')),
    );
  },

  createInitiative(body: {
    name: string;
    role: ShapeshifterRole;
    killMetric?: string;
    sensingSignalId?: string;
    sponsorName?: string;
  }) {
    return unwrap<ChallengerInitiative>(
      apiClient.post('/v0/tenants/me/initiatives', { body }),
    );
  },

  setSourcing(
    initiativeId: string,
    body: {
      sourcing: Exclude<SourcingChoice, 'undecided'>;
      rationale?: string;
    },
  ) {
    return unwrap<ChallengerInitiative>(
      apiClient.put(`/v0/tenants/me/initiatives/${initiativeId}/sourcing`, {
        body,
      }),
    );
  },

  kill(initiativeId: string, body: { rationale: string }) {
    return unwrap<ChallengerInitiative>(
      apiClient.put(`/v0/tenants/me/initiatives/${initiativeId}/kill`, {
        body,
      }),
    );
  },

  scale(initiativeId: string, body: { rationale: string }) {
    return unwrap<ChallengerInitiative>(
      apiClient.put(`/v0/tenants/me/initiatives/${initiativeId}/scale`, {
        body,
      }),
    );
  },
};
