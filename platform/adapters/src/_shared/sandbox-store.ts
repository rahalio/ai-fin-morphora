/**
 * Process-wide in-memory store for local / sandbox identity + product domains.
 */

import { randomBytes } from 'node:crypto';
import { ulid } from 'ulid';

export function sandboxId(prefix: string): string {
  return `${prefix}_${ulid().toLowerCase()}`;
}

export function nowIso(): string {
  return new Date().toISOString();
}

export function responseMeta(correlationId?: string) {
  return {
    meta: {
      correlationId,
      generatedAt: nowIso(),
    },
  };
}

const DEMO_TENANT = 'tnt_demo';

// ─── Identity ───────────────────────────────────────────────────────────────

export interface SandboxApiKey {
  keyId: string;
  tenantId: string;
  name: string;
  prefix: string;
  secret: string;
  status: 'active' | 'revoked';
  scopes: string[];
  createdAt: string;
  expiresAt?: string;
  lastUsedAt?: string;
}

export interface SandboxUser {
  userId: string;
  tenantId: string;
  email: string;
  displayName: string;
  role: 'admin' | 'analyst' | 'viewer' | 'ops';
  status: 'active' | 'disabled';
  password: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
  disabledAt?: string;
}

export const apiKeysById = new Map<string, SandboxApiKey>();
export const apiKeysByTenant = new Map<string, Set<string>>();
export const usersById = new Map<string, SandboxUser>();
export const usersByTenant = new Map<string, Set<string>>();

