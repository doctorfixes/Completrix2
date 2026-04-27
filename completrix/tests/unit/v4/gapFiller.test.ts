import { describe, it, expect } from 'vitest';
import { GapFillerV4 } from '../../../src/autonomous/self/gapFiller/gapFillerV4.js';
import { GapType } from '../../../src/shared/v4/self/gaps.js';
import type { Gap } from '../../../src/shared/v4/self/gaps.js';

const missingModuleGap: Gap = {
  id: 'gap-missing-module-engine',
  type: GapType.MissingModule,
  severity: 'high',
  description: "No modules of type 'engine' found in repo index",
  affectedPaths: ['/repo'],
};

const missingTestGap: Gap = {
  id: 'gap-missing-test-1',
  type: GapType.MissingTest,
  severity: 'medium',
  description: 'No test coverage for engine module',
  affectedPaths: ['/repo/src/engine.ts'],
};

describe('GapFillerV4', () => {
  it('should return an array of fixes', async () => {
    const filler = new GapFillerV4();
    const result = await filler.fill([missingModuleGap]);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should return an empty array for empty gap list', async () => {
    const filler = new GapFillerV4();
    const result = await filler.fill([]);
    expect(result).toHaveLength(0);
  });

  it('should produce one fix per gap', async () => {
    const filler = new GapFillerV4();
    const result = await filler.fill([missingModuleGap, missingTestGap]);
    expect(result).toHaveLength(2);
  });

  it('should return fixes with required fields', async () => {
    const filler = new GapFillerV4();
    const fixes = await filler.fill([missingModuleGap]);
    for (const fix of fixes) {
      expect(fix).toHaveProperty('id');
      expect(fix).toHaveProperty('gapId');
      expect(fix).toHaveProperty('type');
      expect(fix).toHaveProperty('description');
      expect(fix).toHaveProperty('patch');
      expect(fix).toHaveProperty('estimatedEffort');
    }
  });

  it('should reference the correct gap id in each fix', async () => {
    const filler = new GapFillerV4();
    const fixes = await filler.fill([missingModuleGap]);
    expect(fixes[0]?.gapId).toBe(missingModuleGap.id);
  });
});
