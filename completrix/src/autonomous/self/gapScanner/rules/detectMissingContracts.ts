import type { RepoIndex } from '../../../../shared/v4/self/repoIndex.js';
import type { Gap } from '../../../../shared/v4/self/gaps.js';
import { GapType } from '../../../../shared/v4/self/gaps.js';
import { ModuleType } from '../../../../shared/v4/self/common.js';

export function detectMissingContracts(index: RepoIndex): Gap[] {
  const gaps: Gap[] = [];
  const contracts = index.modules.filter(m => m.type === ModuleType.Contract);
  if (contracts.length === 0) {
    gaps.push({
      id: 'gap-no-contracts',
      type: GapType.MissingContract,
      severity: 'critical',
      description: 'No contract modules found in the repository',
      affectedPaths: [index.root],
    });
  }
  return gaps;
}
