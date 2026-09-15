/**
 * IdGeneratorService Port — Morphora domain prefixes.
 */

import type { DomainCode } from '@morphora/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  snsId(): string;
  ftpId(): string;
  prtId(): string;
  iniId(): string;
  decId(): string;
  tlnId(): string;
  pckId(): string;
  cseId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
