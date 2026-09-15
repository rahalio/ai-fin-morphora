'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  clearAuthTokens,
  getAccessToken,
  getApiKey,
  isAuthenticated as checkAuth,
  setApiKey,
  setAuthTokens,
} from '@/services/shared/infrastructure/auth-tokens';
import { setEffectiveTenantId } from '@/services/shared/infrastructure/tenant-state';
import { identityService } from '@/services/domains/identity';

export type SessionOperator = {
  userId: string;
  email: string;
  displayName: string;
  role: string;
};

type AuthContextValue = {
  ready: boolean;
  authenticated: boolean;
  operator: SessionOperator | null;
  signInWithApiKey: (apiKey: string, tenantLabel?: string) => Promise<void>;
  signInWithPassword: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [operator, setOperator] = useState<SessionOperator | null>(null);

  useEffect(() => {
    const authed = checkAuth();
    setAuthenticated(authed);
    if (authed) {
      identityService
        .getOperatorMe()
        .then((me) => {
          setOperator({
            userId: me.operator.userId,
            email: me.operator.email,
            displayName: me.operator.displayName,
            role: me.operator.role,
          });
          if (me.tenant?.tenantId) setEffectiveTenantId(me.tenant.tenantId);
        })
        .catch(() => {
          /* session still valid via stored token/key */
        });
    }
    setReady(true);
  }, []);

  const signInWithApiKey = useCallback(async (apiKey: string, tenantLabel?: string) => {
    clearAuthTokens();
    setApiKey(apiKey.trim());
    if (tenantLabel) setEffectiveTenantId(tenantLabel);
    try {
      const me = await identityService.getOperatorMe();
      setOperator({
        userId: me.operator.userId,
        email: me.operator.email,
        displayName: me.operator.displayName,
        role: me.operator.role,
      });
      if (me.tenant?.tenantId) setEffectiveTenantId(me.tenant.tenantId);
    } catch {
      setOperator({
        userId: 'usr_api_key_demo',
        email: 'api-key@demo.local',
        displayName: 'Demo API key',
        role: 'admin',
      });
    }
    setAuthenticated(true);
  }, []);

  const signInWithPassword = useCallback(
    async (email: string, password: string) => {
      setApiKey(null);
      const data = await identityService.operatorLogin(email, password);
      setAuthTokens({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      setOperator({
        userId: data.operator.userId,
        email: data.operator.email,
        displayName: data.operator.displayName,
        role: data.operator.role,
      });
      setAuthenticated(true);
    },
    [],
  );

  const signOut = useCallback(() => {
    clearAuthTokens();
    setEffectiveTenantId(null);
    setOperator(null);
    setAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      ready,
      authenticated,
      operator,
      signInWithApiKey,
      signInWithPassword,
      signOut,
    }),
    [
      ready,
      authenticated,
      operator,
      signInWithApiKey,
      signInWithPassword,
      signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

/** Soft check without throwing — for root redirect. */
export function useAuthOptional() {
  return useContext(AuthContext);
}

export function hasStoredSession() {
  return Boolean(getApiKey() || getAccessToken());
}
