import { describe, it, expect } from 'vitest';
import { FixApplierV1 } from '../../../src/autonomous/self/fixApplier/fixApplierV1.js';
import { FixType } from '../../../src/shared/v4/self/fixes.js';
import { ModuleType } from '../../../src/shared/v4/self/common.js';
import type { Fix } from '../../../src/shared/v4/self/fixes.js';
import type { RepoIndex } from '../../../src/shared/v4/self/repoIndex.js';

const baseIndex: RepoIndex = {
  root: '/repo',
  modules: [],
  lastScanned: new Date().toISOString(),
  totalFiles: 0,
};

const addModuleFix: Fix = {
  id: 'fix-gap-missing-module-engine',
  gapId: 'gap-missing-module-engine',
  type: FixType.AddModule,
  description: 'Add missing engine module',
  patch: '// TODO: create module at /repo',
  estimatedEffort: 4,
};

const addContractFix: Fix = {
  id: 'fix-gap-no-contracts',
  gapId: 'gap-no-contracts',
  type: FixType.AddContract,
  description: 'Add contract module',
  patch: '// TODO: create contract',
  estimatedEffort: 3,
};

const addGovernanceFix: Fix = {
  id: 'fix-gap-no-governance',
  gapId: 'gap-no-governance',
  type: FixType.AddGovernance,
  description: 'Add governance module',
  patch: '// TODO: create governance',
  estimatedEffort: 2,
};

const addTestFix: Fix = {
  id: 'fix-gap-no-tests',
  gapId: 'gap-no-tests',
  type: FixType.AddTest,
  description: 'Add test module',
  patch: '// TODO: create test',
  estimatedEffort: 6,
};

const addRulePackFix: Fix = {
  id: 'fix-gap-incomplete-rule-pack',
  gapId: 'gap-incomplete-rule-pack',
  type: FixType.AddRulePack,
  description: 'Add rule pack',
  patch: '// TODO: add rules',
  estimatedEffort: 3,
};

const fixSchemaFix: Fix = {
  id: 'fix-gap-schema-inconsistency',
  gapId: 'gap-schema-inconsistency',
  type: FixType.FixSchema,
  description: 'Fix schema inconsistency',
  patch: '// TODO: add schema',
  estimatedEffort: 2,
};

describe('FixApplierV1', () => {
  it('should return appliedFixes and updatedIndex', () => {
    const applier = new FixApplierV1();
    const result = applier.apply([addModuleFix], { ...baseIndex, modules: [] });
    expect(result).toHaveProperty('appliedFixes');
    expect(result).toHaveProperty('updatedIndex');
  });

  it('should return an empty result for empty fix list', () => {
    const applier = new FixApplierV1();
    const result = applier.apply([], baseIndex);
    expect(result.appliedFixes).toHaveLength(0);
    expect(result.updatedIndex.modules).toHaveLength(0);
  });

  it('should add an engine module when applying add-module fix', () => {
    const applier = new FixApplierV1();
    const result = applier.apply([addModuleFix], { ...baseIndex, modules: [] });
    const added = result.updatedIndex.modules.find(m => m.type === ModuleType.Engine);
    expect(added).toBeDefined();
  });

  it('should add a contract module when applying add-contract fix', () => {
    const applier = new FixApplierV1();
    const result = applier.apply([addContractFix], { ...baseIndex, modules: [] });
    const added = result.updatedIndex.modules.find(m => m.type === ModuleType.Contract);
    expect(added).toBeDefined();
  });

  it('should add a governance module when applying add-governance fix', () => {
    const applier = new FixApplierV1();
    const result = applier.apply([addGovernanceFix], { ...baseIndex, modules: [] });
    const added = result.updatedIndex.modules.find(m => m.type === ModuleType.Governance);
    expect(added).toBeDefined();
  });

  it('should add a test module when applying add-test fix', () => {
    const applier = new FixApplierV1();
    const result = applier.apply([addTestFix], { ...baseIndex, modules: [] });
    const added = result.updatedIndex.modules.find(m => m.type === ModuleType.Test);
    expect(added).toBeDefined();
  });

  it('should add rule modules up to minimum count when applying add-rule-pack fix', () => {
    const applier = new FixApplierV1();
    const indexWithOneRule: RepoIndex = {
      ...baseIndex,
      modules: [{ path: '/repo/src/rules/rule1.ts', type: ModuleType.Util, exports: ['rule1'] }],
    };
    const result = applier.apply([addRulePackFix], indexWithOneRule);
    const ruleMods = result.updatedIndex.modules.filter(m => m.path.includes('/rules/'));
    expect(ruleMods.length).toBeGreaterThanOrEqual(3);
  });

  it('should add schema modules to match contract count when applying fix-schema fix', () => {
    const applier = new FixApplierV1();
    const indexWithContract: RepoIndex = {
      ...baseIndex,
      modules: [{ path: '/repo/src/contracts/c1.ts', type: ModuleType.Contract, exports: ['C1'] }],
    };
    const result = applier.apply([fixSchemaFix], indexWithContract);
    const schemas = result.updatedIndex.modules.filter(m => m.type === ModuleType.Schema);
    const contracts = result.updatedIndex.modules.filter(m => m.type === ModuleType.Contract);
    expect(schemas.length).toBeGreaterThanOrEqual(contracts.length);
  });

  it('should mark applied fix with status "applied"', () => {
    const applier = new FixApplierV1();
    const result = applier.apply([addModuleFix], { ...baseIndex, modules: [] });
    expect(result.appliedFixes[0]?.status).toBe('applied');
  });

  it('should mark duplicate gap fixes as skipped', () => {
    const applier = new FixApplierV1();
    const dupFix: Fix = { ...addModuleFix, id: 'fix-dup' };
    const result = applier.apply([addModuleFix, dupFix], { ...baseIndex, modules: [] });
    const skipped = result.appliedFixes.filter(af => af.status === 'skipped');
    expect(skipped.length).toBeGreaterThan(0);
  });

  it('should not mutate the original index', () => {
    const applier = new FixApplierV1();
    const original: RepoIndex = { ...baseIndex, modules: [] };
    applier.apply([addModuleFix], original);
    expect(original.modules).toHaveLength(0);
  });

  it('should set appliedAt to a valid ISO string', () => {
    const applier = new FixApplierV1();
    const result = applier.apply([addModuleFix], { ...baseIndex, modules: [] });
    const appliedAt = result.appliedFixes[0]?.appliedAt;
    expect(appliedAt).toBeDefined();
    expect(() => new Date(appliedAt!)).not.toThrow();
  });
});
