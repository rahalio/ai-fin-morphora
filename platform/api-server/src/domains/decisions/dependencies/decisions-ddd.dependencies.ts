/**
 * Decisions Domain Module - Composition root
 *
 * DDD: Composition root for decisions domain. Exposes repos (ports) and use cases
 * grouped by aggregate. No orgId at build time — use execution context at call time.
 */

import {
  DecisionRepositoryAdapter,
  SummaryRepositoryAdapter,
} from "@morphora/adapters/decisions";
import { getIdGeneratorService } from "@morphora/adapters";
import type { AdapterDynamoDBClient } from "@morphora/adapters";
import { executionContextService } from "../../../lib/execution-context.service.js";
import {
  ExecuteGetCadenceSummary,
  ExecuteGetDecision,
  ExecuteListDecisions,
  ExecuteRecordDecision,
} from "@morphora/services/decisions/usecases";
import type {
  DecisionRepository,
  SummaryRepository,
} from "@morphora/services/decisions/ports";

export interface DecisionsDomainModule {
  repos: {
    decisions: DecisionRepository;
    summaries: SummaryRepository;
  };
  useCases: {
    decisions: {
      create: ExecuteRecordDecision;
      get: ExecuteGetDecision;
      list: ExecuteListDecisions;
    };
    summaries: {
      get: ExecuteGetCadenceSummary;
    };
  };
}

export function buildDecisionsDomainModule(
  dynamoClient: AdapterDynamoDBClient,
): DecisionsDomainModule {
  const repos = {
    decisions: new DecisionRepositoryAdapter(dynamoClient),
    summaries: new SummaryRepositoryAdapter(dynamoClient),
  };

  const executionContext = executionContextService;
  const idGenerator = getIdGeneratorService();

  const useCases = {
    decisions: {
      create: new ExecuteRecordDecision(executionContext, idGenerator, repos.decisions),
      get: new ExecuteGetDecision(executionContext, idGenerator, repos.decisions),
      list: new ExecuteListDecisions(executionContext, idGenerator, repos.decisions),
    },
    summaries: {
      get: new ExecuteGetCadenceSummary(executionContext, idGenerator, repos.summaries),
    },
  };

  return { repos, useCases };
}
