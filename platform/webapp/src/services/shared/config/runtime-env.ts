export type RuntimeEnv = {
  API_BASE_URL?: string;
  SANDBOX?: boolean | string;
};

function readWindowEnv(): RuntimeEnv | null {
  if (typeof window === 'undefined') return null;
  const env = (window as unknown as { env?: RuntimeEnv }).env;
  if (!env || typeof env !== 'object') return null;
  return env;
}

export function getApiBaseUrl(): string {
  if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_BASE_URL) {
    const v = process.env.NEXT_PUBLIC_API_BASE_URL.trim();
    if (v) return v;
  }
  if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL) {
    const v = process.env.NEXT_PUBLIC_API_URL.trim();
    if (v) return v;
  }
  const fromWindow = readWindowEnv()?.API_BASE_URL;
  if (typeof fromWindow === 'string' && fromWindow.trim()) return fromWindow.trim();
  return 'http://127.0.0.1:4000';
}

export function isSandboxMode(): boolean {
  if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SANDBOX) {
    const v = String(process.env.NEXT_PUBLIC_SANDBOX).trim().toLowerCase();
    return ['1', 'true', 'yes', 'on'].includes(v);
  }
  const fromWindow = readWindowEnv()?.SANDBOX;
  if (typeof fromWindow === 'boolean') return fromWindow;
  if (typeof fromWindow === 'string') {
    return ['1', 'true', 'yes', 'on'].includes(fromWindow.trim().toLowerCase());
  }
  return true;
}
