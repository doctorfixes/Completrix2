import type { RepoIndex } from '../../../../shared/v4/self/repoIndex.js';
import type { Gap } from '../../../../shared/v4/self/gaps.js';
import { GapType } from '../../../../shared/v4/self/gaps.js';

export function detectIncompleteRulePacks(index: RepoIndex): Gap[] {
  const gaps: Gap[] = [];
  const ruleModules = index.modules.filter(m => m.path.includes('/rules/'));
  if (ruleModules.length > 0 && ruleModules.length < 3) {
    gaps.push({
      id: 'gap-incomplete-rule-pack',
      type: GapType.IncompleteRulePack,
      severity: 'medium',
      description: 'Rule pack appears incomplete (fewer than 3 rules)',
      affectedPaths: ruleModules.map(m => m.path),
    });
  }
  return gaps;
}
