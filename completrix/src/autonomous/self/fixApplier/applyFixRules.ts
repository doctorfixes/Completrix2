import type { Fix } from '../../../shared/v4/self/fixes.js';
import type { AppliedFix } from '../../../shared/v4/self/completionReport.js';
import type { RepoIndex } from '../../../shared/v4/self/repoIndex.js';
import { FixType } from '../../../shared/v4/self/fixes.js';
import { applyModuleFix } from './rules/applyModuleFix.js';
import { applyContractFix } from './rules/applyContractFix.js';
import { applyGovernanceFix } from './rules/applyGovernanceFix.js';
import { applyTestFix } from './rules/applyTestFix.js';
import { applyRulePackFix } from './rules/applyRulePackFix.js';
import { applySchemaFix } from './rules/applySchemaFix.js';

const applyRules: Record<FixType, (fix: Fix, index: RepoIndex) => AppliedFix> = {
  [FixType.AddModule]: applyModuleFix,
  [FixType.AddContract]: applyContractFix,
  [FixType.AddGovernance]: applyGovernanceFix,
  [FixType.AddTest]: applyTestFix,
  [FixType.AddRulePack]: applyRulePackFix,
  [FixType.FixSchema]: applySchemaFix,
};

export function applyFixRules(fixes: Fix[], index: RepoIndex): AppliedFix[] {
  return fixes.map(fix => {
    const rule = applyRules[fix.type];
    if (!rule) {
      return { fix, appliedAt: new Date().toISOString(), status: 'skipped' as const };
    }
    return rule(fix, index);
  });
}
