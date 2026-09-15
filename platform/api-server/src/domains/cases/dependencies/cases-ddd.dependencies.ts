/**
 * Cases Domain Module - Composition root
 *
 * DDD: Composition root for cases domain. Exposes repos (ports) and use cases
 * grouped by aggregate. No orgId at build time — use execution context at call time.
 */

import {
  RemediateRepositoryAdapter,
  ShadowItRepositoryAdapter,
} from "@morphora/adapters/cases";
import { getIdGeneratorService } from "@morphora/adapters";
import type { AdapterDynamoDBClient } from "@morphora/adapters";
import { executionContextService } from "../../../lib/execution-context.service.js";
import {
  ExecuteGetShadowITCase,
  ExecuteListShadowITCases,
  ExecuteOpenShadowITCase,
  ExecuteRemediateShadowITCase,
} from "@morphora/services/cases/usecases";
import type {
  RemediateRepository,
  ShadowItRepository,
} from "@morphora/services/cases/ports";

export interface CasesDomainModule {
  repos: {
    remediates: RemediateRepository;
    shadowIts: ShadowItRepository;
  };
  useCases: {
    remediates: {
      get: ExecuteRemediateShadowITCase;
    };
    shadowIts: {
      create: ExecuteOpenShadowITCase;
      get: ExecuteGetShadowITCase;
      list: ExecuteListShadowITCases;
    };
  };
}

export function buildCasesDomainModule(
  dynamoClient: AdapterDynamoDBClient,
): CasesDomainModule {
  const repos = {
    remediates: new RemediateRepositoryAdapter(dynamoClient),
    shadowIts: new ShadowItRepositoryAdapter(dynamoClient),
  };

  const executionContext = executionContextService;
  const idGenerator = getIdGeneratorService();

  const useCases = {
    remediates: {
      get: new ExecuteRemediateShadowITCase(executionContext, idGenerator, repos.remediates),
    },
    shadowIts: {
      create: new ExecuteOpenShadowITCase(executionContext, idGenerator, repos.shadowIts),
      get: new ExecuteGetShadowITCase(executionContext, idGenerator, repos.shadowIts),
      list: new ExecuteListShadowITCases(executionContext, idGenerator, repos.shadowIts),
    },
  };

  return { repos, useCases };
}
