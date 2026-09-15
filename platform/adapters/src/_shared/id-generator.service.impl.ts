/**
 * ID Generator Service Implementation — Morphora prefixes.
 */

import type { DomainCode } from '@morphora/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@morphora/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@morphora/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  snsId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.sensing);
  }
  ftpId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.footprint);
  }
  prtId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.partners);
  }
  iniId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.initiatives);
  }
  decId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.decisions);
  }
  tlnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.talent);
  }
  pckId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.packs);
  }
  cseId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.cases);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
