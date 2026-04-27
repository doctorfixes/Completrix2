import type { Fix } from '../../../../shared/v4/self/fixes.js';
import type { AppliedFix } from '../../../../shared/v4/self/completionReport.js';
import type { RepoIndex } from '../../../../shared/v4/self/repoIndex.js';
import { FixType } from '../../../../shared/v4/self/fixes.js';
import { ModuleType } from '../../../../shared/v4/self/common.js';

const RULE_PACK_MIN = 3;

export function applyRulePackFix(fix: Fix, index: RepoIndex): AppliedFix {
  if (fix.type !== FixType.AddRulePack) {
    return { fix, appliedAt: new Date().toISOString(), status: 'skipped' };
  }
  const existing = index.modules.filter(m => m.path.includes('/rules/')).length;
  const toAdd = Math.max(0, RULE_PACK_MIN - existing);
  let firstPath: string | undefined;
  for (let i = 0; i < toAdd; i++) {
    const path = `${index.root}/src/rules/auto-rule-${existing + i + 1}.ts`;
    if (i === 0) firstPath = path;
    index.modules.push({ path, type: ModuleType.Util, exports: [`rule${existing + i + 1}`] });
  }
  return { fix, appliedAt: new Date().toISOString(), status: 'applied', filePath: firstPath };
}
