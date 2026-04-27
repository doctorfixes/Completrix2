import { describe, it, expect } from 'vitest';
import { PortfolioOptimizerV4 } from '../../../src/autonomous/portfolio/portfolioOptimizerV4.js';
import type { FinalSystemSpec } from '../../../src/shared/v4/contracts/FinalSystemSpec.js';

const ctx = {
  sessionId: 'test-session',
  projectName: 'test-project',
  timestamp: new Date().toISOString(),
  metadata: {},
};

const makeSpec = (id: string): FinalSystemSpec => ({
  id,
  name: `System ${id}`,
  description: `System ${id} description`,
  version: '1.0.0',
  clusters: [],
  contracts: [],
  dependencies: { nodes: [], edges: [] },
});

describe('PortfolioOptimizerV4', () => {
  it('should return a PortfolioOptimizationPlan', async () => {
    const engine = new PortfolioOptimizerV4(ctx);
    const result = await engine.optimize([makeSpec('s1'), makeSpec('s2')]);
    expect(result).toHaveProperty('portfolioId');
    expect(result).toHaveProperty('systems');
    expect(result).toHaveProperty('optimizations');
    expect(result).toHaveProperty('totalValue');
    expect(result.systems).toHaveLength(2);
  });

  it('should handle empty system list', async () => {
    const engine = new PortfolioOptimizerV4(ctx);
    const result = await engine.optimize([]);
    expect(result.systems).toHaveLength(0);
    expect(result.totalValue).toBe(0);
  });
});
