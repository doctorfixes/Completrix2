import type { Fix } from '../../../../shared/v4/self/fixes.js';
import type { AppliedFix } from '../../../../shared/v4/self/completionReport.js';
import type { RepoIndex } from '../../../../shared/v4/self/repoIndex.js';
import { FixType } from '../../../../shared/v4/self/fixes.js';
import { ModuleType } from '../../../../shared/v4/self/common.js';

export function applySchemaFix(fix: Fix, index: RepoIndex): AppliedFix {
  if (fix.type !== FixType.FixSchema) {
    return { fix, appliedAt: new Date().toISOString(), status: 'skipped' };
  }
  const contracts = index.modules.filter(m => m.type === ModuleType.Contract).length;
  const schemas = index.modules.filter(m => m.type === ModuleType.Schema).length;
  const toAdd = Math.max(0, contracts - schemas);
  let firstPath: string | undefined;
  for (let i = 0; i < toAdd; i++) {
    const path = `${index.root}/src/schemas/auto-schema-${schemas + i + 1}.ts`;
    if (i === 0) firstPath = path;
    index.modules.push({ path, type: ModuleType.Schema, exports: [`autoSchema${schemas + i + 1}`] });
  }
  return { fix, appliedAt: new Date().toISOString(), status: 'applied', filePath: firstPath };
}
