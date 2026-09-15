import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const createPartner_Body = z
  .object({
    name: z.string().min(1).max(200),
    partnerType: z.string().min(1).max(80),
    criticality: z.enum(['low', 'medium', 'high', 'systemic']).optional(),
    concentrationScore: z.number().gte(0).lte(1).optional(),
    spof: z.boolean().optional(),
  })
  .passthrough();
const setPartnerCriticality_Body = z
  .object({
    criticality: z.enum(['low', 'medium', 'high', 'systemic']),
    concentrationScore: z.number().gte(0).lte(1),
    spof: z.boolean().optional(),
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
const PartnerId = z.string();
const PartnerCriticality = z.enum(['low', 'medium', 'high', 'systemic']);
const Partner = z
  .object({
    partnerId: z.string().regex(/^prt_[0-9a-hjkmnp-tv-z]{26}$/),
    name: z.string().min(1).max(200),
    partnerType: z.string().min(1).max(80),
    criticality: z.enum(['low', 'medium', 'high', 'systemic']),
    concentrationScore: z.number().gte(0).lte(1).optional(),
    spof: z.boolean(),
    createdAt: z.string().datetime({ offset: true }),
    updatedAt: z.string().datetime({ offset: true }),
  })
  .passthrough();
const PartnerListData = z
  .object({
    items: z.array(
      z
        .object({
          partnerId: z.string().regex(/^prt_[0-9a-hjkmnp-tv-z]{26}$/),
          name: z.string().min(1).max(200),
          partnerType: z.string().min(1).max(80),
          criticality: z.enum(['low', 'medium', 'high', 'systemic']),
          concentrationScore: z.number().gte(0).lte(1).optional(),
          spof: z.boolean(),
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
const PartnerListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              partnerId: z.string().regex(/^prt_[0-9a-hjkmnp-tv-z]{26}$/),
              name: z.string().min(1).max(200),
              partnerType: z.string().min(1).max(80),
              criticality: z.enum(['low', 'medium', 'high', 'systemic']),
              concentrationScore: z.number().gte(0).lte(1).optional(),
              spof: z.boolean(),
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
const PartnerCreateRequest = z
  .object({
    name: z.string().min(1).max(200),
    partnerType: z.string().min(1).max(80),
    criticality: z.enum(['low', 'medium', 'high', 'systemic']).optional(),
    concentrationScore: z.number().gte(0).lte(1).optional(),
    spof: z.boolean().optional(),
  })
  .passthrough();
const PartnerResponse = z
  .object({
    data: z
      .object({
        partnerId: z.string().regex(/^prt_[0-9a-hjkmnp-tv-z]{26}$/),
        name: z.string().min(1).max(200),
        partnerType: z.string().min(1).max(80),
        criticality: z.enum(['low', 'medium', 'high', 'systemic']),
        concentrationScore: z.number().gte(0).lte(1).optional(),
        spof: z.boolean(),
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
const CriticalityUpdateRequest = z
  .object({
    criticality: z.enum(['low', 'medium', 'high', 'systemic']),
    concentrationScore: z.number().gte(0).lte(1),
    spof: z.boolean().optional(),
  })
  .passthrough();

export const schemas: any = {
  createPartner_Body,
  setPartnerCriticality_Body,
  Problem,
  PartnerId,
  PartnerCriticality,
  Partner,
  PartnerListData,
  ResponseMeta,
  PartnerListResponse,
  PartnerCreateRequest,
  PartnerResponse,
  CriticalityUpdateRequest,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v0/tenants/me/partners',
    alias: 'listPartners',
    requestFormat: 'json',
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  partnerId: z.string().regex(/^prt_[0-9a-hjkmnp-tv-z]{26}$/),
                  name: z.string().min(1).max(200),
                  partnerType: z.string().min(1).max(80),
                  criticality: z.enum(['low', 'medium', 'high', 'systemic']),
                  concentrationScore: z.number().gte(0).lte(1).optional(),
                  spof: z.boolean(),
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
    path: '/v0/tenants/me/partners',
    alias: 'createPartner',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: createPartner_Body,
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
            partnerId: z.string().regex(/^prt_[0-9a-hjkmnp-tv-z]{26}$/),
            name: z.string().min(1).max(200),
            partnerType: z.string().min(1).max(80),
            criticality: z.enum(['low', 'medium', 'high', 'systemic']),
            concentrationScore: z.number().gte(0).lte(1).optional(),
            spof: z.boolean(),
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
    path: '/v0/tenants/me/partners/:partnerId',
    alias: 'getPartner',
    requestFormat: 'json',
    parameters: [
      {
        name: 'partnerId',
        type: 'Path',
        schema: z.string().regex(/^prt_[0-9a-hjkmnp-tv-z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            partnerId: z.string().regex(/^prt_[0-9a-hjkmnp-tv-z]{26}$/),
            name: z.string().min(1).max(200),
            partnerType: z.string().min(1).max(80),
            criticality: z.enum(['low', 'medium', 'high', 'systemic']),
            concentrationScore: z.number().gte(0).lte(1).optional(),
            spof: z.boolean(),
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
    path: '/v0/tenants/me/partners/:partnerId/criticality',
    alias: 'setPartnerCriticality',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: setPartnerCriticality_Body,
      },
      {
        name: 'partnerId',
        type: 'Path',
        schema: z.string().regex(/^prt_[0-9a-hjkmnp-tv-z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            partnerId: z.string().regex(/^prt_[0-9a-hjkmnp-tv-z]{26}$/),
            name: z.string().min(1).max(200),
            partnerType: z.string().min(1).max(80),
            criticality: z.enum(['low', 'medium', 'high', 'systemic']),
            concentrationScore: z.number().gte(0).lte(1).optional(),
            spof: z.boolean(),
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
