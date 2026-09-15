import { apiClient } from '@/services/shared/infrastructure/api-client';
import { asItems, unwrap } from '@/services/shared/http';

export type OperatorMe = {
  operator: {
    userId: string;
    email: string;
    displayName: string;
    role: string;
  };
  tenant?: {
    tenantId?: string;
    displayNameEn?: string;
    displayNameAr?: string;
  };
};

export type AuthTokensPayload = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  operator: {
    userId: string;
    email: string;
    displayName: string;
    role: string;
  };
};

export const identityService = {
  operatorLogin(email: string, password: string) {
    return unwrap<AuthTokensPayload>(
      apiClient.post('/v0/auth/login', { body: { email, password } }),
    );
  },

  getOperatorMe() {
    return unwrap<OperatorMe>(apiClient.get('/v0/auth/me'));
  },

  async listApiKeys() {
    return asItems(await unwrap(apiClient.get('/v0/tenants/me/api-keys')));
  },

  logout() {
    return unwrap<Record<string, unknown>>(apiClient.post('/v0/auth/logout'));
  },
};
