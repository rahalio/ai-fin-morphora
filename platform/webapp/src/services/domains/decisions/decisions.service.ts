import { apiClient } from '@/services/shared/infrastructure/api-client';
import { asItems, unwrap } from '@/services/shared/http';

export type ShapeshifterRole =
  | 'strategist'
  | 'bridge'
  | 'ecosystem'
  | 'startup';

export type RoleRitualStatus = 'onTrack' | 'due' | 'overdue' | 'skipped';

export type DecisionRecord = {
  decisionId: string;
  decisionType: string;
  outcome: string;
  rationale: string;
  relatedEntityId?: string;
  relatedEntityType?: string;
  shapeshifterRole?: ShapeshifterRole;
  decidedAt: string;
  createdAt: string;
};

export type CadenceSummary = {
  dueDecisionCount: number;
  overdueDecisionCount: number;
  openSensingCount?: number;
  openShadowCaseCount?: number;
  roleRituals: Array<{
    role: ShapeshifterRole;
    ritualStatus: RoleRitualStatus;
    nextDueAt?: string;
    lastCompletedAt?: string;
  }>;
  generatedAt?: string;
};

export const decisionsService = {
  async listDecisions() {
    return asItems<DecisionRecord>(
      await unwrap(apiClient.get('/v0/tenants/me/decisions')),
    );
  },

  recordDecision(body: {
    decisionType: string;
    outcome: string;
    rationale: string;
    relatedEntityId?: string;
    relatedEntityType?: string;
    shapeshifterRole?: ShapeshifterRole;
    decidedAt?: string;
  }) {
    return unwrap<DecisionRecord>(
      apiClient.post('/v0/tenants/me/decisions', { body }),
    );
  },

  getCadenceSummary() {
    return unwrap<CadenceSummary>(
      apiClient.get('/v0/tenants/me/cadence/summary'),
    );
  },
};
