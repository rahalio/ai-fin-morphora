import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createChallengerInitiative_Body = z
  .object({
    name: z.string().min(1).max(200),
    role: z.enum(['strategist', 'bridge', 'ecosystem', 'startup']),
    killMetric: z.string().max(500).optional(),
    sensingSignalId: z
      .string()
      .regex(/^sns_[0-9a-hjkmnp-tv-z]{26}$/)
      .optional(),
    sponsorName: z.string().max(120).optional(),
  })
  .passthrough();
const setInitiativeSourcing_Body = z
  .object({
    sourcing: z.enum(['build', 'buy', 'rent', 'partner']),
    rationale: z.string().max(4000).optional(),
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
const InitiativeId = z.string();
const InitiativeStatus = z.enum(['experiment', 'scale', 'killed']);
const ShapeshifterRole = z.enum([
  'strategist',
  'bridge',
  'ecosystem',
  'startup',
]);
const SourcingChoice = z.enum(['build', 'buy', 'rent', 'partner', 'undecided']);
const SensingSignalIdRef = z.string();
const ChallengerInitiative = z
  .object({
    initiativeId: z.string().regex(/^ini_[0-9a-hjkmnp-tv-z]{26}$/),
    name: z.string().min(1).max(200),
    status: z.enum(['experiment', 'scale', 'killed']),
    role: z.enum(['strategist', 'bridge', 'ecosystem', 'startup']),
    sourcing: z.enum(['build', 'buy', 'rent', 'partner', 'undecided']),
    killMetric: z.string().max(500).optional(),
    daysInLab: z.number().int().gte(0).optional(),
    sensingSignalId: z
      .string()
      .regex(/^sns_[0-9a-hjkmnp-tv-z]{26}$/)
      .optional(),
    sponsorName: z.string().max(120).optional(),
    sourcingRationale: z.string().max(4000).optional(),
    killRationale: z.string().max(4000).optional(),
    scaleRationale: z.string().max(4000).optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const ChallengerInitiativeListData = z
  .object({
    items: z.array(
      z
        .object({
          initiativeId: z.string().regex(/^ini_[0-9a-hjkmnp-tv-z]{26}$/),
          name: z.string().min(1).max(200),
          status: z.enum(['experiment', 'scale', 'killed']),
          role: z.enum(['strategist', 'bridge', 'ecosystem', 'startup']),
          sourcing: z.enum(['build', 'buy', 'rent', 'partner', 'undecided']),
          killMetric: z.string().max(500).optional(),
          daysInLab: z.number().int().gte(0).optional(),
          sensingSignalId: z
            .string()
            .regex(/^sns_[0-9a-hjkmnp-tv-z]{26}$/)
            .optional(),
          sponsorName: z.string().max(120).optional(),
          sourcingRationale: z.string().max(4000).optional(),
          killRationale: z.string().max(4000).optional(),
          scaleRationale: z.string().max(4000).optional(),
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
const ChallengerInitiativeListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              initiativeId: z.string().regex(/^ini_[0-9a-hjkmnp-tv-z]{26}$/),
              name: z.string().min(1).max(200),
              status: z.enum(['experiment', 'scale', 'killed']),
              role: z.enum(['strategist', 'bridge', 'ecosystem', 'startup']),
              sourcing: z.enum([
                'build',
                'buy',
                'rent',
                'partner',
                'undecided',
              ]),
              killMetric: z.string().max(500).optional(),
              daysInLab: z.number().int().gte(0).optional(),
              sensingSignalId: z
                .string()
                .regex(/^sns_[0-9a-hjkmnp-tv-z]{26}$/)
                .optional(),
              sponsorName: z.string().max(120).optional(),
              sourcingRationale: z.string().max(4000).optional(),
              killRationale: z.string().max(4000).optional(),
              scaleRationale: z.string().max(4000).optional(),
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
const ChallengerInitiativeCreateRequest = z
  .object({
    name: z.string().min(1).max(200),
    role: z.enum(['strategist', 'bridge', 'ecosystem', 'startup']),
    killMetric: z.string().max(500).optional(),
    sensingSignalId: z
      .string()
      .regex(/^sns_[0-9a-hjkmnp-tv-z]{26}$/)
      .optional(),
    sponsorName: z.string().max(120).optional(),
  })
  .passthrough();
const ChallengerInitiativeResponse = z
  .object({
    data: z
      .object({
        initiativeId: z.string().regex(/^ini_[0-9a-hjkmnp-tv-z]{26}$/),
        name: z.string().min(1).max(200),
        status: z.enum(['experiment', 'scale', 'killed']),
        role: z.enum(['strategist', 'bridge', 'ecosystem', 'startup']),
        sourcing: z.enum(['build', 'buy', 'rent', 'partner', 'undecided']),
        killMetric: z.string().max(500).optional(),
        daysInLab: z.number().int().gte(0).optional(),
        sensingSignalId: z
          .string()
          .regex(/^sns_[0-9a-hjkmnp-tv-z]{26}$/)
          .optional(),
        sponsorName: z.string().max(120).optional(),
        sourcingRationale: z.string().max(4000).optional(),
        killRationale: z.string().max(4000).optional(),
        scaleRationale: z.string().max(4000).optional(),
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
const SourcingUpdateRequest = z
  .object({
    sourcing: z.enum(['build', 'buy', 'rent', 'partner']),
    rationale: z.string().max(4000).optional(),
  })
  .passthrough();
const KillInitiativeRequest = z
  .object({ rationale: z.string().min(1).max(4000) })
  .passthrough();
const ScaleInitiativeRequest = z
  .object({ rationale: z.string().min(1).max(4000) })
  .passthrough();

export const schemas: any = {
  createChallengerInitiative_Body,
  setInitiativeSourcing_Body,
  Problem,
  InitiativeId,
  InitiativeStatus,
  ShapeshifterRole,
  SourcingChoice,
  SensingSignalIdRef,
  ChallengerInitiative,
  ChallengerInitiativeListData,
  ResponseMeta,
  ChallengerInitiativeListResponse,
  ChallengerInitiativeCreateRequest,
  ChallengerInitiativeResponse,
  SourcingUpdateRequest,
  KillInitiativeRequest,
  ScaleInitiativeRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v0/tenants/me/initiatives',
    alias: 'listChallengerInitiatives',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  initiativeId: z
                    .string()
                    .regex(/^ini_[0-9a-hjkmnp-tv-z]{26}$/),
                  name: z.string().min(1).max(200),
                  status: z.enum(['experiment', 'scale', 'killed']),
                  role: z.enum([
                    'strategist',
                    'bridge',
                    'ecosystem',
                    'startup',
                  ]),
                  sourcing: z.enum([
                    'build',
                    'buy',
                    'rent',
                    'partner',
                    'undecided',
                  ]),
                  killMetric: z.string().max(500).optional(),
                  daysInLab: z.number().int().gte(0).optional(),
                  sensingSignalId: z
                    .string()
                    .regex(/^sns_[0-9a-hjkmnp-tv-z]{26}$/)
                    .optional(),
                  sponsorName: z.string().max(120).optional(),
                  sourcingRationale: z.string().max(4000).optional(),
                  killRationale: z.string().max(4000).optional(),
                  scaleRationale: z.string().max(4000).optional(),
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
    path: '/v0/tenants/me/initiatives',
    alias: 'createChallengerInitiative',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createChallengerInitiative_Body,
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
            initiativeId: z.string().regex(/^ini_[0-9a-hjkmnp-tv-z]{26}$/),
            name: z.string().min(1).max(200),
            status: z.enum(['experiment', 'scale', 'killed']),
            role: z.enum(['strategist', 'bridge', 'ecosystem', 'startup']),
            sourcing: z.enum(['build', 'buy', 'rent', 'partner', 'undecided']),
            killMetric: z.string().max(500).optional(),
            daysInLab: z.number().int().gte(0).optional(),
            sensingSignalId: z
              .string()
              .regex(/^sns_[0-9a-hjkmnp-tv-z]{26}$/)
              .optional(),
            sponsorName: z.string().max(120).optional(),
            sourcingRationale: z.string().max(4000).optional(),
            killRationale: z.string().max(4000).optional(),
            scaleRationale: z.string().max(4000).optional(),
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
    path: '/v0/tenants/me/initiatives/:initiativeId',
    alias: 'getChallengerInitiative',
    requestFormat: 'json',
    parameters: [
      {
        name: 'initiativeId',
        type: 'Path',
        schema: z.string().regex(/^ini_[0-9a-hjkmnp-tv-z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            initiativeId: z.string().regex(/^ini_[0-9a-hjkmnp-tv-z]{26}$/),
            name: z.string().min(1).max(200),
            status: z.enum(['experiment', 'scale', 'killed']),
            role: z.enum(['strategist', 'bridge', 'ecosystem', 'startup']),
            sourcing: z.enum(['build', 'buy', 'rent', 'partner', 'undecided']),
            killMetric: z.string().max(500).optional(),
            daysInLab: z.number().int().gte(0).optional(),
            sensingSignalId: z
              .string()
              .regex(/^sns_[0-9a-hjkmnp-tv-z]{26}$/)
              .optional(),
            sponsorName: z.string().max(120).optional(),
            sourcingRationale: z.string().max(4000).optional(),
            killRationale: z.string().max(4000).optional(),
            scaleRationale: z.string().max(4000).optional(),
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
    path: '/v0/tenants/me/initiatives/:initiativeId/kill',
    alias: 'killInitiative',
    description: `Sets status to killed with immutable rationale for the ritual.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({ rationale: z.string().min(1).max(4000) })
          .passthrough(),
      },
      {
        name: 'initiativeId',
        type: 'Path',
        schema: z.string().regex(/^ini_[0-9a-hjkmnp-tv-z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            initiativeId: z.string().regex(/^ini_[0-9a-hjkmnp-tv-z]{26}$/),
            name: z.string().min(1).max(200),
            status: z.enum(['experiment', 'scale', 'killed']),
            role: z.enum(['strategist', 'bridge', 'ecosystem', 'startup']),
            sourcing: z.enum(['build', 'buy', 'rent', 'partner', 'undecided']),
            killMetric: z.string().max(500).optional(),
            daysInLab: z.number().int().gte(0).optional(),
            sensingSignalId: z
              .string()
              .regex(/^sns_[0-9a-hjkmnp-tv-z]{26}$/)
              .optional(),
            sponsorName: z.string().max(120).optional(),
            sourcingRationale: z.string().max(4000).optional(),
            killRationale: z.string().max(4000).optional(),
            scaleRationale: z.string().max(4000).optional(),
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
  {
    method: 'put',
    path: '/v0/tenants/me/initiatives/:initiativeId/scale',
    alias: 'scaleInitiative',
    description: `Sets status to scale with rationale.`,
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z
          .object({ rationale: z.string().min(1).max(4000) })
          .passthrough(),
      },
      {
        name: 'initiativeId',
        type: 'Path',
        schema: z.string().regex(/^ini_[0-9a-hjkmnp-tv-z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            initiativeId: z.string().regex(/^ini_[0-9a-hjkmnp-tv-z]{26}$/),
            name: z.string().min(1).max(200),
            status: z.enum(['experiment', 'scale', 'killed']),
            role: z.enum(['strategist', 'bridge', 'ecosystem', 'startup']),
            sourcing: z.enum(['build', 'buy', 'rent', 'partner', 'undecided']),
            killMetric: z.string().max(500).optional(),
            daysInLab: z.number().int().gte(0).optional(),
            sensingSignalId: z
              .string()
              .regex(/^sns_[0-9a-hjkmnp-tv-z]{26}$/)
              .optional(),
            sponsorName: z.string().max(120).optional(),
            sourcingRationale: z.string().max(4000).optional(),
            killRationale: z.string().max(4000).optional(),
            scaleRationale: z.string().max(4000).optional(),
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
  {
    method: 'put',
    path: '/v0/tenants/me/initiatives/:initiativeId/sourcing',
    alias: 'setInitiativeSourcing',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: setInitiativeSourcing_Body,
      },
      {
        name: 'initiativeId',
        type: 'Path',
        schema: z.string().regex(/^ini_[0-9a-hjkmnp-tv-z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            initiativeId: z.string().regex(/^ini_[0-9a-hjkmnp-tv-z]{26}$/),
            name: z.string().min(1).max(200),
            status: z.enum(['experiment', 'scale', 'killed']),
            role: z.enum(['strategist', 'bridge', 'ecosystem', 'startup']),
            sourcing: z.enum(['build', 'buy', 'rent', 'partner', 'undecided']),
            killMetric: z.string().max(500).optional(),
            daysInLab: z.number().int().gte(0).optional(),
            sensingSignalId: z
              .string()
              .regex(/^sns_[0-9a-hjkmnp-tv-z]{26}$/)
              .optional(),
            sponsorName: z.string().max(120).optional(),
            sourcingRationale: z.string().max(4000).optional(),
            killRationale: z.string().max(4000).optional(),
            scaleRationale: z.string().max(4000).optional(),
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
