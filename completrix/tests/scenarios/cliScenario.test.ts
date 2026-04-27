import { describe, it, expect } from 'vitest';
import { ClarificationEngineV4 } from '../../src/autonomous/clarification/clarificationEngineV4.js';
import { CreationEngineV4 } from '../../src/autonomous/creation/creationEngineV4.js';
import { DecompositionEngineV4 } from '../../src/autonomous/decomposition/decompositionEngineV4.js';
import { PortfolioOptimizerV4 } from '../../src/autonomous/portfolio/portfolioOptimizerV4.js';
import { EvolutionPlannerV4 } from '../../src/autonomous/evolution/evolutionPlannerV4.js';
import { GapScannerV4 } from '../../src/autonomous/self/gapScanner/gapScannerV4.js';
import { GapFillerV4 } from '../../src/autonomous/self/gapFiller/gapFillerV4.js';
import { SelfGovernancePlannerV4 } from '../../src/autonomous/self/selfGovernance/selfGovernancePlannerV4.js';
import { validateFinalSystemSpec } from '../../src/shared/v4/schemas/finalSystemSpecSchema.js';
import { validateExecutionPlan } from '../../src/shared/v4/schemas/executionPlanSchema.js';
import { validateEvolutionPlan } from '../../src/shared/v4/schemas/evolutionPlanSchema.js';
import { validatePortfolioOptimizationPlan } from '../../src/shared/v4/schemas/portfolioOptimizationPlanSchema.js';
import { validateRepoIndex } from '../../src/shared/v4/schemas/repoIndexSchema.js';
import { validateGap } from '../../src/shared/v4/schemas/gapSchema.js';
import { validateFix } from '../../src/shared/v4/schemas/fixSchema.js';
import { ModuleType } from '../../src/shared/v4/self/common.js';

const ctx = {
  sessionId: 'cli-scenario-session',
  projectName: 'cli-test',
  timestamp: new Date().toISOString(),
  metadata: {},
};

// ── Single-system flow ─────────────────────────────────────────────────────────

describe('CLI Scenario: single-system flow (clarify → create → decompose → evolve)', () => {
  it('clarify produces validated JSON output', async () => {
    const engine = new ClarificationEngineV4(ctx);
    const result = await engine.clarify('Build an e-commerce platform');
    expect(result).toHaveProperty('original');
    expect(result).toHaveProperty('clarified');
    expect(result).toHaveProperty('assumptions');
    expect(result).toHaveProperty('questions');
  });

  it('create produces a FinalSystemSpec that passes schema validation', async () => {
    const planRaw = {
      id: 'single-plan',
      phases: [
        { id: 'api', name: 'API', tasks: ['rest', 'graphql'], dependsOn: [], estimatedDuration: 5 },
        { id: 'db', name: 'Database', tasks: ['schema', 'migrations'], dependsOn: ['api'], estimatedDuration: 3 },
      ],
      estimatedDuration: 8,
      parallelizable: false,
    };
    const plan = validateExecutionPlan(planRaw);
    const engine = new CreationEngineV4(ctx);
    const spec = await engine.create(plan);
    const validated = validateFinalSystemSpec(spec);
    expect(validated.id).toBeTruthy();
    expect(validated.clusters).toHaveLength(2);
  });

  it('decompose produces a ClusterStructureMap from a FinalSystemSpec', async () => {
    const specRaw = {
      id: 'sys-1',
      name: 'E-Commerce',
      description: 'An e-commerce platform',
      version: '1.0.0',
      clusters: [
        { id: 'frontend', name: 'Frontend', modules: ['ui'], responsibilities: ['user interaction'] },
        { id: 'backend', name: 'Backend', modules: ['api'], responsibilities: ['business logic'] },
      ],
      contracts: [],
      dependencies: { nodes: ['frontend', 'backend'], edges: [{ from: 'frontend', to: 'backend', type: 'calls' }] },
    };
    const spec = validateFinalSystemSpec(specRaw);
    const engine = new DecompositionEngineV4(ctx);
    const map = await engine.decompose(spec);
    expect(map).toHaveProperty('clusters');
    expect(map).toHaveProperty('edges');
    expect(Object.keys(map.clusters)).toHaveLength(2);
  });

  it('evolve produces an EvolutionPlan that passes schema validation', async () => {
    const current = validateFinalSystemSpec({
      id: 'v1', name: 'System v1', description: 'Version 1', version: '1.0.0',
      clusters: [{ id: 'core', name: 'Core', modules: ['m1'], responsibilities: ['core'] }],
      contracts: [],
      dependencies: { nodes: ['core'], edges: [] },
    });
    const target = validateFinalSystemSpec({
      id: 'v2', name: 'System v2', description: 'Version 2', version: '2.0.0',
      clusters: [
        { id: 'core', name: 'Core', modules: ['m1'], responsibilities: ['core'] },
        { id: 'new-feature', name: 'New Feature', modules: ['m2'], responsibilities: ['feature'] },
      ],
      contracts: [],
      dependencies: { nodes: ['core', 'new-feature'], edges: [] },
    });
    const engine = new EvolutionPlannerV4(ctx);
    const plan = await engine.plan(current, target);
    const validated = validateEvolutionPlan(plan);
    expect(validated.steps.length).toBeGreaterThan(0);
    expect(validated.steps[0].type).toBe('additive');
  });
});

