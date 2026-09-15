/**
 * Footprint Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/footprint.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type CoreSystem = components["schemas"]["CoreSystem"];
export type CoreSystemId = components["schemas"]["CoreSystemId"];
export type CoreSystemListData = components["schemas"]["CoreSystemListData"];
export type Disposition = components["schemas"]["Disposition"];
export type SpeedTag = components["schemas"]["SpeedTag"];
export type CoreSystemCreateRequest = components["schemas"]["CoreSystemCreateRequest"];
export type DispositionUpdateRequest = components["schemas"]["DispositionUpdateRequest"];
export type SpeedTagUpdateRequest = components["schemas"]["SpeedTagUpdateRequest"];
export type System = operations["listCoreSystems"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateCoreSystemRequestInput = NonNullable<operations["createCoreSystem"]["requestBody"]>["content"]["application/json"];
export type SetCoreSystemDispositionRequestInput = NonNullable<operations["setCoreSystemDisposition"]["requestBody"]>["content"]["application/json"];
export type SetCoreSystemSpeedTagRequestInput = NonNullable<operations["setCoreSystemSpeedTag"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type GetCoreSystemParams = operations["getCoreSystem"]["parameters"]["path"];
export type SetCoreSystemDispositionParams = operations["setCoreSystemDisposition"]["parameters"]["path"];
export type SetCoreSystemSpeedTagParams = operations["setCoreSystemSpeedTag"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListCoreSystemsResponse = operations["listCoreSystems"]["responses"]["200"]["content"]["application/json"];
export type CreateCoreSystemResponse = operations["createCoreSystem"]["responses"]["201"]["content"]["application/json"];
export type GetCoreSystemResponse = operations["getCoreSystem"]["responses"]["200"]["content"]["application/json"];
export type SetCoreSystemDispositionResponse = operations["setCoreSystemDisposition"]["responses"]["200"]["content"]["application/json"];
export type SetCoreSystemSpeedTagResponse = operations["setCoreSystemSpeedTag"]["responses"]["200"]["content"]["application/json"];


