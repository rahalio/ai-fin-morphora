const TENANT_ID_KEY = 'morphora.tenantId';

/** Optional tenant label for UI context (API scopes via X-API-Key / JWT). */
export function getEffectiveOrgId(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(TENANT_ID_KEY);
}

export function getEffectiveTenantId(): string | null {
  return getEffectiveOrgId();
}

export function setEffectiveOrgId(tenantId: string | null): void {
  if (typeof window === 'undefined') return;
  if (!tenantId) window.localStorage.removeItem(TENANT_ID_KEY);
  else window.localStorage.setItem(TENANT_ID_KEY, tenantId);
  window.dispatchEvent(new Event('tenant:orgId'));
}

export function setEffectiveTenantId(tenantId: string | null): void {
  setEffectiveOrgId(tenantId);
}
