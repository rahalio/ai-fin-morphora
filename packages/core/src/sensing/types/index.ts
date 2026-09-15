/**
 * Sensing Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/sensing.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type HypeAssessment = components["schemas"]["HypeAssessment"];
export type HypeFilterOutcome = components["schemas"]["HypeFilterOutcome"];
export type SensingSignal = components["schemas"]["SensingSignal"];
export type SensingSignalId = components["schemas"]["SensingSignalId"];
export type SensingSignalListData = components["schemas"]["SensingSignalListData"];
export type SensingSignalStatus = components["schemas"]["SensingSignalStatus"];
export type HypeAssessmentUpsertRequest = components["schemas"]["HypeAssessmentUpsertRequest"];
export type SensingSignalCreateRequest = components["schemas"]["SensingSignalCreateRequest"];
export type StampSignalDecisionRequest = components["schemas"]["StampSignalDecisionRequest"];
export type Signal = operations["listSensingSignals"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateSensingSignalRequestInput = NonNullable<operations["createSensingSignal"]["requestBody"]>["content"]["application/json"];
export type UpsertHypeAssessmentRequestInput = NonNullable<operations["upsertHypeAssessment"]["requestBody"]>["content"]["application/json"];
export type StampSensingDecisionRequestInput = NonNullable<operations["stampSensingDecision"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type GetSensingSignalParams = operations["getSensingSignal"]["parameters"]["path"];
export type UpsertHypeAssessmentParams = operations["upsertHypeAssessment"]["parameters"]["path"];
export type StampSensingDecisionParams = operations["stampSensingDecision"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListSensingSignalsResponse = operations["listSensingSignals"]["responses"]["200"]["content"]["application/json"];
export type CreateSensingSignalResponse = operations["createSensingSignal"]["responses"]["201"]["content"]["application/json"];
export type GetSensingSignalResponse = operations["getSensingSignal"]["responses"]["200"]["content"]["application/json"];
export type UpsertHypeAssessmentResponse = operations["upsertHypeAssessment"]["responses"]["200"]["content"]["application/json"];
export type StampSensingDecisionResponse = operations["stampSensingDecision"]["responses"]["200"]["content"]["application/json"];