// ── Portfolio flow ─────────────────────────────────────────────────────────────

describe('CLI Scenario: portfolio flow (optimize)', () => {
  it('optimize produces a PortfolioOptimizationPlan that passes schema validation', async () => {
    const makeSpec = (id: string) => validateFinalSystemSpec({
      id, name: `System ${id}`, description: `Desc ${id}`, version: '1.0.0',
      clusters: [{ id: `${id}-core`, name: 'Core', modules: ['m'], responsibilities: ['r'] }],
      contracts: [],
      dependencies: { nodes: [`${id}-core`], edges: [] },
    });

    const systems = [makeSpec('sys-a'), makeSpec('sys-b')];
    const engine = new PortfolioOptimizerV4(ctx);
    const plan = await engine.optimize(systems);
    const validated = validatePortfolioOptimizationPlan(plan);
    expect(validated.systems).toHaveLength(2);
    expect(validated.totalValue).toBeGreaterThan(0);
  });
});

// ── Self-bootstrap flow ────────────────────────────────────────────────────────

describe('CLI Scenario: self-bootstrap flow (self-scan → self-fix → self-govern)', () => {
  it('produces validated Gap[] output from self-scan', async () => {
    const indexRaw = {
      root: '/repo',
      modules: [
        { path: '/repo/src/engine.ts', type: ModuleType.Engine, exports: ['E'] },
      ],
      lastScanned: new Date().toISOString(),
      totalFiles: 1,
    };
    const index = validateRepoIndex(indexRaw);
    const scanner = new GapScannerV4();
    const gaps = await scanner.scan(index);
    expect(gaps.length).toBeGreaterThan(0);
    for (const g of gaps) {
      validateGap(g);
      expect(g).toHaveProperty('id');
      expect(g).toHaveProperty('type');
    }
  });

  it('produces validated Fix[] output from self-fix', async () => {
    const indexRaw = {
      root: '/repo',
      modules: [
        { path: '/repo/src/engine.ts', type: ModuleType.Engine, exports: ['E'] },
      ],
      lastScanned: new Date().toISOString(),
      totalFiles: 1,
    };
    const index = validateRepoIndex(indexRaw);
    const scanner = new GapScannerV4();
    const filler = new GapFillerV4();
    const gaps = await scanner.scan(index);
    const fixes = await filler.fill(gaps);
    expect(fixes.length).toBeGreaterThan(0);
    for (const f of fixes) {
      validateFix(f);
      expect(f).toHaveProperty('id');
      expect(f).toHaveProperty('gapId');
    }
  });

  it('produces a validated SelfGovernancePlan from self-govern', async () => {
    const indexRaw = {
      root: '/repo',
      modules: [
        { path: '/repo/src/engine.ts', type: ModuleType.Engine, exports: ['E'] },
      ],
      lastScanned: new Date().toISOString(),
      totalFiles: 1,
    };
    const index = validateRepoIndex(indexRaw);
    const scanner = new GapScannerV4();
    const filler = new GapFillerV4();
    const planner = new SelfGovernancePlannerV4();
    const gaps = await scanner.scan(index);
    const fixes = await filler.fill(gaps);
    const plan = await planner.plan(fixes);
    expect(plan).toHaveProperty('id');
    expect(plan).toHaveProperty('phases');
    expect(plan.phases.length).toBeGreaterThan(0);
  });
});
