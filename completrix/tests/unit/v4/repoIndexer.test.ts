import { describe, it, expect } from 'vitest';
import { RepoIndexerV4 } from '../../../src/autonomous/self/indexer/repoIndexerV4.js';
import { ModuleType } from '../../../src/shared/v4/self/common.js';
import { mkdtempSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

function makeTempRepo(): string {
  const root = mkdtempSync(join(tmpdir(), 'completrix-test-'));

  mkdirSync(join(root, 'src', 'autonomous', 'myEngine'), { recursive: true });
  mkdirSync(join(root, 'src', 'shared', 'v4', 'contracts'), { recursive: true });
  mkdirSync(join(root, 'src', 'shared', 'v4', 'schemas'), { recursive: true });
  mkdirSync(join(root, 'src', 'runtime', 'agents'), { recursive: true });
  mkdirSync(join(root, 'src', 'runtime', 'governance'), { recursive: true });
  mkdirSync(join(root, 'src', 'cli', 'commands'), { recursive: true });
  mkdirSync(join(root, 'src', 'runtime', 'pipeline'), { recursive: true });
  mkdirSync(join(root, 'tests', 'unit'), { recursive: true });

  writeFileSync(join(root, 'src', 'autonomous', 'myEngine', 'myEngineV4.ts'), `
export class MyEngineV4 {
  async run() {}
}
`);
  writeFileSync(join(root, 'src', 'shared', 'v4', 'contracts', 'MyContract.ts'), `
export interface MyContract {
  id: string;
}
`);
  writeFileSync(join(root, 'src', 'shared', 'v4', 'schemas', 'mySchema.ts'), `
export const mySchema = {};
`);
  writeFileSync(join(root, 'src', 'runtime', 'agents', 'myAgent.ts'), `
export class MyAgent {}
`);
  writeFileSync(join(root, 'src', 'runtime', 'governance', 'myGovernance.ts'), `
export class MyGovernance {}
`);
  writeFileSync(join(root, 'src', 'cli', 'commands', 'myCommand.ts'), `
export const myCommand = {};
`);
  writeFileSync(join(root, 'src', 'runtime', 'pipeline', 'myPipeline.ts'), `
export class MyPipeline {}
`);
  writeFileSync(join(root, 'tests', 'unit', 'my.test.ts'), `
import { describe, it } from 'vitest';
describe('my', () => { it('works', () => {}); });
`);

  return root;
}

describe('RepoIndexerV4', () => {
  it('should return a valid RepoIndex', () => {
    const indexer = new RepoIndexerV4();
    const root = makeTempRepo();
    const result = indexer.index(root);

    expect(result.root).toBe(root);
    expect(Array.isArray(result.modules)).toBe(true);
    expect(typeof result.lastScanned).toBe('string');
    expect(typeof result.totalFiles).toBe('number');
    expect(result.totalFiles).toBe(result.modules.length);
  });

  it('should classify engine modules correctly', () => {
    const indexer = new RepoIndexerV4();
    const root = makeTempRepo();
    const result = indexer.index(root);

    const engine = result.modules.find(m => m.path.includes('myEngineV4'));
    expect(engine).toBeDefined();
    expect(engine?.type).toBe(ModuleType.Engine);
  });

  it('should classify contract modules correctly', () => {
    const indexer = new RepoIndexerV4();
    const root = makeTempRepo();
    const result = indexer.index(root);

    const contract = result.modules.find(m => m.path.includes('MyContract'));
    expect(contract).toBeDefined();
    expect(contract?.type).toBe(ModuleType.Contract);
  });

  it('should classify schema modules correctly', () => {
    const indexer = new RepoIndexerV4();
    const root = makeTempRepo();
    const result = indexer.index(root);

    const schema = result.modules.find(m => m.path.includes('mySchema'));
    expect(schema).toBeDefined();
    expect(schema?.type).toBe(ModuleType.Schema);
  });

  it('should classify agent modules correctly', () => {
    const indexer = new RepoIndexerV4();
    const root = makeTempRepo();
    const result = indexer.index(root);

    const agent = result.modules.find(m => m.path.includes('myAgent'));
    expect(agent).toBeDefined();
    expect(agent?.type).toBe(ModuleType.Agent);
  });

  it('should classify governance modules correctly', () => {
    const indexer = new RepoIndexerV4();
    const root = makeTempRepo();
    const result = indexer.index(root);

    const gov = result.modules.find(m => m.path.includes('myGovernance'));
    expect(gov).toBeDefined();
    expect(gov?.type).toBe(ModuleType.Governance);
  });

  it('should classify CLI modules correctly', () => {
    const indexer = new RepoIndexerV4();
    const root = makeTempRepo();
    const result = indexer.index(root);

    const cli = result.modules.find(m => m.path.includes('myCommand'));
    expect(cli).toBeDefined();
    expect(cli?.type).toBe(ModuleType.CLI);
  });

  it('should classify pipeline modules correctly', () => {
    const indexer = new RepoIndexerV4();
    const root = makeTempRepo();
    const result = indexer.index(root);

    const pipeline = result.modules.find(m => m.path.includes('myPipeline'));
    expect(pipeline).toBeDefined();
    expect(pipeline?.type).toBe(ModuleType.Pipeline);
  });

  it('should classify test modules correctly', () => {
    const indexer = new RepoIndexerV4();
    const root = makeTempRepo();
    const result = indexer.index(root);

    const test = result.modules.find(m => m.path.includes('my.test'));
    expect(test).toBeDefined();
    expect(test?.type).toBe(ModuleType.Test);
  });

  it('should extract exports from modules', () => {
    const indexer = new RepoIndexerV4();
    const root = makeTempRepo();
    const result = indexer.index(root);

    const engine = result.modules.find(m => m.path.includes('myEngineV4'));
    expect(engine?.exports).toContain('MyEngineV4');
  });

  it('should exclude node_modules and dist directories', () => {
    const indexer = new RepoIndexerV4();
    const root = makeTempRepo();
    mkdirSync(join(root, 'node_modules', 'some-pkg'), { recursive: true });
    writeFileSync(join(root, 'node_modules', 'some-pkg', 'index.ts'), 'export const x = 1;');
    mkdirSync(join(root, 'dist'), { recursive: true });
    writeFileSync(join(root, 'dist', 'output.ts'), 'export const y = 2;');

    const result = indexer.index(root);
    expect(result.modules.every(m => !m.path.includes('node_modules'))).toBe(true);
    expect(result.modules.every(m => !m.path.includes('dist/'))).toBe(true);
  });
});
