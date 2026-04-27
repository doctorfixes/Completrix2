import type { Fix } from '../../../../shared/v4/self/fixes.js';
import type { AppliedFix } from '../../../../shared/v4/self/completionReport.js';
import type { RepoIndex } from '../../../../shared/v4/self/repoIndex.js';
import { FixType } from '../../../../shared/v4/self/fixes.js';
import { ModuleType } from '../../../../shared/v4/self/common.js';

export function applyModuleFix(fix: Fix, index: RepoIndex): AppliedFix {
  if (fix.type !== FixType.AddModule) {
    return { fix, appliedAt: new Date().toISOString(), status: 'skipped' };
  }
  const typeMatch = fix.gapId.match(/^gap-missing-module-(.+)$/);
  const rawType = typeMatch?.[1];
  const validTypes = Object.values(ModuleType) as string[];
  const moduleType = (rawType && validTypes.includes(rawType) ? rawType : ModuleType.Engine) as ModuleType;
  const path = `${index.root}/src/${moduleType}/auto-${moduleType}.ts`;
  index.modules.push({ path, type: moduleType, exports: [moduleType] });
  return { fix, appliedAt: new Date().toISOString(), status: 'applied', filePath: path };
}
