import { describe, it, expect } from 'vitest';
import { SelfGovernancePlannerV4 } from '../../../src/autonomous/self/selfGovernance/selfGovernancePlannerV4.js';
import { FixType } from '../../../src/shared/v4/self/fixes.js';
import type { Fix } from '../../../src/shared/v4/self/fixes.js';

const fix1: Fix = {
  id: 'fix-gap-missing-module-engine',
  gapId: 'gap-missing-module-engine',
  type: FixType.AddModule,
  description: 'Add missing engine module',
  patch: '// TODO: create module at /repo',
  estimatedEffort: 4,
};

const fix2: Fix = {
  id: 'fix-gap-missing-test-1',
  gapId: 'gap-missing-test-1',
  type: FixType.AddTest,
  description: 'Add missing test for engine module',
  patch: '// TODO: add test at /repo/tests/engine.test.ts',
  estimatedEffort: 2,
};

describe('SelfGovernancePlannerV4', () => {
  it('should return a SelfGovernancePlan', async () => {
    const planner = new SelfGovernancePlannerV4();
    const result = await planner.plan([fix1, fix2]);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('phases');
    expect(result).toHaveProperty('invariants');
    expect(result).toHaveProperty('risks');
  });

  it('should return a plan with an id', async () => {
    const planner = new SelfGovernancePlannerV4();
    const result = await planner.plan([fix1]);
    expect(typeof result.id).toBe('string');
    expect(result.id.length).toBeGreaterThan(0);
  });

  it('should return phases as an array', async () => {
    const planner = new SelfGovernancePlannerV4();
    const result = await planner.plan([fix1, fix2]);
    expect(Array.isArray(result.phases)).toBe(true);
  });

  it('should return invariants as an array', async () => {
    const planner = new SelfGovernancePlannerV4();
    const result = await planner.plan([fix1]);
    expect(Array.isArray(result.invariants)).toBe(true);
  });

  it('should return risks as an array', async () => {
    const planner = new SelfGovernancePlannerV4();
    const result = await planner.plan([fix1]);
    expect(Array.isArray(result.risks)).toBe(true);
  });

  it('should handle an empty fix list', async () => {
    const planner = new SelfGovernancePlannerV4();
    const result = await planner.plan([]);
    expect(result).toHaveProperty('id');
    expect(result.phases).toHaveLength(0);
  });
});
