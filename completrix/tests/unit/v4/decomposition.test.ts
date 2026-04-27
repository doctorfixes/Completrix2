import { describe, it, expect } from 'vitest';
import { DecompositionEngineV4 } from '../../../src/autonomous/decomposition/decompositionEngineV4.js';
import type { FinalSystemSpec } from '../../../src/shared/v4/contracts/FinalSystemSpec.js';

const ctx = {
  sessionId: 'test-session',
  projectName: 'test-project',
  timestamp: new Date().toISOString(),
  metadata: {},
};

const mockSpec: FinalSystemSpec = {
  id: 'spec-1',
  name: 'Test System',
  description: 'A test system',
  version: '1.0.0',
  clusters: [
    { id: 'c1', name: 'Cluster 1', modules: ['m1'], responsibilities: ['resp1'] },
    { id: 'c2', name: 'Cluster 2', modules: ['m2'], responsibilities: ['resp2'] },
  ],
  contracts: [],
  dependencies: {
    nodes: ['c1', 'c2'],
    edges: [{ from: 'c1', to: 'c2', type: 'depends-on' }],
  },
};

describe('DecompositionEngineV4', () => {
  it('should return a ClusterStructureMap', async () => {
    const engine = new DecompositionEngineV4(ctx);
    const result = await engine.decompose(mockSpec);
    expect(result).toHaveProperty('clusters');
    expect(result).toHaveProperty('edges');
    expect(Object.keys(result.clusters)).toHaveLength(2);
  });

  it('should map edges correctly', async () => {
    const engine = new DecompositionEngineV4(ctx);
    const result = await engine.decompose(mockSpec);
    expect(result.edges).toHaveLength(1);
    expect(result.edges[0]).toMatchObject({ from: 'c1', to: 'c2' });
  });
});
