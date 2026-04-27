import { describe, it, expect } from 'vitest';
import { GapFillerV4 } from '../../../src/autonomous/self/gapFiller/gapFillerV4.js';
import { GapType } from '../../../src/shared/v4/self/gaps.js';
import { FixType } from '../../../src/shared/v4/self/fixes.js';
import type { Gap } from '../../../src/shared/v4/self/gaps.js';

const missingModuleGap: Gap = {
  id: 'gap-missing-module-engine',
  type: GapType.MissingModule,
  severity: 'high',
  description: "No modules of type 'engine' found in repo index",
  affectedPaths: ['/repo'],
};

const missingContractGap: Gap = {
  id: 'gap-missing-contract-1',
  type: GapType.MissingContract,
  severity: 'high',
  description: 'No contract interface for engine module',
  affectedPaths: ['/repo/src/contracts'],
};

const missingGovernanceGap: Gap = {
  id: 'gap-missing-governance-1',
  type: GapType.MissingGovernance,
  severity: 'critical',
  description: 'No governance rules defined for the repo',
  affectedPaths: ['/repo'],
};

const missingTestGap: Gap = {
  id: 'gap-missing-test-1',
  type: GapType.MissingTest,
  severity: 'medium',
  description: 'No test coverage for engine module',
  affectedPaths: ['/repo/src/engine.ts'],
};

const incompleteRulePackGap: Gap = {
  id: 'gap-incomplete-rule-pack-1',
  type: GapType.IncompleteRulePack,
  severity: 'medium',
  description: 'Rule pack missing gap-scan rules',
  affectedPaths: ['/repo/src/rules'],
};

const schemaInconsistencyGap: Gap = {
  id: 'gap-schema-inconsistency-1',
  type: GapType.SchemaInconsistency,
  severity: 'low',
  description: 'Schema missing Zod validation for engine output',
  affectedPaths: ['/repo/src/schemas/engineSchema.ts'],
};

const allGaps: Gap[] = [
  missingModuleGap,
  missingContractGap,
  missingGovernanceGap,
  missingTestGap,
  incompleteRulePackGap,
  schemaInconsistencyGap,
];

describe('GapFillerV4', () => {
  it('should return an array of fixes', async () => {
    const filler = new GapFillerV4();
    const result = await filler.fill([missingModuleGap]);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return an empty array for empty gap list', async () => {
    const filler = new GapFillerV4();
    const result = await filler.fill([]);
    expect(result).toHaveLength(0);
  });

  it('should produce one fix per gap', async () => {
    const filler = new GapFillerV4();
    const result = await filler.fill([missingModuleGap, missingTestGap]);
    expect(result).toHaveLength(2);
  });

  it('should return fixes with required fields', async () => {
    const filler = new GapFillerV4();
    const fixes = await filler.fill([missingModuleGap]);
    for (const fix of fixes) {
      expect(fix).toHaveProperty('id');
      expect(fix).toHaveProperty('gapId');
      expect(fix).toHaveProperty('type');
      expect(fix).toHaveProperty('description');
      expect(fix).toHaveProperty('patch');
      expect(fix).toHaveProperty('estimatedEffort');
    }
  });

  it('should reference the correct gap id in each fix', async () => {
    const filler = new GapFillerV4();
    const fixes = await filler.fill([missingModuleGap]);
    expect(fixes[0]?.gapId).toBe(missingModuleGap.id);
  });

  it('should produce add-module fix for missing-module gap', async () => {
    const filler = new GapFillerV4();
    const fixes = await filler.fill([missingModuleGap]);
    expect(fixes).toHaveLength(1);
    expect(fixes[0]?.type).toBe(FixType.AddModule);
    expect(fixes[0]?.gapId).toBe(missingModuleGap.id);
  });

  it('should produce add-contract fix for missing-contract gap', async () => {
    const filler = new GapFillerV4();
    const fixes = await filler.fill([missingContractGap]);
    expect(fixes).toHaveLength(1);
    expect(fixes[0]?.type).toBe(FixType.AddContract);
    expect(fixes[0]?.gapId).toBe(missingContractGap.id);
  });

  it('should produce add-governance fix for missing-governance gap', async () => {
    const filler = new GapFillerV4();
    const fixes = await filler.fill([missingGovernanceGap]);
    expect(fixes).toHaveLength(1);
    expect(fixes[0]?.type).toBe(FixType.AddGovernance);
    expect(fixes[0]?.gapId).toBe(missingGovernanceGap.id);
  });

  it('should produce add-test fix for missing-test gap', async () => {
    const filler = new GapFillerV4();
    const fixes = await filler.fill([missingTestGap]);
    expect(fixes).toHaveLength(1);
    expect(fixes[0]?.type).toBe(FixType.AddTest);
    expect(fixes[0]?.gapId).toBe(missingTestGap.id);
  });

  it('should produce add-rule-pack fix for incomplete-rule-pack gap', async () => {
    const filler = new GapFillerV4();
    const fixes = await filler.fill([incompleteRulePackGap]);
    expect(fixes).toHaveLength(1);
    expect(fixes[0]?.type).toBe(FixType.AddRulePack);
    expect(fixes[0]?.gapId).toBe(incompleteRulePackGap.id);
  });

  it('should produce fix-schema fix for schema-inconsistency gap', async () => {
    const filler = new GapFillerV4();
    const fixes = await filler.fill([schemaInconsistencyGap]);
    expect(fixes).toHaveLength(1);
    expect(fixes[0]?.type).toBe(FixType.FixSchema);
    expect(fixes[0]?.gapId).toBe(schemaInconsistencyGap.id);
  });

  it('should produce one fix for every gap type when all 6 gap types are provided', async () => {
    const filler = new GapFillerV4();
    const fixes = await filler.fill(allGaps);
    expect(fixes).toHaveLength(allGaps.length);
    for (const fix of fixes) {
      const matchingGap = allGaps.find(g => g.id === fix.gapId);
      expect(matchingGap).toBeDefined();
    }
  });

  it('should assign fix id derived from gap id', async () => {
    const filler = new GapFillerV4();
    const fixes = await filler.fill(allGaps);
    for (const fix of fixes) {
      expect(fix.id).toBe(`fix-${fix.gapId}`);
    }
  });

  it('should return a positive estimatedEffort for every fix', async () => {
    const filler = new GapFillerV4();
    const fixes = await filler.fill(allGaps);
    for (const fix of fixes) {
      expect(fix.estimatedEffort).toBeGreaterThan(0);
    }
  });
});
