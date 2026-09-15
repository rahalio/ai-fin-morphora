import { getApiBaseUrl } from '@/services/shared/config/runtime-env';
import {
  clearAuthTokens,
  getAccessToken,
  getApiKey,
  getRefreshToken,
  setAuthTokens,
} from './auth-tokens';

export type ApiRequestParams = Record<
  string,
  string | number | boolean | null | undefined
>;

export interface ApiRequestOptions {
  params?: ApiRequestParams;
  headers?: HeadersInit;
  body?: unknown;
  signal?: AbortSignal;
  /** When true, auto-send Idempotency-Key for mutations */
  idempotent?: boolean;
}

export interface ApiResult<T> {
  data: T;
  status: number;
  headers: Headers;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

function buildQuery(params?: ApiRequestParams): string {
  if (!params) return '';
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    search.set(key, String(value));
  }
  const q = search.toString();
  return q ? `?${q}` : '';
}

function joinUrl(baseUrl: string, path: string): string {
  const b = baseUrl.replace(/\/+$/, '');
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${b}${p}`;
}

function isPassthroughBody(body: unknown): body is BodyInit {
  return (
    (typeof FormData !== 'undefined' && body instanceof FormData) ||
    (typeof Blob !== 'undefined' && body instanceof Blob) ||
    (typeof URLSearchParams !== 'undefined' && body instanceof URLSearchParams) ||
    (typeof ArrayBuffer !== 'undefined' && body instanceof ArrayBuffer)
  );
}

function newIdempotencyKey(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `idem_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

type DataEnvelope<T> = { data: T };

async function refreshAccessToken(baseUrl: string): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken || !baseUrl) return null;

  const res = await fetch(joinUrl(baseUrl, '/v0/auth/refresh'), {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    clearAuthTokens();
    return null;
  }

  const json = (await res.json()) as DataEnvelope<{
    accessToken?: string;
    token?: string;
    refreshToken?: string;
  }>;

  const next = json?.data?.accessToken ?? json?.data?.token ?? null;
  if (!next) return null;

  setAuthTokens({
    accessToken: next,
    refreshToken: json?.data?.refreshToken ?? refreshToken,
  });
  return next;
}

export class ApiClient {
  constructor(private readonly baseUrl: string) {}

  async request<T>(
    method: HttpMethod,
    path: string,
    options: ApiRequestOptions = {},
  ): Promise<ApiResult<T>> {
    const normalizedPath = path.replace(/\/{2,}/g, '/');
    const url = joinUrl(
      this.baseUrl,
      `${normalizedPath}${buildQuery(options.params)}`,
    );
    const headers = new Headers(options.headers);
    headers.set('Accept', headers.get('Accept') ?? 'application/json');

    const apiKey = getApiKey();
    if (apiKey && !headers.get('X-API-Key')) {
      headers.set('X-API-Key', apiKey);
    }

    const accessToken = getAccessToken();
    if (accessToken && !headers.get('Authorization')) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    const mutating = method === 'POST' || method === 'PUT' || method === 'PATCH';
    if ((options.idempotent ?? mutating) && !headers.get('Idempotency-Key')) {
      headers.set('Idempotency-Key', newIdempotencyKey());
    }

    let body: BodyInit | undefined;
    if (options.body !== undefined) {
      if (isPassthroughBody(options.body)) {
        body = options.body;
      } else {
        headers.set(
          'Content-Type',
          headers.get('Content-Type') ?? 'application/json',
        );
        body = JSON.stringify(options.body);
      }
    }

    let res = await fetch(url, {
      method,
      headers,
      body,
      signal: options.signal,
    });

    if (res.status === 401 && getRefreshToken()) {
      const next = await refreshAccessToken(this.baseUrl);
      if (next) {
        headers.set('Authorization', `Bearer ${next}`);
        res = await fetch(url, {
          method,
          headers,
          body,
          signal: options.signal,
        });
      }
    }

    const contentType = res.headers.get('content-type') ?? '';
    const isJson = contentType.includes('application/json');

    let data: T;
    if (isJson) {
      data = (await res.json()) as T;
    } else {
      data = (await res.text()) as T;
    }

    if (!res.ok) {
      const err = new Error(
        `Request failed (${res.status}) ${method} ${path}`,
      ) as Error & { status?: number; data?: unknown };
      err.status = res.status;
      err.data = data;
      throw err;
    }

    return { data, status: res.status, headers: res.headers };
  }

  get<T>(path: string, options?: Omit<ApiRequestOptions, 'body'>) {
    return this.request<T>('GET', path, options);
  }

  post<T>(path: string, options?: ApiRequestOptions) {
    return this.request<T>('POST', path, options);
  }

  put<T>(path: string, options?: ApiRequestOptions) {
    return this.request<T>('PUT', path, options);
  }

  patch<T>(path: string, options?: ApiRequestOptions) {
    return this.request<T>('PATCH', path, options);
  }

  delete<T>(path: string, options?: Omit<ApiRequestOptions, 'body'>) {
    return this.request<T>('DELETE', path, options);
  }
}

export const apiClient = new ApiClient(getApiBaseUrl());
