import type { Fix } from '../../../../shared/v4/self/fixes.js';
import type { AppliedFix } from '../../../../shared/v4/self/completionReport.js';
import type { RepoIndex } from '../../../../shared/v4/self/repoIndex.js';
import { FixType } from '../../../../shared/v4/self/fixes.js';
import { ModuleType } from '../../../../shared/v4/self/common.js';

export function applyContractFix(fix: Fix, index: RepoIndex): AppliedFix {
  if (fix.type !== FixType.AddContract) {
    return { fix, appliedAt: new Date().toISOString(), status: 'skipped' };
  }
  const path = `${index.root}/src/contracts/auto-contract.ts`;
  index.modules.push({ path, type: ModuleType.Contract, exports: ['Contract'] });
  return { fix, appliedAt: new Date().toISOString(), status: 'applied', filePath: path };
}
