import { apiClient } from '@/services/shared/infrastructure/api-client';
import { asItems, unwrap } from '@/services/shared/http';

export type SpeedTag = 'runCareful' | 'changeFast';
export type Disposition =
  | 'modernise'
  | 'adapt'
  | 'replace'
  | 'retire'
  | 'undecided';

export type CoreSystem = {
  systemId: string;
  name: string;
  speedTag: SpeedTag;
  disposition: Disposition;
  dispositionRationale?: string;
  runSpendShare?: number;
  sloCompliance?: number;
  couplingWarning?: boolean;
  createdAt: string;
  updatedAt: string;
};

export const footprintService = {
  async listSystems() {
    return asItems<CoreSystem>(
      await unwrap(apiClient.get('/v0/tenants/me/footprint/systems')),
    );
  },

  createSystem(body: {
    name: string;
    speedTag: SpeedTag;
    runSpendShare?: number;
    sloCompliance?: number;
    couplingWarning?: boolean;
  }) {
    return unwrap<CoreSystem>(
      apiClient.post('/v0/tenants/me/footprint/systems', { body }),
    );
  },

  setDisposition(
    systemId: string,
    body: {
      disposition: Exclude<Disposition, 'undecided'>;
      rationale?: string;
    },
  ) {
    return unwrap<CoreSystem>(
      apiClient.put(`/v0/tenants/me/footprint/systems/${systemId}/disposition`, {
        body,
      }),
    );
  },

  setSpeedTag(systemId: string, body: { speedTag: SpeedTag }) {
    return unwrap<CoreSystem>(
      apiClient.put(`/v0/tenants/me/footprint/systems/${systemId}/speed-tag`, {
        body,
      }),
    );
  },
};
