import { describe, it, expect } from 'vitest';
import { SelfCompleteEngineV1 } from '../../../src/autonomous/self/selfComplete/selfCompleteEngineV1.js';
import { ModuleType } from '../../../src/shared/v4/self/common.js';
import type { RepoIndex } from '../../../src/shared/v4/self/repoIndex.js';

const emptyIndex: RepoIndex = {
  root: '/repo',
  modules: [],
  lastScanned: new Date().toISOString(),
  totalFiles: 0,
};

const fullIndex: RepoIndex = {
  root: '/repo',
  modules: [
    { path: '/repo/src/engine.ts', type: ModuleType.Engine, exports: ['EngineV4'] },
    { path: '/repo/src/contract.ts', type: ModuleType.Contract, exports: ['MyContract'] },
    { path: '/repo/src/schema.ts', type: ModuleType.Schema, exports: ['mySchema'] },
    { path: '/repo/src/agent.ts', type: ModuleType.Agent, exports: ['MyAgent'] },
    { path: '/repo/src/governance.ts', type: ModuleType.Governance, exports: ['GovernanceRule'] },
    { path: '/repo/tests/engine.test.ts', type: ModuleType.Test, exports: [] },
    { path: '/repo/src/pipeline.ts', type: ModuleType.Pipeline, exports: ['Pipeline'] },
    { path: '/repo/src/rules/rule1.ts', type: ModuleType.Util, exports: ['rule1'] },
    { path: '/repo/src/rules/rule2.ts', type: ModuleType.Util, exports: ['rule2'] },
    { path: '/repo/src/rules/rule3.ts', type: ModuleType.Util, exports: ['rule3'] },
  ],
  lastScanned: new Date().toISOString(),
  totalFiles: 10,
};

describe('SelfCompleteEngineV1', () => {
  it('should return a CompletionReport', async () => {
    const engine = new SelfCompleteEngineV1();
    const result = await engine.complete(emptyIndex);
    expect(result).toHaveProperty('status');
    expect(result).toHaveProperty('remainingGaps');
    expect(result).toHaveProperty('appliedFixes');
    expect(result).toHaveProperty('governancePlan');
  });

  it('should return status "complete" when no gaps remain after fixing', async () => {
    const engine = new SelfCompleteEngineV1();
    const result = await engine.complete(emptyIndex);
    expect(result.status).toBe('complete');
  });

  it('should return an empty remainingGaps array when complete', async () => {
    const engine = new SelfCompleteEngineV1();
    const result = await engine.complete(emptyIndex);
    expect(result.remainingGaps).toHaveLength(0);
  });

  it('should return status "complete" for a fully populated index', async () => {
    const engine = new SelfCompleteEngineV1();
    const result = await engine.complete(fullIndex);
    expect(result.status).toBe('complete');
  });

  it('should return empty appliedFixes for a fully populated index', async () => {
    const engine = new SelfCompleteEngineV1();
    const result = await engine.complete(fullIndex);
    expect(result.appliedFixes).toHaveLength(0);
  });

  it('should return a governance plan with an id', async () => {
    const engine = new SelfCompleteEngineV1();
    const result = await engine.complete(emptyIndex);
    expect(typeof result.governancePlan.id).toBe('string');
    expect(result.governancePlan.id.length).toBeGreaterThan(0);
  });

  it('should return appliedFixes with required fields', async () => {
    const engine = new SelfCompleteEngineV1();
    const result = await engine.complete(emptyIndex);
    for (const af of result.appliedFixes) {
      expect(af).toHaveProperty('fix');
      expect(af).toHaveProperty('appliedAt');
      expect(af).toHaveProperty('status');
    }
  });

  it('should not mutate the original index', async () => {
    const engine = new SelfCompleteEngineV1();
    const originalModuleCount = emptyIndex.modules.length;
    await engine.complete(emptyIndex);
    expect(emptyIndex.modules).toHaveLength(originalModuleCount);
  });

  it('should include mutation safety invariants in governance plan', async () => {
    const engine = new SelfCompleteEngineV1();
    const result = await engine.complete(emptyIndex);
    const hasMutationSafety = result.governancePlan.invariants.some(inv =>
      inv.toLowerCase().includes('mutation') || inv.toLowerCase().includes('circular')
    );
    expect(hasMutationSafety).toBe(true);
  });
});