export interface SandboxTenantProfile {
  tenantId: string;
  displayNameEn: string;
  displayNameAr: string;
  legalNameEn?: string;
  legalNameAr?: string;
  country?: string;
  timezone?: string;
  localeDefault?: string;
  status: 'active' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

export const tenantProfiles = new Map<string, SandboxTenantProfile>();

export function defaultTenantProfile(tenantId: string): SandboxTenantProfile {
  const now = nowIso();
  return {
    tenantId,
    displayNameEn: 'Demo CIO Office',
    displayNameAr: 'مكتب مدير تقنية المعلومات التجريبي',
    legalNameEn: 'Demo Financial Institution',
    legalNameAr: 'مؤسسة مالية تجريبية',
    country: 'AE',
    timezone: 'Asia/Dubai',
    localeDefault: 'en',
    status: 'active',
    createdAt: now,
    updatedAt: now,
  };
}

export function getOrCreateTenantProfile(tenantId: string): SandboxTenantProfile {
  const existing = tenantProfiles.get(tenantId);
  if (existing) return existing;
  const profile = defaultTenantProfile(tenantId);
  tenantProfiles.set(tenantId, profile);
  return profile;
}

export function toPublicUser(user: SandboxUser) {
  return {
    userId: user.userId,
    email: user.email,
    displayName: user.displayName,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    lastLoginAt: user.lastLoginAt,
    disabledAt: user.disabledAt,
  };
}

function seedDemoUsers(tenantId: string) {
  if ((usersByTenant.get(tenantId)?.size ?? 0) > 0) return;
  const now = nowIso();
  const seeds: Array<Omit<SandboxUser, 'userId'>> = [
    {
      tenantId,
      email: 'admin@demo.local',
      displayName: 'Demo Admin',
      role: 'admin',
      status: 'active',
      password: 'sandbox-admin-8',
      createdAt: now,
      updatedAt: now,
    },
    {
      tenantId,
      email: 'analyst@demo.local',
      displayName: 'Demo Analyst',
      role: 'analyst',
      status: 'active',
      password: 'sandbox-analyst-8',
      createdAt: now,
      updatedAt: now,
    },
  ];
  const ids = new Set<string>();
  for (const seed of seeds) {
    const userId = sandboxId('usr');
    const user: SandboxUser = { ...seed, userId };
    usersById.set(userId, user);
    ids.add(userId);
  }
  usersByTenant.set(tenantId, ids);
}

export function listUsersForTenant(tenantId: string): SandboxUser[] {
  seedDemoUsers(tenantId);
  const ids = usersByTenant.get(tenantId) ?? new Set<string>();
  return [...ids]
    .map((id) => usersById.get(id))
    .filter((u): u is SandboxUser => Boolean(u));
}

export function generateApiKeySecret(prefix = 'morphora_demo'): string {
  return `${prefix}_${randomBytes(24).toString('hex')}`;
}

// ─── Product domain records ─────────────────────────────────────────────────

export interface SandboxSignal {
  signalId: string;
  tenantId: string;
  title: string;
  technologyArea: string;
  sourceUri?: string;
  status: 'new' | 'assessing' | 'decided';
  decisionOutcome?: 'adopt' | 'watch' | 'reject';
  decisionRationale?: string;
  decidedAt?: string;
  hypeAssessment?: {
    signalId: string;
    hypeScore?: number;
    recommendedOutcome?: 'adopt' | 'watch' | 'reject';
    assessmentNotes?: string;
    assessedAt: string;
    assessedBy?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface SandboxSystem {
  systemId: string;
  tenantId: string;
  name: string;
  speedTag: 'runCareful' | 'changeFast';
  disposition: 'modernise' | 'adapt' | 'replace' | 'retire' | 'undecided';
  dispositionRationale?: string;
  runSpendShare?: number;
  sloCompliance?: number;
  couplingWarning?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SandboxPartner {
  partnerId: string;
  tenantId: string;
  name: string;
  partnerType: string;
  criticality: 'low' | 'medium' | 'high' | 'systemic';
  concentrationScore?: number;
  spof: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SandboxInitiative {
  initiativeId: string;
  tenantId: string;
  name: string;
  status: 'experiment' | 'scale' | 'killed';
  role: 'strategist' | 'bridge' | 'ecosystem' | 'startup';
  sourcing: 'build' | 'buy' | 'rent' | 'partner' | 'undecided';
  killMetric?: string;
  daysInLab?: number;
  sensingSignalId?: string;
  sponsorName?: string;
  sourcingRationale?: string;
  killRationale?: string;
  scaleRationale?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SandboxDecision {
  decisionId: string;
  tenantId: string;
  decisionType: string;
  outcome: string;
  rationale: string;
  relatedEntityId?: string;
  relatedEntityType?:
    | 'sensingSignal'
    | 'coreSystem'
    | 'partner'
    | 'initiative'
    | 'talentGap'
    | 'execPack'
    | 'shadowITCase'
    | 'other';
  shapeshifterRole?: 'strategist' | 'bridge' | 'ecosystem' | 'startup';
  decidedAt: string;
  createdAt: string;
}

export interface SandboxTalentGap {
  gapId: string;
  tenantId: string;
  roleName: string;
  coverage: number;
  relatedInitiativeId?: string;
  severity: 'low' | 'medium' | 'high';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SandboxPack {
  packId: string;
  tenantId: string;
  status: 'draft' | 'published';
  periodLabel: string;
  narrative?: string;
  downloadUri?: string;
  shareToken?: string;
  stretchSqueezeNote?: string;
  spendMixNote?: string;
  concentrationNote?: string;
  challengerNote?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SandboxCase {
  caseId: string;
  tenantId: string;
  systemName: string;
  status: 'open' | 'remediating' | 'closed';
  discoveredVia: string;
  remediationAction?: 'mapToFootprint' | 'retire' | 'escalate';
  footprintSystemId?: string;
  remediationNotes?: string;
  closedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export const signalsById = new Map<string, SandboxSignal>();
export const signalsByTenant = new Map<string, Set<string>>();
export const systemsById = new Map<string, SandboxSystem>();
export const systemsByTenant = new Map<string, Set<string>>();
export const partnersById = new Map<string, SandboxPartner>();
export const partnersByTenant = new Map<string, Set<string>>();
export const initiativesById = new Map<string, SandboxInitiative>();
export const initiativesByTenant = new Map<string, Set<string>>();
export const decisionsById = new Map<string, SandboxDecision>();
export const decisionsByTenant = new Map<string, Set<string>>();
export const talentGapsById = new Map<string, SandboxTalentGap>();
export const talentGapsByTenant = new Map<string, Set<string>>();
export const packsById = new Map<string, SandboxPack>();
export const packsByTenant = new Map<string, Set<string>>();
export const casesById = new Map<string, SandboxCase>();
export const casesByTenant = new Map<string, Set<string>>();

function indexByTenant(
  byTenant: Map<string, Set<string>>,
  tenantId: string,
  id: string
) {
  const set = byTenant.get(tenantId) ?? new Set<string>();
  set.add(id);
  byTenant.set(tenantId, set);
}

function listForTenant<T>(
  byTenant: Map<string, Set<string>>,
  byId: Map<string, T>,
  tenantId: string
): T[] {
  const ids = byTenant.get(tenantId) ?? new Set<string>();
  return [...ids]
    .map((id) => byId.get(id))
    .filter((row): row is T => Boolean(row));
}

const seededTenants = new Set<string>();

export function ensureProductSeeds(tenantId = DEMO_TENANT) {
  if (seededTenants.has(tenantId)) return;
  seededTenants.add(tenantId);
  const now = nowIso();

  const signalId = sandboxId('sns');
  const signal: SandboxSignal = {
    signalId,
    tenantId,
    title: 'Generative AI for credit ops',
    technologyArea: 'AI',
    sourceUri: 'https://example.com/sensing/genai-credit',
    status: 'assessing',
    hypeAssessment: {
      signalId,
      hypeScore: 0.62,
      recommendedOutcome: 'watch',
      assessmentNotes: 'Strong vendor noise; limited bank-ready controls.',
      assessedAt: now,
      assessedBy: 'sandbox',
    },
    createdAt: now,
    updatedAt: now,
  };
  signalsById.set(signalId, signal);
  indexByTenant(signalsByTenant, tenantId, signalId);

  const signalId2 = sandboxId('sns');
  const signal2: SandboxSignal = {
    signalId: signalId2,
    tenantId,
    title: 'Tokenised deposits pilot',
    technologyArea: 'blockchain',
    status: 'new',
    createdAt: now,
    updatedAt: now,
  };
  signalsById.set(signalId2, signal2);
  indexByTenant(signalsByTenant, tenantId, signalId2);

  const systemId = sandboxId('ftp');
  const system: SandboxSystem = {
    systemId,
    tenantId,
    name: 'Core Banking Ledger',
    speedTag: 'runCareful',
    disposition: 'modernise',
    dispositionRationale: 'Keep ledger stable; unwrap channels first.',
    runSpendShare: 0.71,
    sloCompliance: 0.992,
    couplingWarning: true,
    createdAt: now,
    updatedAt: now,
  };
  systemsById.set(systemId, system);
  indexByTenant(systemsByTenant, tenantId, systemId);

  const systemId2 = sandboxId('ftp');
  const system2: SandboxSystem = {
    systemId: systemId2,
    tenantId,
    name: 'Digital Onboarding',
    speedTag: 'changeFast',
    disposition: 'adapt',
    runSpendShare: 0.28,
    sloCompliance: 0.97,
    couplingWarning: false,
    createdAt: now,
    updatedAt: now,
  };
  systemsById.set(systemId2, system2);
  indexByTenant(systemsByTenant, tenantId, systemId2);

  const partnerId = sandboxId('prt');
  const partner: SandboxPartner = {
    partnerId,
    tenantId,
    name: 'CloudScale GCC',
    partnerType: 'cloud',
    criticality: 'systemic',
    concentrationScore: 0.81,
    spof: true,
    createdAt: now,
    updatedAt: now,
  };
  partnersById.set(partnerId, partner);
  indexByTenant(partnersByTenant, tenantId, partnerId);

  const partnerId2 = sandboxId('prt');
  const partner2: SandboxPartner = {
    partnerId: partnerId2,
    tenantId,
    name: 'Fintech Bridge Co',
    partnerType: 'startup',
    criticality: 'medium',
    concentrationScore: 0.22,
    spof: false,
    createdAt: now,
    updatedAt: now,
  };
  partnersById.set(partnerId2, partner2);
  indexByTenant(partnersByTenant, tenantId, partnerId2);

  const initiativeId = sandboxId('ini');
  const initiative: SandboxInitiative = {
    initiativeId,
    tenantId,
    name: 'Challenger Credit Lab',
    status: 'experiment',
    role: 'startup',
    sourcing: 'partner',
    killMetric: 'No production approval path in 90 days',
    daysInLab: 34,
    sensingSignalId: signalId,
    sponsorName: 'CIO Office',
    sourcingRationale: 'Partner for speed; own risk model.',
    createdAt: now,
    updatedAt: now,
  };
  initiativesById.set(initiativeId, initiative);
  indexByTenant(initiativesByTenant, tenantId, initiativeId);

  const decisionId = sandboxId('dec');
  const decision: SandboxDecision = {
    decisionId,
    tenantId,
    decisionType: 'hypeFilter',
    outcome: 'watch',
    rationale: 'Keep GenAI credit on watch pending control evidence.',
    relatedEntityId: signalId,
    relatedEntityType: 'sensingSignal',
    shapeshifterRole: 'strategist',
    decidedAt: now,
    createdAt: now,
  };
  decisionsById.set(decisionId, decision);
  indexByTenant(decisionsByTenant, tenantId, decisionId);

  const gapId = sandboxId('tln');
  const gap: SandboxTalentGap = {
    gapId,
    tenantId,
    roleName: 'Platform SRE',
    coverage: 0.45,
    relatedInitiativeId: initiativeId,
    severity: 'high',
    notes: 'Need dual-speed run/change coverage.',
    createdAt: now,
    updatedAt: now,
  };
  talentGapsById.set(gapId, gap);
  indexByTenant(talentGapsByTenant, tenantId, gapId);

  const packId = sandboxId('pck');
  const pack: SandboxPack = {
    packId,
    tenantId,
    status: 'draft',
    periodLabel: 'FY26 Q1 ExCo',
    narrative: 'Stretch/squeeze and concentration risks for board pack.',
    stretchSqueezeNote: 'Run share still above target.',
    spendMixNote: 'Change-fast underfunded vs dual-speed intent.',
    concentrationNote: 'CloudScale systemic SPOF.',
    challengerNote: 'Credit lab still in experiment.',
    createdAt: now,
    updatedAt: now,
  };
  packsById.set(packId, pack);
  indexByTenant(packsByTenant, tenantId, packId);

  const caseId = sandboxId('cse');
  const shadowCase: SandboxCase = {
    caseId,
    tenantId,
    systemName: 'Marketing Analytics SaaS',
    status: 'open',
    discoveredVia: 'spend',
    createdAt: now,
    updatedAt: now,
  };
  casesById.set(caseId, shadowCase);
  indexByTenant(casesByTenant, tenantId, caseId);
}

export function listSignals(tenantId: string): SandboxSignal[] {
  ensureProductSeeds(tenantId);
  return listForTenant(signalsByTenant, signalsById, tenantId);
}

export function listSystems(tenantId: string): SandboxSystem[] {
  ensureProductSeeds(tenantId);
  return listForTenant(systemsByTenant, systemsById, tenantId);
}

export function listPartners(tenantId: string): SandboxPartner[] {
  ensureProductSeeds(tenantId);
  return listForTenant(partnersByTenant, partnersById, tenantId);
}

export function listInitiatives(tenantId: string): SandboxInitiative[] {
  ensureProductSeeds(tenantId);
  return listForTenant(initiativesByTenant, initiativesById, tenantId);
}

export function listDecisions(tenantId: string): SandboxDecision[] {
  ensureProductSeeds(tenantId);
  return listForTenant(decisionsByTenant, decisionsById, tenantId);
}

export function listTalentGaps(tenantId: string): SandboxTalentGap[] {
  ensureProductSeeds(tenantId);
  return listForTenant(talentGapsByTenant, talentGapsById, tenantId);
}

export function listPacks(tenantId: string): SandboxPack[] {
  ensureProductSeeds(tenantId);
  return listForTenant(packsByTenant, packsById, tenantId);
}

export function listCases(tenantId: string): SandboxCase[] {
  ensureProductSeeds(tenantId);
  return listForTenant(casesByTenant, casesById, tenantId);
}

export function putSignal(row: SandboxSignal) {
  signalsById.set(row.signalId, row);
  indexByTenant(signalsByTenant, row.tenantId, row.signalId);
}

export function putSystem(row: SandboxSystem) {
  systemsById.set(row.systemId, row);
  indexByTenant(systemsByTenant, row.tenantId, row.systemId);
}

export function putPartner(row: SandboxPartner) {
  partnersById.set(row.partnerId, row);
  indexByTenant(partnersByTenant, row.tenantId, row.partnerId);
}

export function putInitiative(row: SandboxInitiative) {
  initiativesById.set(row.initiativeId, row);
  indexByTenant(initiativesByTenant, row.tenantId, row.initiativeId);
}

export function putDecision(row: SandboxDecision) {
  decisionsById.set(row.decisionId, row);
  indexByTenant(decisionsByTenant, row.tenantId, row.decisionId);
}

export function putTalentGap(row: SandboxTalentGap) {
  talentGapsById.set(row.gapId, row);
  indexByTenant(talentGapsByTenant, row.tenantId, row.gapId);
}

export function putPack(row: SandboxPack) {
  packsById.set(row.packId, row);
  indexByTenant(packsByTenant, row.tenantId, row.packId);
}

export function putCase(row: SandboxCase) {
  casesById.set(row.caseId, row);
  indexByTenant(casesByTenant, row.tenantId, row.caseId);
}

export function publicSignal(row: SandboxSignal) {
  const { tenantId: _t, ...rest } = row;
  return rest;
}

export function publicSystem(row: SandboxSystem) {
  const { tenantId: _t, ...rest } = row;
  return rest;
}

export function publicPartner(row: SandboxPartner) {
  const { tenantId: _t, ...rest } = row;
  return rest;
}

export function publicInitiative(row: SandboxInitiative) {
  const { tenantId: _t, ...rest } = row;
  return rest;
}

export function publicDecision(row: SandboxDecision) {
  const { tenantId: _t, ...rest } = row;
  return rest;
}

export function publicTalentGap(row: SandboxTalentGap) {
  const { tenantId: _t, ...rest } = row;
  return rest;
}

export function publicPack(row: SandboxPack) {
  const { tenantId: _t, ...rest } = row;
  return rest;
}

export function publicCase(row: SandboxCase) {
  const { tenantId: _t, ...rest } = row;
  return rest;
}
