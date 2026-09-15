/**
 * Cases Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/cases.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type CoreSystemIdRef = components["schemas"]["CoreSystemIdRef"];
export type RemediationAction = components["schemas"]["RemediationAction"];
export type ShadowITCase = components["schemas"]["ShadowITCase"];
export type ShadowITCaseId = components["schemas"]["ShadowITCaseId"];
export type ShadowITCaseListData = components["schemas"]["ShadowITCaseListData"];
export type ShadowITCaseStatus = components["schemas"]["ShadowITCaseStatus"];
export type RemediateShadowITCaseRequest = components["schemas"]["RemediateShadowITCaseRequest"];
export type ShadowITCaseCreateRequest = components["schemas"]["ShadowITCaseCreateRequest"];
export type ShadowIt = operations["listShadowITCases"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type OpenShadowITCaseRequestInput = NonNullable<operations["openShadowITCase"]["requestBody"]>["content"]["application/json"];
export type RemediateShadowITCaseRequestInput = NonNullable<operations["remediateShadowITCase"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type GetShadowITCaseParams = operations["getShadowITCase"]["parameters"]["path"];
export type RemediateShadowITCaseParams = operations["remediateShadowITCase"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListShadowITCasesResponse = operations["listShadowITCases"]["responses"]["200"]["content"]["application/json"];
export type OpenShadowITCaseResponse = operations["openShadowITCase"]["responses"]["201"]["content"]["application/json"];
export type GetShadowITCaseResponse = operations["getShadowITCase"]["responses"]["200"]["content"]["application/json"];
export type RemediateShadowITCaseResponse = operations["remediateShadowITCase"]["responses"]["200"]["content"]["application/json"];


