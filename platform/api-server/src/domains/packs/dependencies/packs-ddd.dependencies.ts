/**
 * Packs Domain Module - Composition root
 *
 * DDD: Composition root for packs domain. Exposes repos (ports) and use cases
 * grouped by aggregate. No orgId at build time — use execution context at call time.
 */

import {
  PackRepositoryAdapter,
  PublishPublisherAdapter,
} from "@morphora/adapters/packs";
import { getIdGeneratorService } from "@morphora/adapters";
import type { AdapterDynamoDBClient } from "@morphora/adapters";
import { executionContextService } from "../../../lib/execution-context.service.js";
import {
  ExecuteCreateExecPack,
  ExecuteGetExecPack,
  ExecuteListExecPacks,
  ExecutePublishExecPack,
} from "@morphora/services/packs/usecases";
import type {
  PackRepository,
  PublishPublisher,
} from "@morphora/services/packs/ports";

export interface PacksDomainModule {
  repos: {
    packs: PackRepository;
  };
  publishers: {
    publish: PublishPublisher;
  };
  useCases: {
    packs: {
      create: ExecuteCreateExecPack;
      get: ExecuteGetExecPack;
      list: ExecuteListExecPacks;
      publish: ExecutePublishExecPack;
    };
  };
}

export function buildPacksDomainModule(
  dynamoClient: AdapterDynamoDBClient,
): PacksDomainModule {
  const repos = {
    packs: new PackRepositoryAdapter(dynamoClient),
  };

  const publishers = {
    publish: new PublishPublisherAdapter(),
  };

  const executionContext = executionContextService;
  const idGenerator = getIdGeneratorService();

  const useCases = {
    packs: {
      create: new ExecuteCreateExecPack(executionContext, idGenerator, repos.packs),
      get: new ExecuteGetExecPack(executionContext, idGenerator, repos.packs),
      list: new ExecuteListExecPacks(executionContext, idGenerator, repos.packs),
      publish: new ExecutePublishExecPack(
        executionContext,
        idGenerator,
        publishers.publish,
        repos.packs,
      ),
    },
  };

  return { repos, publishers, useCases };
}
