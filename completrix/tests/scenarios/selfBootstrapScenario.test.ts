import { describe, it, expect } from 'vitest';
import { GapScannerV4 } from '../../src/autonomous/self/gapScanner/gapScannerV4.js';
import { GapFillerV4 } from '../../src/autonomous/self/gapFiller/gapFillerV4.js';
import { SelfGovernancePlannerV4 } from '../../src/autonomous/self/selfGovernance/selfGovernancePlannerV4.js';
import { ModuleType } from '../../src/shared/v4/self/common.js';
import type { RepoIndex } from '../../src/shared/v4/self/repoIndex.js';

const ctx = {
  sessionId: 'scenario-session',
  projectName: 'self-bootstrap-test',
  timestamp: new Date().toISOString(),
  metadata: {},
};

// Intentionally sparse index to generate gaps
const sparseIndex: RepoIndex = {
  root: '/repo',
  modules: [
    { path: '/repo/src/engine.ts', type: ModuleType.Engine, exports: ['EngineV4'] },
  ],
  lastScanned: ctx.timestamp,
  totalFiles: 1,
};

describe('Self-Bootstrap Scenario', () => {
  it('should complete the full RepoIndex → GapScanner → GapFiller → SelfGovernancePlanner pipeline', async () => {
    const scanner = new GapScannerV4();
    const filler = new GapFillerV4();
    const planner = new SelfGovernancePlannerV4();

    const gaps = await scanner.scan(sparseIndex);
    expect(Array.isArray(gaps)).toBe(true);
    expect(gaps.length).toBeGreaterThan(0);

    const fixes = await filler.fill(gaps);
    expect(Array.isArray(fixes)).toBe(true);
    expect(fixes.length).toBeGreaterThan(0);

    const governancePlan = await planner.plan(fixes);
    expect(governancePlan).toHaveProperty('id');
    expect(governancePlan).toHaveProperty('phases');
    expect(governancePlan).toHaveProperty('invariants');
    expect(governancePlan).toHaveProperty('risks');
  });

  it('should produce a fix for every gap', async () => {
    const scanner = new GapScannerV4();
    const filler = new GapFillerV4();

    const gaps = await scanner.scan(sparseIndex);
    const fixes = await filler.fill(gaps);

    expect(fixes).toHaveLength(gaps.length);
    for (const fix of fixes) {
      const matchingGap = gaps.find(g => g.id === fix.gapId);
      expect(matchingGap).toBeDefined();
    }
  });

  it('should produce a governance plan with phases when fixes are non-empty', async () => {
    const scanner = new GapScannerV4();
    const filler = new GapFillerV4();
    const planner = new SelfGovernancePlannerV4();

    const gaps = await scanner.scan(sparseIndex);
    const fixes = await filler.fill(gaps);
    const plan = await planner.plan(fixes);

    expect(plan.phases.length).toBeGreaterThan(0);
  });

  it('should produce an empty governance plan for a fully-populated index', async () => {
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
      ],
      lastScanned: ctx.timestamp,
      totalFiles: 7,
    };

    const scanner = new GapScannerV4();
    const filler = new GapFillerV4();
    const planner = new SelfGovernancePlannerV4();

    const gaps = await scanner.scan(fullIndex);
    const fixes = await filler.fill(gaps);
    const plan = await planner.plan(fixes);

    expect(plan.phases).toHaveLength(0);
  });
});
