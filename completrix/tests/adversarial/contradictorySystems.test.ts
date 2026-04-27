import { describe, it, expect } from 'vitest';
import { EvolutionPlannerV4 } from '../../src/autonomous/evolution/evolutionPlannerV4.js';
import type { FinalSystemSpec } from '../../src/shared/v4/contracts/FinalSystemSpec.js';

const ctx = {
  sessionId: 'adversarial-session',
  projectName: 'adversarial-test',
  timestamp: new Date().toISOString(),
  metadata: {},
};

describe('Contradictory Systems', () => {
  it('should handle evolution from system with many clusters to one with none', async () => {
    const current: FinalSystemSpec = {
      id: 'sys-large',
      name: 'Large System',
      description: 'System with many clusters',
      version: '1.0.0',
      clusters: [
        { id: 'c1', name: 'C1', modules: [], responsibilities: [] },
        { id: 'c2', name: 'C2', modules: [], responsibilities: [] },
        { id: 'c3', name: 'C3', modules: [], responsibilities: [] },
      ],
      contracts: [],
      dependencies: { nodes: ['c1', 'c2', 'c3'], edges: [] },
    };

    const target: FinalSystemSpec = {
      id: 'sys-small',
      name: 'Small System',
      description: 'System with no clusters',
      version: '2.0.0',
      clusters: [],
      contracts: [],
      dependencies: { nodes: [], edges: [] },
    };

    const engine = new EvolutionPlannerV4(ctx);
    const plan = await engine.plan(current, target);
    expect(plan).toHaveProperty('steps');
    expect(plan.fromVersion).toBe('1.0.0');
    expect(plan.toVersion).toBe('2.0.0');
  });
});
