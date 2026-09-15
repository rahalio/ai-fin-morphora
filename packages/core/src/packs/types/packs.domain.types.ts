/**
 * Packs Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/packs.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ExecPack = components["schemas"]["ExecPack"];
export type ExecPackId = components["schemas"]["ExecPackId"];
export type ExecPackListData = components["schemas"]["ExecPackListData"];
export type ExecPackStatus = components["schemas"]["ExecPackStatus"];
export type ExecPackCreateRequest = components["schemas"]["ExecPackCreateRequest"];
export type PublishExecPackRequest = components["schemas"]["PublishExecPackRequest"];
export type Pack = operations["listExecPacks"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type CreateExecPackRequestInput = NonNullable<operations["createExecPack"]["requestBody"]>["content"]["application/json"];
export type PublishExecPackRequestInput = NonNullable<operations["publishExecPack"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type GetExecPackParams = operations["getExecPack"]["parameters"]["path"];
export type PublishExecPackParams = operations["publishExecPack"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListExecPacksResponse = operations["listExecPacks"]["responses"]["200"]["content"]["application/json"];
export type CreateExecPackResponse = operations["createExecPack"]["responses"]["201"]["content"]["application/json"];
export type GetExecPackResponse = operations["getExecPack"]["responses"]["200"]["content"]["application/json"];
export type PublishExecPackResponse = operations["publishExecPack"]["responses"]["200"]["content"]["application/json"];


