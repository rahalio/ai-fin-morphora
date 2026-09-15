import { apiClient } from '@/services/shared/infrastructure/api-client';
import { asItems, unwrap } from '@/services/shared/http';

export type PartnerCriticality = 'low' | 'medium' | 'high' | 'systemic';

export type Partner = {
  partnerId: string;
  name: string;
  partnerType: string;
  criticality: PartnerCriticality;
  concentrationScore?: number;
  spof: boolean;
  createdAt: string;
  updatedAt: string;
};

export const partnersService = {
  async listPartners() {
    return asItems<Partner>(
      await unwrap(apiClient.get('/v0/tenants/me/partners')),
    );
  },

  createPartner(body: {
    name: string;
    partnerType: string;
    criticality?: PartnerCriticality;
    concentrationScore?: number;
    spof?: boolean;
  }) {
    return unwrap<Partner>(
      apiClient.post('/v0/tenants/me/partners', { body }),
    );
  },

  setCriticality(
    partnerId: string,
    body: {
      criticality: PartnerCriticality;
      concentrationScore: number;
      spof?: boolean;
    },
  ) {
    return unwrap<Partner>(
      apiClient.put(`/v0/tenants/me/partners/${partnerId}/criticality`, {
        body,
      }),
    );
  },
};
