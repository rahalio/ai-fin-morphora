import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const recordDecision_Body = z
  .object({
    decisionType: z.string().min(1).max(120),
    outcome: z.string().min(1).max(200),
    rationale: z.string().min(1).max(4000),
    relatedEntityId: z.string().max(64).optional(),
    relatedEntityType: z
      .enum([
        'sensingSignal',
        'coreSystem',
        'partner',
        'initiative',
        'talentGap',
        'execPack',
        'shadowITCase',
        'other',
      ])
      .optional(),
    shapeshifterRole: z
      .enum(['strategist', 'bridge', 'ecosystem', 'startup'])
      .optional(),
    decidedAt: z.string().datetime({ offset: true }).optional(),
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
const DecisionId = z.string();
const RelatedEntityType = z.enum([
  'sensingSignal',
  'coreSystem',
  'partner',
  'initiative',
  'talentGap',
  'execPack',
  'shadowITCase',
  'other',
]);
const ShapeshifterRole = z.enum([
  'strategist',
  'bridge',
  'ecosystem',
  'startup',
]);
const DecisionRecord = z
  .object({
    decisionId: z.string().regex(/^dec_[0-9a-hjkmnp-tv-z]{26}$/),
    decisionType: z.string().min(1).max(120),
    outcome: z.string().min(1).max(200),
    rationale: z.string().min(1).max(4000),
    relatedEntityId: z.string().max(64).optional(),
    relatedEntityType: z
      .enum([
        'sensingSignal',
        'coreSystem',
        'partner',
        'initiative',
        'talentGap',
        'execPack',
        'shadowITCase',
        'other',
      ])
      .optional(),
    shapeshifterRole: z
      .enum(['strategist', 'bridge', 'ecosystem', 'startup'])
      .optional(),
    decidedAt: z.string().datetime({ offset: true }),
    createdAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const DecisionRecordListData = z
  .object({
    items: z.array(
      z
        .object({
          decisionId: z.string().regex(/^dec_[0-9a-hjkmnp-tv-z]{26}$/),
          decisionType: z.string().min(1).max(120),
          outcome: z.string().min(1).max(200),
          rationale: z.string().min(1).max(4000),
          relatedEntityId: z.string().max(64).optional(),
          relatedEntityType: z
            .enum([
              'sensingSignal',
              'coreSystem',
              'partner',
              'initiative',
              'talentGap',
              'execPack',
              'shadowITCase',
              'other',
            ])
            .optional(),
          shapeshifterRole: z
            .enum(['strategist', 'bridge', 'ecosystem', 'startup'])
            .optional(),
          decidedAt: z.string().datetime({ offset: true }),
          createdAt: z.string().datetime({ offset: true }),
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
const DecisionRecordListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              decisionId: z.string().regex(/^dec_[0-9a-hjkmnp-tv-z]{26}$/),
              decisionType: z.string().min(1).max(120),
              outcome: z.string().min(1).max(200),
              rationale: z.string().min(1).max(4000),
              relatedEntityId: z.string().max(64).optional(),
              relatedEntityType: z
                .enum([
                  'sensingSignal',
                  'coreSystem',
                  'partner',
                  'initiative',
                  'talentGap',
                  'execPack',
                  'shadowITCase',
                  'other',
                ])
                .optional(),
              shapeshifterRole: z
                .enum(['strategist', 'bridge', 'ecosystem', 'startup'])
                .optional(),
              decidedAt: z.string().datetime({ offset: true }),
              createdAt: z.string().datetime({ offset: true }),
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
const DecisionRecordCreateRequest = z
  .object({
    decisionType: z.string().min(1).max(120),
    outcome: z.string().min(1).max(200),
    rationale: z.string().min(1).max(4000),
    relatedEntityId: z.string().max(64).optional(),
    relatedEntityType: z
      .enum([
        'sensingSignal',
        'coreSystem',
        'partner',
        'initiative',
        'talentGap',
        'execPack',
        'shadowITCase',
        'other',
      ])
      .optional(),
    shapeshifterRole: z
      .enum(['strategist', 'bridge', 'ecosystem', 'startup'])
      .optional(),
    decidedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const DecisionRecordResponse = z
  .object({
    data: z
      .object({
        decisionId: z.string().regex(/^dec_[0-9a-hjkmnp-tv-z]{26}$/),
        decisionType: z.string().min(1).max(120),
        outcome: z.string().min(1).max(200),
        rationale: z.string().min(1).max(4000),
        relatedEntityId: z.string().max(64).optional(),
        relatedEntityType: z
          .enum([
            'sensingSignal',
            'coreSystem',
            'partner',
            'initiative',
            'talentGap',
            'execPack',
            'shadowITCase',
            'other',
          ])
          .optional(),
        shapeshifterRole: z
          .enum(['strategist', 'bridge', 'ecosystem', 'startup'])
          .optional(),
        decidedAt: z.string().datetime({ offset: true }),
        createdAt: z.string().datetime({ offset: true }),
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
const RoleRitualStatus = z.enum(['onTrack', 'due', 'overdue', 'skipped']);
const RoleCadenceItem = z
  .object({
    role: z.enum(['strategist', 'bridge', 'ecosystem', 'startup']),
    ritualStatus: z.enum(['onTrack', 'due', 'overdue', 'skipped']),
    nextDueAt: z.string().datetime({ offset: true }).optional(),
    lastCompletedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const CadenceSummary = z
  .object({
    dueDecisionCount: z.number().int().gte(0),
    overdueDecisionCount: z.number().int().gte(0),
    openSensingCount: z.number().int().gte(0).optional(),
    openShadowCaseCount: z.number().int().gte(0).optional(),
    roleRituals: z.array(
      z
        .object({
          role: z.enum(['strategist', 'bridge', 'ecosystem', 'startup']),
          ritualStatus: z.enum(['onTrack', 'due', 'overdue', 'skipped']),
          nextDueAt: z.string().datetime({ offset: true }).optional(),
          lastCompletedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    generatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const CadenceSummaryResponse = z
  .object({
    data: z
      .object({
        dueDecisionCount: z.number().int().gte(0),
        overdueDecisionCount: z.number().int().gte(0),
        openSensingCount: z.number().int().gte(0).optional(),
        openShadowCaseCount: z.number().int().gte(0).optional(),
        roleRituals: z.array(
          z
            .object({
              role: z.enum(['strategist', 'bridge', 'ecosystem', 'startup']),
              ritualStatus: z.enum(['onTrack', 'due', 'overdue', 'skipped']),
              nextDueAt: z.string().datetime({ offset: true }).optional(),
              lastCompletedAt: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
        ),
        generatedAt: z.string().datetime({ offset: true }).optional(),
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

export const schemas: any = {
  recordDecision_Body,
  Problem,
  DecisionId,
  RelatedEntityType,
  ShapeshifterRole,
  DecisionRecord,
  DecisionRecordListData,
  ResponseMeta,
  DecisionRecordListResponse,
  DecisionRecordCreateRequest,
  DecisionRecordResponse,
  RoleRitualStatus,
  RoleCadenceItem,
  CadenceSummary,
  CadenceSummaryResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v0/tenants/me/cadence/summary',
    alias: 'getCadenceSummary',
    description: `Stub aggregate for due decisions and shapeshifter role ritual status.
`,
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            dueDecisionCount: z.number().int().gte(0),
            overdueDecisionCount: z.number().int().gte(0),
            openSensingCount: z.number().int().gte(0).optional(),
            openShadowCaseCount: z.number().int().gte(0).optional(),
            roleRituals: z.array(
              z
                .object({
                  role: z.enum([
                    'strategist',
                    'bridge',
                    'ecosystem',
                    'startup',
                  ]),
                  ritualStatus: z.enum([
                    'onTrack',
                    'due',
                    'overdue',
                    'skipped',
                  ]),
                  nextDueAt: z.string().datetime({ offset: true }).optional(),
                  lastCompletedAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
                })
                .passthrough()
            ),
            generatedAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'get',
    path: '/v0/tenants/me/decisions',
    alias: 'listDecisions',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  decisionId: z.string().regex(/^dec_[0-9a-hjkmnp-tv-z]{26}$/),
                  decisionType: z.string().min(1).max(120),
                  outcome: z.string().min(1).max(200),
                  rationale: z.string().min(1).max(4000),
                  relatedEntityId: z.string().max(64).optional(),
                  relatedEntityType: z
                    .enum([
                      'sensingSignal',
                      'coreSystem',
                      'partner',
                      'initiative',
                      'talentGap',
                      'execPack',
                      'shadowITCase',
                      'other',
                    ])
                    .optional(),
                  shapeshifterRole: z
                    .enum(['strategist', 'bridge', 'ecosystem', 'startup'])
                    .optional(),
                  decidedAt: z.string().datetime({ offset: true }),
                  createdAt: z.string().datetime({ offset: true }),
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
    path: '/v0/tenants/me/decisions',
    alias: 'recordDecision',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: recordDecision_Body,
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
            decisionId: z.string().regex(/^dec_[0-9a-hjkmnp-tv-z]{26}$/),
            decisionType: z.string().min(1).max(120),
            outcome: z.string().min(1).max(200),
            rationale: z.string().min(1).max(4000),
            relatedEntityId: z.string().max(64).optional(),
            relatedEntityType: z
              .enum([
                'sensingSignal',
                'coreSystem',
                'partner',
                'initiative',
                'talentGap',
                'execPack',
                'shadowITCase',
                'other',
              ])
              .optional(),
            shapeshifterRole: z
              .enum(['strategist', 'bridge', 'ecosystem', 'startup'])
              .optional(),
            decidedAt: z.string().datetime({ offset: true }),
            createdAt: z.string().datetime({ offset: true }),
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
    path: '/v0/tenants/me/decisions/:decisionId',
    alias: 'getDecision',
    requestFormat: 'json',
    parameters: [
      {
        name: 'decisionId',
        type: 'Path',
        schema: z.string().regex(/^dec_[0-9a-hjkmnp-tv-z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            decisionId: z.string().regex(/^dec_[0-9a-hjkmnp-tv-z]{26}$/),
            decisionType: z.string().min(1).max(120),
            outcome: z.string().min(1).max(200),
            rationale: z.string().min(1).max(4000),
            relatedEntityId: z.string().max(64).optional(),
            relatedEntityType: z
              .enum([
                'sensingSignal',
                'coreSystem',
                'partner',
                'initiative',
                'talentGap',
                'execPack',
                'shadowITCase',
                'other',
              ])
              .optional(),
            shapeshifterRole: z
              .enum(['strategist', 'bridge', 'ecosystem', 'startup'])
              .optional(),
            decidedAt: z.string().datetime({ offset: true }),
            createdAt: z.string().datetime({ offset: true }),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
