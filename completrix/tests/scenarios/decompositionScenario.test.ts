import { describe, it, expect } from 'vitest';
import { DecompositionEngineV4 } from '../../src/autonomous/decomposition/decompositionEngineV4.js';
import type { FinalSystemSpec } from '../../src/shared/v4/contracts/FinalSystemSpec.js';

const ctx = {
  sessionId: 'scenario-session',
  projectName: 'decomposition-test',
  timestamp: new Date().toISOString(),
  metadata: {},
};

describe('Decomposition Scenario', () => {
  it('should decompose a complex system spec', async () => {
    const spec: FinalSystemSpec = {
      id: 'complex-system',
      name: 'Complex System',
      description: 'A complex multi-cluster system',
      version: '1.0.0',
      clusters: [
        { id: 'api', name: 'API Gateway', modules: ['gateway'], responsibilities: ['routing'] },
        { id: 'auth', name: 'Auth Service', modules: ['auth'], responsibilities: ['authentication'] },
        { id: 'data', name: 'Data Layer', modules: ['db'], responsibilities: ['persistence'] },
      ],
      contracts: [],
      dependencies: {
        nodes: ['api', 'auth', 'data'],
        edges: [
          { from: 'api', to: 'auth', type: 'calls' },
          { from: 'api', to: 'data', type: 'calls' },
        ],
      },
    };

    const engine = new DecompositionEngineV4(ctx);
    const result = await engine.decompose(spec);
    expect(Object.keys(result.clusters)).toHaveLength(3);
    expect(result.edges).toHaveLength(2);
  });
});
