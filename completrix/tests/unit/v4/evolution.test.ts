import { describe, it, expect } from 'vitest';
import { EvolutionPlannerV4 } from '../../../src/autonomous/evolution/evolutionPlannerV4.js';
import type { FinalSystemSpec } from '../../../src/shared/v4/contracts/FinalSystemSpec.js';

const ctx = {
  sessionId: 'test-session',
  projectName: 'test-project',
  timestamp: new Date().toISOString(),
  metadata: {},
};

const current: FinalSystemSpec = {
  id: 'sys-v1',
  name: 'System v1',
  description: 'Version 1',
  version: '1.0.0',
  clusters: [{ id: 'c1', name: 'Core', modules: [], responsibilities: [] }],
  contracts: [],
  dependencies: { nodes: ['c1'], edges: [] },
};

const target: FinalSystemSpec = {
  id: 'sys-v2',
  name: 'System v2',
  description: 'Version 2',
  version: '2.0.0',
  clusters: [
    { id: 'c1', name: 'Core', modules: [], responsibilities: [] },
    { id: 'c2', name: 'New Cluster', modules: [], responsibilities: [] },
  ],
  contracts: [],
  dependencies: { nodes: ['c1', 'c2'], edges: [] },
};

describe('EvolutionPlannerV4', () => {
  it('should return an EvolutionPlan', async () => {
    const engine = new EvolutionPlannerV4(ctx);
    const result = await engine.plan(current, target);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('fromVersion', '1.0.0');
    expect(result).toHaveProperty('toVersion', '2.0.0');
    expect(result).toHaveProperty('steps');
    expect(result).toHaveProperty('breakingChanges');
  });

  it('should detect new clusters as additive steps', async () => {
    const engine = new EvolutionPlannerV4(ctx);
    const result = await engine.plan(current, target);
    expect(result.steps).toHaveLength(1);
    expect(result.steps[0]?.type).toBe('additive');
  });
});
