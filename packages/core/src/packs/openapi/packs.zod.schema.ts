import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createExecPack_Body = z
  .object({
    periodLabel: z.string().min(1).max(80),
    narrative: z.string().max(8000).optional(),
    stretchSqueezeNote: z.string().max(4000).optional(),
    spendMixNote: z.string().max(4000).optional(),
    concentrationNote: z.string().max(4000).optional(),
    challengerNote: z.string().max(4000).optional(),
  })
  .passthrough();
const publishExecPack_Body = z
  .object({
    narrative: z.string().max(8000),
    stretchSqueezeNote: z.string().max(4000),
    spendMixNote: z.string().max(4000),
    concentrationNote: z.string().max(4000),
    challengerNote: z.string().max(4000),
  })
  .partial()
  .passthrough();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const ExecPackId = z.string();
const ExecPackStatus = z.enum(['draft', 'published']);
const ExecPack = z
  .object({
    packId: z.string().regex(/^pck_[0-9a-hjkmnp-tv-z]{26}$/),
    status: z.enum(['draft', 'published']),
    periodLabel: z.string().min(1).max(80),
    narrative: z.string().max(8000).optional(),
    downloadUri: z.string().url().optional(),
    shareToken: z.string().max(128).optional(),
    stretchSqueezeNote: z.string().max(4000).optional(),
    spendMixNote: z.string().max(4000).optional(),
    concentrationNote: z.string().max(4000).optional(),
    challengerNote: z.string().max(4000).optional(),
    publishedAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ExecPackListData = z
  .object({
    items: z.array(
      z
        .object({
          packId: z.string().regex(/^pck_[0-9a-hjkmnp-tv-z]{26}$/),
          status: z.enum(['draft', 'published']),
          periodLabel: z.string().min(1).max(80),
          narrative: z.string().max(8000).optional(),
          downloadUri: z.string().url().optional(),
          shareToken: z.string().max(128).optional(),
          stretchSqueezeNote: z.string().max(4000).optional(),
          spendMixNote: z.string().max(4000).optional(),
          concentrationNote: z.string().max(4000).optional(),
          challengerNote: z.string().max(4000).optional(),
          publishedAt: z.string().datetime({ offset: true }).optional(),
          createdAt: z.string().datetime({ offset: true }),
          updatedAt: z.string().datetime({ offset: true }),
        })
        .passthrough()
    ),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const ExecPackListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              packId: z.string().regex(/^pck_[0-9a-hjkmnp-tv-z]{26}$/),
              status: z.enum(['draft', 'published']),
              periodLabel: z.string().min(1).max(80),
              narrative: z.string().max(8000).optional(),
              downloadUri: z.string().url().optional(),
              shareToken: z.string().max(128).optional(),
              stretchSqueezeNote: z.string().max(4000).optional(),
              spendMixNote: z.string().max(4000).optional(),
              concentrationNote: z.string().max(4000).optional(),
              challengerNote: z.string().max(4000).optional(),
              publishedAt: z.string().datetime({ offset: true }).optional(),
              createdAt: z.string().datetime({ offset: true }),
              updatedAt: z.string().datetime({ offset: true }),
            })
            .passthrough()
        ),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const ExecPackCreateRequest = z
  .object({
    periodLabel: z.string().min(1).max(80),
    narrative: z.string().max(8000).optional(),
    stretchSqueezeNote: z.string().max(4000).optional(),
    spendMixNote: z.string().max(4000).optional(),
    concentrationNote: z.string().max(4000).optional(),
    challengerNote: z.string().max(4000).optional(),
  })
  .passthrough();
const ExecPackResponse = z
  .object({
    data: z
      .object({
        packId: z.string().regex(/^pck_[0-9a-hjkmnp-tv-z]{26}$/),
        status: z.enum(['draft', 'published']),
        periodLabel: z.string().min(1).max(80),
        narrative: z.string().max(8000).optional(),
        downloadUri: z.string().url().optional(),
        shareToken: z.string().max(128).optional(),
        stretchSqueezeNote: z.string().max(4000).optional(),
        spendMixNote: z.string().max(4000).optional(),
        concentrationNote: z.string().max(4000).optional(),
        challengerNote: z.string().max(4000).optional(),
        publishedAt: z.string().datetime({ offset: true }).optional(),
        createdAt: z.string().datetime({ offset: true }),
        updatedAt: z.string().datetime({ offset: true }),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const PublishExecPackRequest = z
  .object({
    narrative: z.string().max(8000),
    stretchSqueezeNote: z.string().max(4000),
    spendMixNote: z.string().max(4000),
    concentrationNote: z.string().max(4000),
    challengerNote: z.string().max(4000),
  })
  .partial()
  .passthrough();

export const schemas: any = {
  createExecPack_Body,
  publishExecPack_Body,
  Problem,
  ExecPackId,
  ExecPackStatus,
  ExecPack,
  ExecPackListData,
  ResponseMeta,
  ExecPackListResponse,
  ExecPackCreateRequest,
  ExecPackResponse,
  PublishExecPackRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v0/tenants/me/packs',
    alias: 'listExecPacks',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  packId: z.string().regex(/^pck_[0-9a-hjkmnp-tv-z]{26}$/),
                  status: z.enum(['draft', 'published']),
                  periodLabel: z.string().min(1).max(80),
                  narrative: z.string().max(8000).optional(),
                  downloadUri: z.string().url().optional(),
                  shareToken: z.string().max(128).optional(),
                  stretchSqueezeNote: z.string().max(4000).optional(),
                  spendMixNote: z.string().max(4000).optional(),
                  concentrationNote: z.string().max(4000).optional(),
                  challengerNote: z.string().max(4000).optional(),
                  publishedAt: z.string().datetime({ offset: true }).optional(),
                  createdAt: z.string().datetime({ offset: true }),
                  updatedAt: z.string().datetime({ offset: true }),
                })
                .passthrough()
            ),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v0/tenants/me/packs',
    alias: 'createExecPack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createExecPack_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            packId: z.string().regex(/^pck_[0-9a-hjkmnp-tv-z]{26}$/),
            status: z.enum(['draft', 'published']),
            periodLabel: z.string().min(1).max(80),
            narrative: z.string().max(8000).optional(),
            downloadUri: z.string().url().optional(),
            shareToken: z.string().max(128).optional(),
            stretchSqueezeNote: z.string().max(4000).optional(),
            spendMixNote: z.string().max(4000).optional(),
            concentrationNote: z.string().max(4000).optional(),
            challengerNote: z.string().max(4000).optional(),
            publishedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'get',
    path: '/v0/tenants/me/packs/:packId',
    alias: 'getExecPack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'packId',
        type: 'Path',
        schema: z.string().regex(/^pck_[0-9a-hjkmnp-tv-z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            packId: z.string().regex(/^pck_[0-9a-hjkmnp-tv-z]{26}$/),
            status: z.enum(['draft', 'published']),
            periodLabel: z.string().min(1).max(80),
            narrative: z.string().max(8000).optional(),
            downloadUri: z.string().url().optional(),
            shareToken: z.string().max(128).optional(),
            stretchSqueezeNote: z.string().max(4000).optional(),
            spendMixNote: z.string().max(4000).optional(),
            concentrationNote: z.string().max(4000).optional(),
            challengerNote: z.string().max(4000).optional(),
            publishedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v0/tenants/me/packs/:packId/publish',
    alias: 'publishExecPack',
    description: `Transitions draft → published; conflicts if already published.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: publishExecPack_Body.optional(),
      },
      {
        name: 'packId',
        type: 'Path',
        schema: z.string().regex(/^pck_[0-9a-hjkmnp-tv-z]{26}$/),
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            packId: z.string().regex(/^pck_[0-9a-hjkmnp-tv-z]{26}$/),
            status: z.enum(['draft', 'published']),
            periodLabel: z.string().min(1).max(80),
            narrative: z.string().max(8000).optional(),
            downloadUri: z.string().url().optional(),
            shareToken: z.string().max(128).optional(),
            stretchSqueezeNote: z.string().max(4000).optional(),
            spendMixNote: z.string().max(4000).optional(),
            concentrationNote: z.string().max(4000).optional(),
            challengerNote: z.string().max(4000).optional(),
            publishedAt: z.string().datetime({ offset: true }).optional(),
            createdAt: z.string().datetime({ offset: true }),
            updatedAt: z.string().datetime({ offset: true }),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 400,
        description: `Malformed request`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
