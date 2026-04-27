import type { Fix } from '../../../../shared/v4/self/fixes.js';
import type { AppliedFix } from '../../../../shared/v4/self/completionReport.js';
import type { RepoIndex } from '../../../../shared/v4/self/repoIndex.js';
import { FixType } from '../../../../shared/v4/self/fixes.js';
import { ModuleType } from '../../../../shared/v4/self/common.js';

export function applyTestFix(fix: Fix, index: RepoIndex): AppliedFix {
  if (fix.type !== FixType.AddTest) {
    return { fix, appliedAt: new Date().toISOString(), status: 'skipped' };
  }
  const path = `${index.root}/tests/auto.test.ts`;
  index.modules.push({ path, type: ModuleType.Test, exports: [] });
  return { fix, appliedAt: new Date().toISOString(), status: 'applied' };
}
