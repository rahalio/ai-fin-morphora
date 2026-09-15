const ACCESS_TOKEN_KEY = 'morphora.auth.accessToken';
const REFRESH_TOKEN_KEY = 'morphora.auth.refreshToken';
const API_KEY_KEY = 'morphora.auth.apiKey';

export type AuthTokens = {
  accessToken: string;
  refreshToken?: string;
};

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function setAuthTokens(tokens: AuthTokens): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
  if (tokens.refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  }
}

export function getApiKey(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(API_KEY_KEY);
}

export function setApiKey(apiKey: string | null): void {
  if (typeof window === 'undefined') return;
  if (!apiKey) localStorage.removeItem(API_KEY_KEY);
  else localStorage.setItem(API_KEY_KEY, apiKey);
}

export function clearAuthTokens(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(API_KEY_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(getApiKey() || getAccessToken());
}
