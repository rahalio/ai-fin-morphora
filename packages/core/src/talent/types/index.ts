/**
 * Talent Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/talent.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type InitiativeIdRef = components["schemas"]["InitiativeIdRef"];
export type TalentGap = components["schemas"]["TalentGap"];
export type TalentGapId = components["schemas"]["TalentGapId"];
export type TalentGapListData = components["schemas"]["TalentGapListData"];
export type TalentSeverity = components["schemas"]["TalentSeverity"];
export type TalentGapCreateRequest = components["schemas"]["TalentGapCreateRequest"];
export type TalentGapUpdateRequest = components["schemas"]["TalentGapUpdateRequest"];
export type Gap = operations["listTalentGaps"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateTalentGapRequestInput = NonNullable<operations["createTalentGap"]["requestBody"]>["content"]["application/json"];
export type UpdateTalentGapRequestInput = NonNullable<operations["updateTalentGap"]["requestBody"]>["content"]["application/json"];
export type UpdateTalentGapRequest = UpdateTalentGapRequestInput;


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type GetTalentGapParams = operations["getTalentGap"]["parameters"]["path"];
export type UpdateTalentGapParams = operations["updateTalentGap"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListTalentGapsResponse = operations["listTalentGaps"]["responses"]["200"]["content"]["application/json"];
export type CreateTalentGapResponse = operations["createTalentGap"]["responses"]["201"]["content"]["application/json"];
export type GetTalentGapResponse = operations["getTalentGap"]["responses"]["200"]["content"]["application/json"];
export type UpdateTalentGapResponse = operations["updateTalentGap"]["responses"]["200"]["content"]["application/json"];


