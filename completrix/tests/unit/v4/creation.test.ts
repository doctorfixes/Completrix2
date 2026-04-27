import { describe, it, expect } from 'vitest';
import { CreationEngineV4 } from '../../../src/autonomous/creation/creationEngineV4.js';
import type { ExecutionPlan } from '../../../src/shared/v4/contracts/ExecutionPlan.js';

const ctx = {
  sessionId: 'test-session',
  projectName: 'test-project',
  timestamp: new Date().toISOString(),
  metadata: {},
};

const mockPlan: ExecutionPlan = {
  id: 'plan-1',
  phases: [
    { id: 'p1', name: 'Phase 1', tasks: ['task1', 'task2'], dependsOn: [], estimatedDuration: 5 },
    { id: 'p2', name: 'Phase 2', tasks: ['task3'], dependsOn: ['p1'], estimatedDuration: 3 },
  ],
  estimatedDuration: 8,
  parallelizable: false,
};

describe('CreationEngineV4', () => {
  it('should create a FinalSystemSpec from an ExecutionPlan', async () => {
    const engine = new CreationEngineV4(ctx);
    const result = await engine.create(mockPlan);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('clusters');
    expect(result.clusters).toHaveLength(2);
    expect(result.version).toBe('1.0.0');
  });

  it('should map phases to clusters', async () => {
    const engine = new CreationEngineV4(ctx);
    const result = await engine.create(mockPlan);
    expect(result.clusters[0]?.id).toBe('p1');
    expect(result.clusters[1]?.id).toBe('p2');
  });
});
