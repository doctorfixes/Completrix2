import { describe, it, expect, afterEach } from 'vitest';
import { mkdtempSync, rmSync, readFileSync, existsSync } from 'fs';
import { tmpdir } from 'os';
import { join } from 'path';
import { FileMutationEngine } from '../../../src/autonomous/self/fixApplier/fileMutationEngine.js';
import type { WriteOperation } from '../../../src/autonomous/self/fixApplier/fixApplierV1.js';

let tmpDir: string;

function makeTmpDir(): string {
  tmpDir = mkdtempSync(join(tmpdir(), 'completrix-test-'));
  return tmpDir;
}

afterEach(() => {
  if (tmpDir && existsSync(tmpDir)) {
    rmSync(tmpDir, { recursive: true, force: true });
  }
});

describe('FileMutationEngine', () => {
  it('should write a single file and return its path', () => {
    const root = makeTmpDir();
    const engine = new FileMutationEngine();
    const ops: WriteOperation[] = [
      { path: join(root, 'src', 'engine', 'auto-engine.ts'), content: 'export class AutoEngine {}\n' },
    ];
    const written = engine.write(ops);
    expect(written).toHaveLength(1);
    expect(written[0]).toBe(ops[0]!.path);
  });

  it('should create intermediate directories that do not exist', () => {
    const root = makeTmpDir();
    const engine = new FileMutationEngine();
    const filePath = join(root, 'deeply', 'nested', 'dir', 'file.ts');
    engine.write([{ path: filePath, content: '// generated\n' }]);
    expect(existsSync(filePath)).toBe(true);
  });

  it('should write the exact content provided', () => {
    const root = makeTmpDir();
    const engine = new FileMutationEngine();
    const content = 'export interface Contract {\n  id: string;\n}\n';
    const filePath = join(root, 'src', 'contracts', 'auto-contract.ts');
    engine.write([{ path: filePath, content }]);
    expect(readFileSync(filePath, 'utf-8')).toBe(content);
  });

  it('should write multiple files and return all paths', () => {
    const root = makeTmpDir();
    const engine = new FileMutationEngine();
    const ops: WriteOperation[] = [
      { path: join(root, 'src', 'a.ts'), content: 'export const a = 1;\n' },
      { path: join(root, 'src', 'b.ts'), content: 'export const b = 2;\n' },
      { path: join(root, 'tests', 'a.test.ts'), content: 'export {};\n' },
    ];
    const written = engine.write(ops);
    expect(written).toHaveLength(3);
    for (const op of ops) {
      expect(existsSync(op.path)).toBe(true);
    }
  });

  it('should return an empty array when given no operations', () => {
    const engine = new FileMutationEngine();
    expect(engine.write([])).toHaveLength(0);
  });

  it('should overwrite an existing file with new content', () => {
    const root = makeTmpDir();
    const engine = new FileMutationEngine();
    const filePath = join(root, 'src', 'module.ts');
    engine.write([{ path: filePath, content: 'export const v = 1;\n' }]);
    engine.write([{ path: filePath, content: 'export const v = 2;\n' }]);
    expect(readFileSync(filePath, 'utf-8')).toBe('export const v = 2;\n');
  });
});
