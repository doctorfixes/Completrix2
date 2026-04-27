import type { RepoIndex } from '../../../../shared/v4/self/repoIndex.js';
import type { Gap } from '../../../../shared/v4/self/gaps.js';
import { GapType } from '../../../../shared/v4/self/gaps.js';
import { ModuleType } from '../../../../shared/v4/self/common.js';

export function detectMissingGovernance(index: RepoIndex): Gap[] {
  const gaps: Gap[] = [];
  const govModules = index.modules.filter(m => m.type === ModuleType.Governance);
  if (govModules.length === 0) {
    gaps.push({
      id: 'gap-no-governance',
      type: GapType.MissingGovernance,
      severity: 'high',
      description: 'No governance modules found in the repository',
      affectedPaths: [index.root],
    });
  }
  return gaps;
}
