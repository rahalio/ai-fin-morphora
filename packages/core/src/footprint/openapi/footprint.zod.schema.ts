import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createCoreSystem_Body = z
  .object({
    name: z.string().min(1).max(200),
    speedTag: z.enum(['runCareful', 'changeFast']),
    runSpendShare: z.number().gte(0).lte(1).optional(),
    sloCompliance: z.number().gte(0).lte(1).optional(),
    couplingWarning: z.boolean().optional(),
  })
  .passthrough();
const setCoreSystemDisposition_Body = z
  .object({
    disposition: z.enum(['modernise', 'adapt', 'replace', 'retire']),
    rationale: z.string().max(4000).optional(),
  })
  .passthrough();
const setCoreSystemSpeedTag_Body = z
  .object({ speedTag: z.enum(['runCareful', 'changeFast']) })
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
const CoreSystemId = z.string();
const SpeedTag = z.enum(['runCareful', 'changeFast']);
const Disposition = z.enum([
  'modernise',
  'adapt',
  'replace',
  'retire',
  'undecided',
]);
const CoreSystem = z
  .object({
    systemId: z.string().regex(/^ftp_[0-9a-hjkmnp-tv-z]{26}$/),
    name: z.string().min(1).max(200),
    speedTag: z.enum(['runCareful', 'changeFast']),
    disposition: z.enum([
      'modernise',
      'adapt',
      'replace',
      'retire',
      'undecided',
    ]),
    dispositionRationale: z.string().max(4000).optional(),
    runSpendShare: z.number().gte(0).lte(1).optional(),
    sloCompliance: z.number().gte(0).lte(1).optional(),
    couplingWarning: z.boolean().optional(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const CoreSystemListData = z
  .object({
    items: z.array(
      z
        .object({
          systemId: z.string().regex(/^ftp_[0-9a-hjkmnp-tv-z]{26}$/),
          name: z.string().min(1).max(200),
          speedTag: z.enum(['runCareful', 'changeFast']),
          disposition: z.enum([
            'modernise',
            'adapt',
            'replace',
            'retire',
            'undecided',
          ]),
          dispositionRationale: z.string().max(4000).optional(),
          runSpendShare: z.number().gte(0).lte(1).optional(),
          sloCompliance: z.number().gte(0).lte(1).optional(),
          couplingWarning: z.boolean().optional(),
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
const CoreSystemListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              systemId: z.string().regex(/^ftp_[0-9a-hjkmnp-tv-z]{26}$/),
              name: z.string().min(1).max(200),
              speedTag: z.enum(['runCareful', 'changeFast']),
              disposition: z.enum([
                'modernise',
                'adapt',
                'replace',
                'retire',
                'undecided',
              ]),
              dispositionRationale: z.string().max(4000).optional(),
              runSpendShare: z.number().gte(0).lte(1).optional(),
              sloCompliance: z.number().gte(0).lte(1).optional(),
              couplingWarning: z.boolean().optional(),
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
const CoreSystemCreateRequest = z
  .object({
    name: z.string().min(1).max(200),
    speedTag: z.enum(['runCareful', 'changeFast']),
    runSpendShare: z.number().gte(0).lte(1).optional(),
    sloCompliance: z.number().gte(0).lte(1).optional(),
    couplingWarning: z.boolean().optional(),
  })
  .passthrough();
const CoreSystemResponse = z
  .object({
    data: z
      .object({
        systemId: z.string().regex(/^ftp_[0-9a-hjkmnp-tv-z]{26}$/),
        name: z.string().min(1).max(200),
        speedTag: z.enum(['runCareful', 'changeFast']),
        disposition: z.enum([
          'modernise',
          'adapt',
          'replace',
          'retire',
          'undecided',
        ]),
        dispositionRationale: z.string().max(4000).optional(),
        runSpendShare: z.number().gte(0).lte(1).optional(),
        sloCompliance: z.number().gte(0).lte(1).optional(),
        couplingWarning: z.boolean().optional(),
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
const DispositionUpdateRequest = z
  .object({
    disposition: z.enum(['modernise', 'adapt', 'replace', 'retire']),
    rationale: z.string().max(4000).optional(),
  })
  .passthrough();
const SpeedTagUpdateRequest = z
  .object({ speedTag: z.enum(['runCareful', 'changeFast']) })
  .passthrough();

export const schemas: any = {
  createCoreSystem_Body,
  setCoreSystemDisposition_Body,
  setCoreSystemSpeedTag_Body,
  Problem,
  CoreSystemId,
  SpeedTag,
  Disposition,
  CoreSystem,
  CoreSystemListData,
  ResponseMeta,
  CoreSystemListResponse,
  CoreSystemCreateRequest,
  CoreSystemResponse,
  DispositionUpdateRequest,
  SpeedTagUpdateRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v0/tenants/me/footprint/systems',
    alias: 'listCoreSystems',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  systemId: z.string().regex(/^ftp_[0-9a-hjkmnp-tv-z]{26}$/),
                  name: z.string().min(1).max(200),
                  speedTag: z.enum(['runCareful', 'changeFast']),
                  disposition: z.enum([
                    'modernise',
                    'adapt',
                    'replace',
                    'retire',
                    'undecided',
                  ]),
                  dispositionRationale: z.string().max(4000).optional(),
                  runSpendShare: z.number().gte(0).lte(1).optional(),
                  sloCompliance: z.number().gte(0).lte(1).optional(),
                  couplingWarning: z.boolean().optional(),
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
    path: '/v0/tenants/me/footprint/systems',
    alias: 'createCoreSystem',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createCoreSystem_Body,
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
            systemId: z.string().regex(/^ftp_[0-9a-hjkmnp-tv-z]{26}$/),
            name: z.string().min(1).max(200),
            speedTag: z.enum(['runCareful', 'changeFast']),
            disposition: z.enum([
              'modernise',
              'adapt',
              'replace',
              'retire',
              'undecided',
            ]),
            dispositionRationale: z.string().max(4000).optional(),
            runSpendShare: z.number().gte(0).lte(1).optional(),
            sloCompliance: z.number().gte(0).lte(1).optional(),
            couplingWarning: z.boolean().optional(),
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
    path: '/v0/tenants/me/footprint/systems/:systemId',
    alias: 'getCoreSystem',
    requestFormat: 'json',
    parameters: [
      {
        name: 'systemId',
        type: 'Path',
        schema: z.string().regex(/^ftp_[0-9a-hjkmnp-tv-z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            systemId: z.string().regex(/^ftp_[0-9a-hjkmnp-tv-z]{26}$/),
            name: z.string().min(1).max(200),
            speedTag: z.enum(['runCareful', 'changeFast']),
            disposition: z.enum([
              'modernise',
              'adapt',
              'replace',
              'retire',
              'undecided',
            ]),
            dispositionRationale: z.string().max(4000).optional(),
            runSpendShare: z.number().gte(0).lte(1).optional(),
            sloCompliance: z.number().gte(0).lte(1).optional(),
            couplingWarning: z.boolean().optional(),
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
    path: '/v0/tenants/me/footprint/systems/:systemId/disposition',
    alias: 'setCoreSystemDisposition',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: setCoreSystemDisposition_Body,
      },
      {
        name: 'systemId',
        type: 'Path',
        schema: z.string().regex(/^ftp_[0-9a-hjkmnp-tv-z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            systemId: z.string().regex(/^ftp_[0-9a-hjkmnp-tv-z]{26}$/),
            name: z.string().min(1).max(200),
            speedTag: z.enum(['runCareful', 'changeFast']),
            disposition: z.enum([
              'modernise',
              'adapt',
              'replace',
              'retire',
              'undecided',
            ]),
            dispositionRationale: z.string().max(4000).optional(),
            runSpendShare: z.number().gte(0).lte(1).optional(),
            sloCompliance: z.number().gte(0).lte(1).optional(),
            couplingWarning: z.boolean().optional(),
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
  {
    method: 'put',
    path: '/v0/tenants/me/footprint/systems/:systemId/speed-tag',
    alias: 'setCoreSystemSpeedTag',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: setCoreSystemSpeedTag_Body,
      },
      {
        name: 'systemId',
        type: 'Path',
        schema: z.string().regex(/^ftp_[0-9a-hjkmnp-tv-z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            systemId: z.string().regex(/^ftp_[0-9a-hjkmnp-tv-z]{26}$/),
            name: z.string().min(1).max(200),
            speedTag: z.enum(['runCareful', 'changeFast']),
            disposition: z.enum([
              'modernise',
              'adapt',
              'replace',
              'retire',
              'undecided',
            ]),
            dispositionRationale: z.string().max(4000).optional(),
            runSpendShare: z.number().gte(0).lte(1).optional(),
            sloCompliance: z.number().gte(0).lte(1).optional(),
            couplingWarning: z.boolean().optional(),
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
