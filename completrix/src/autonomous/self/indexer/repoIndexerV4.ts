import { readdirSync, statSync, readFileSync } from 'fs';
import { join, relative, basename } from 'path';
import type { RepoIndex } from '../../../shared/v4/self/repoIndex.js';
import type { SelfModule } from '../../../shared/v4/self/common.js';
import { ModuleType } from '../../../shared/v4/self/common.js';

export class RepoIndexerV4 {
  index(root: string): RepoIndex {
    const files = this.collectTsFiles(root);
    const modules: SelfModule[] = files.map(f => this.classifyFile(f, root));
    return {
      root,
      modules,
      lastScanned: new Date().toISOString(),
      totalFiles: files.length,
    };
  }

  private collectTsFiles(dir: string): string[] {
    const results: string[] = [];
    for (const entry of readdirSync(dir)) {
      if (entry === 'node_modules' || entry === 'dist' || entry.startsWith('.')) continue;
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);
      if (stat.isDirectory()) {
        results.push(...this.collectTsFiles(fullPath));
      } else if (entry.endsWith('.ts') && !entry.endsWith('.d.ts')) {
        results.push(fullPath);
      }
    }
    return results;
  }

  private classifyFile(fullPath: string, root: string): SelfModule {
    const relPath = relative(root, fullPath).replace(/\\/g, '/');
    const type = this.inferType(relPath);
    const exports = this.extractExports(fullPath);
    return { path: relPath, type, exports };
  }

  private inferType(relPath: string): ModuleType {
    if (relPath.startsWith('tests/') || relPath.endsWith('.test.ts')) return ModuleType.Test;
    if (relPath.includes('/schemas/')) return ModuleType.Schema;
    if (relPath.includes('/contracts/')) return ModuleType.Contract;
    if (relPath.includes('/agents/')) return ModuleType.Agent;
    if (relPath.includes('/governance/')) return ModuleType.Governance;
    if (relPath.includes('/cli/')) return ModuleType.CLI;
    if (
      relPath.includes('/pipeline/') ||
      relPath.includes('/parallel/') ||
      relPath.includes('/streaming/') ||
      relPath.includes('/workflows/')
    ) return ModuleType.Pipeline;
    if (/Engine|Planner|Optimizer|Filler|Scanner/.test(basename(relPath))) return ModuleType.Engine;
    return ModuleType.Util;
  }

  private extractExports(fullPath: string): string[] {
    const content = readFileSync(fullPath, 'utf-8');
    const results: string[] = [];

    // Named declarations: export class Foo, export function foo, etc.
    const namedPattern = /^export\s+(?:abstract\s+)?(?:class|function|interface|type|const|enum)\s+(\w+)/gm;
    let match: RegExpExecArray | null;
    while ((match = namedPattern.exec(content)) !== null) {
      if (match[1]) results.push(match[1]);
    }

    // export default identifier
    const defaultPattern = /^export\s+default\s+(\w+)/gm;
    while ((match = defaultPattern.exec(content)) !== null) {
      if (match[1]) results.push(match[1]);
    }

    // export { foo, bar as baz }
    const namedExportPattern = /^export\s*\{([^}]+)\}/gm;
    while ((match = namedExportPattern.exec(content)) !== null) {
      const items = match[1]!.split(',').map(s => s.trim().split(/\s+as\s+/).pop()!.trim());
      for (const item of items) {
        if (/^\w+$/.test(item)) results.push(item);
      }
    }

    return [...new Set(results)];
  }
}
