import { describe, it, expect } from 'vitest';
import { GapScannerV4 } from '../../../src/autonomous/self/gapScanner/gapScannerV4.js';
import { ModuleType } from '../../../src/shared/v4/self/common.js';
import type { RepoIndex } from '../../../src/shared/v4/self/repoIndex.js';

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
  lastScanned: new Date().toISOString(),
  totalFiles: 7,
};

const emptyIndex: RepoIndex = {
  root: '/repo',
  modules: [],
  lastScanned: new Date().toISOString(),
  totalFiles: 0,
};

describe('GapScannerV4', () => {
  it('should return an array of gaps', async () => {
    const scanner = new GapScannerV4();
    const result = await scanner.scan(emptyIndex);
    expect(Array.isArray(result)).toBe(true);
  });

  it('should detect missing module types on an empty index', async () => {
    const scanner = new GapScannerV4();
    const gaps = await scanner.scan(emptyIndex);
    const types = gaps.map(g => g.type);
    expect(types).toContain('missing-module');
  });

  it('should return gaps with required fields', async () => {
    const scanner = new GapScannerV4();
    const gaps = await scanner.scan(emptyIndex);
    for (const gap of gaps) {
      expect(gap).toHaveProperty('id');
      expect(gap).toHaveProperty('type');
      expect(gap).toHaveProperty('severity');
      expect(gap).toHaveProperty('description');
      expect(gap).toHaveProperty('affectedPaths');
    }
  });

  it('should return no missing-module gaps when all required types are present', async () => {
    const scanner = new GapScannerV4();
    const gaps = await scanner.scan(fullIndex);
    const missingModuleGaps = gaps.filter(g => g.type === 'missing-module');
    expect(missingModuleGaps).toHaveLength(0);
  });
});
