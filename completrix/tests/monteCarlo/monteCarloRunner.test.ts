import { describe, it, expect } from 'vitest';
import { CreationEngineV4 } from '../../src/autonomous/creation/creationEngineV4.js';
import { DecompositionEngineV4 } from '../../src/autonomous/decomposition/decompositionEngineV4.js';
import { generateRandomFragment } from './generators/randomFragments.js';
import type { FinalSystemSpec } from '../../src/shared/v4/contracts/FinalSystemSpec.js';

const ctx = {
  sessionId: 'monte-carlo-session',
  projectName: 'monte-carlo',
  timestamp: new Date().toISOString(),
  metadata: {},
};

describe('Monte Carlo Runner', () => {
  it('should successfully process 100 random scenarios', async () => {
    const creator = new CreationEngineV4(ctx);
    const decomposer = new DecompositionEngineV4(ctx);
    const results = [];

    for (let i = 0; i < 100; i++) {
      const fragment = generateRandomFragment() as FinalSystemSpec;
      const map = await decomposer.decompose(fragment);
      results.push(map);
    }

    expect(results).toHaveLength(100);
    for (const result of results) {
      expect(result).toHaveProperty('clusters');
      expect(result).toHaveProperty('edges');
    }
  });
});
