import { unwrapDataEnvelope } from '@/services/shared/contracts';

export type ProblemLike = {
  title?: string;
  detail?: string;
  status?: number;
  type?: string;
};

export function formatProblem(err: unknown): string {
  if (!(err instanceof Error)) return 'Unexpected error';
  const data = (err as Error & { data?: ProblemLike | { data?: ProblemLike } })
    .data;
  const problem =
    data && typeof data === 'object' && 'detail' in data
      ? (data as ProblemLike)
      : data && typeof data === 'object' && 'data' in data
        ? (data as { data?: ProblemLike }).data
        : undefined;
  if (problem?.detail || problem?.title) {
    return [problem.title, problem.detail].filter(Boolean).join(' — ');
  }
  return err.message;
}

export async function unwrap<T>(
  promise: Promise<{ data: unknown }>,
): Promise<T> {
  const res = await promise;
  return unwrapDataEnvelope(res.data) as T;
}

export function asItems<T = Record<string, unknown>>(data: unknown): T[] {
  if (Array.isArray(data)) return data as T[];
  if (
    data &&
    typeof data === 'object' &&
    Array.isArray((data as { items?: unknown }).items)
  ) {
    return (data as { items: T[] }).items;
  }
  return [];
}
