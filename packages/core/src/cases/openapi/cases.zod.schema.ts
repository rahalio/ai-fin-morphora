import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const openShadowITCase_Body = z
  .object({
    systemName: z.string().min(1).max(200),
    discoveredVia: z.string().min(1).max(200),
  })
  .passthrough();
const remediateShadowITCase_Body = z
  .object({
    action: z.enum(['mapToFootprint', 'retire', 'escalate']),
    footprintSystemId: z
      .string()
      .regex(/^ftp_[0-9a-hjkmnp-tv-z]{26}$/)
      .optional(),
    notes: z.string().max(4000).optional(),
  })
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
const ShadowITCaseId = z.string();
const ShadowITCaseStatus = z.enum(['open', 'remediating', 'closed']);
const RemediationAction = z.enum(['mapToFootprint', 'retire', 'escalate']);
const CoreSystemIdRef = z.string();
const ShadowITCase = z
  .object({
    caseId: z.string().regex(/^cse_[0-9a-hjkmnp-tv-z]{26}$/),
    systemName: z.string().min(1).max(200),
    status: z.enum(['open', 'remediating', 'closed']),
    discoveredVia: z.string().min(1).max(200),
    remediationAction: z
      .enum(['mapToFootprint', 'retire', 'escalate'])
      .optional(),
    footprintSystemId: z
      .string()
      .regex(/^ftp_[0-9a-hjkmnp-tv-z]{26}$/)
      .optional(),
    remediationNotes: z.string().max(4000).optional(),
    closedAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ShadowITCaseListData = z
  .object({
    items: z.array(
      z
        .object({
          caseId: z.string().regex(/^cse_[0-9a-hjkmnp-tv-z]{26}$/),
          systemName: z.string().min(1).max(200),
          status: z.enum(['open', 'remediating', 'closed']),
          discoveredVia: z.string().min(1).max(200),
          remediationAction: z
            .enum(['mapToFootprint', 'retire', 'escalate'])
            .optional(),
          footprintSystemId: z
            .string()
            .regex(/^ftp_[0-9a-hjkmnp-tv-z]{26}$/)
            .optional(),
          remediationNotes: z.string().max(4000).optional(),
          closedAt: z.string().datetime({ offset: true }).optional(),
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
const ShadowITCaseListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              caseId: z.string().regex(/^cse_[0-9a-hjkmnp-tv-z]{26}$/),
              systemName: z.string().min(1).max(200),
              status: z.enum(['open', 'remediating', 'closed']),
              discoveredVia: z.string().min(1).max(200),
              remediationAction: z
                .enum(['mapToFootprint', 'retire', 'escalate'])
                .optional(),
              footprintSystemId: z
                .string()
                .regex(/^ftp_[0-9a-hjkmnp-tv-z]{26}$/)
                .optional(),
              remediationNotes: z.string().max(4000).optional(),
              closedAt: z.string().datetime({ offset: true }).optional(),
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
const ShadowITCaseCreateRequest = z
  .object({
    systemName: z.string().min(1).max(200),
    discoveredVia: z.string().min(1).max(200),
  })
  .passthrough();
const ShadowITCaseResponse = z
  .object({
    data: z
      .object({
        caseId: z.string().regex(/^cse_[0-9a-hjkmnp-tv-z]{26}$/),
        systemName: z.string().min(1).max(200),
        status: z.enum(['open', 'remediating', 'closed']),
        discoveredVia: z.string().min(1).max(200),
        remediationAction: z
          .enum(['mapToFootprint', 'retire', 'escalate'])
          .optional(),
        footprintSystemId: z
          .string()
          .regex(/^ftp_[0-9a-hjkmnp-tv-z]{26}$/)
          .optional(),
        remediationNotes: z.string().max(4000).optional(),
        closedAt: z.string().datetime({ offset: true }).optional(),
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
const RemediateShadowITCaseRequest = z
  .object({
    action: z.enum(['mapToFootprint', 'retire', 'escalate']),
    footprintSystemId: z
      .string()
      .regex(/^ftp_[0-9a-hjkmnp-tv-z]{26}$/)
      .optional(),
    notes: z.string().max(4000).optional(),
  })
  .passthrough();

export const schemas: any = {
  openShadowITCase_Body,
  remediateShadowITCase_Body,
  Problem,
  ShadowITCaseId,
  ShadowITCaseStatus,
  RemediationAction,
  CoreSystemIdRef,
  ShadowITCase,
  ShadowITCaseListData,
  ResponseMeta,
  ShadowITCaseListResponse,
  ShadowITCaseCreateRequest,
  ShadowITCaseResponse,
  RemediateShadowITCaseRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v0/tenants/me/cases/shadow-it',
    alias: 'listShadowITCases',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  caseId: z.string().regex(/^cse_[0-9a-hjkmnp-tv-z]{26}$/),
                  systemName: z.string().min(1).max(200),
                  status: z.enum(['open', 'remediating', 'closed']),
                  discoveredVia: z.string().min(1).max(200),
                  remediationAction: z
                    .enum(['mapToFootprint', 'retire', 'escalate'])
                    .optional(),
                  footprintSystemId: z
                    .string()
                    .regex(/^ftp_[0-9a-hjkmnp-tv-z]{26}$/)
                    .optional(),
                  remediationNotes: z.string().max(4000).optional(),
                  closedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v0/tenants/me/cases/shadow-it',
    alias: 'openShadowITCase',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: openShadowITCase_Body,
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
            caseId: z.string().regex(/^cse_[0-9a-hjkmnp-tv-z]{26}$/),
            systemName: z.string().min(1).max(200),
            status: z.enum(['open', 'remediating', 'closed']),
            discoveredVia: z.string().min(1).max(200),
            remediationAction: z
              .enum(['mapToFootprint', 'retire', 'escalate'])
              .optional(),
            footprintSystemId: z
              .string()
              .regex(/^ftp_[0-9a-hjkmnp-tv-z]{26}$/)
              .optional(),
            remediationNotes: z.string().max(4000).optional(),
            closedAt: z.string().datetime({ offset: true }).optional(),
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
    path: '/v0/tenants/me/cases/shadow-it/:caseId',
    alias: 'getShadowITCase',
    requestFormat: 'json',
    parameters: [
      {
        name: 'caseId',
        type: 'Path',
        schema: z.string().regex(/^cse_[0-9a-hjkmnp-tv-z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            caseId: z.string().regex(/^cse_[0-9a-hjkmnp-tv-z]{26}$/),
            systemName: z.string().min(1).max(200),
            status: z.enum(['open', 'remediating', 'closed']),
            discoveredVia: z.string().min(1).max(200),
            remediationAction: z
              .enum(['mapToFootprint', 'retire', 'escalate'])
              .optional(),
            footprintSystemId: z
              .string()
              .regex(/^ftp_[0-9a-hjkmnp-tv-z]{26}$/)
              .optional(),
            remediationNotes: z.string().max(4000).optional(),
            closedAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'put',
    path: '/v0/tenants/me/cases/shadow-it/:caseId/remediate',
    alias: 'remediateShadowITCase',
    description: `Apply mapToFootprint, retire, or escalate. Optional footprintSystemId
when mapping into the dual-speed inventory.
`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: remediateShadowITCase_Body,
      },
      {
        name: 'caseId',
        type: 'Path',
        schema: z.string().regex(/^cse_[0-9a-hjkmnp-tv-z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            caseId: z.string().regex(/^cse_[0-9a-hjkmnp-tv-z]{26}$/),
            systemName: z.string().min(1).max(200),
            status: z.enum(['open', 'remediating', 'closed']),
            discoveredVia: z.string().min(1).max(200),
            remediationAction: z
              .enum(['mapToFootprint', 'retire', 'escalate'])
              .optional(),
            footprintSystemId: z
              .string()
              .regex(/^ftp_[0-9a-hjkmnp-tv-z]{26}$/)
              .optional(),
            remediationNotes: z.string().max(4000).optional(),
            closedAt: z.string().datetime({ offset: true }).optional(),
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
