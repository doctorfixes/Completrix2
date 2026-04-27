import type { Gap } from '../../../shared/v4/self/gaps.js';
import type { Fix } from '../../../shared/v4/self/fixes.js';
import { proposeModuleFix } from './rules/proposeModuleFix.js';
import { proposeContractFix } from './rules/proposeContractFix.js';
import { proposeGovernanceFix } from './rules/proposeGovernanceFix.js';
import { proposeTestFix } from './rules/proposeTestFix.js';
import { proposeRulePackFix } from './rules/proposeRulePackFix.js';
import { proposeSchemaFix } from './rules/proposeSchemaFix.js';

const rules = [
  proposeModuleFix,
  proposeContractFix,
  proposeGovernanceFix,
  proposeTestFix,
  proposeRulePackFix,
  proposeSchemaFix,
];

export function applyGapFixRules(gaps: Gap[]): Fix[] {
  const fixes: Fix[] = [];
  for (const gap of gaps) {
    for (const rule of rules) {
      const fix = rule(gap);
      if (fix !== null) {
        fixes.push(fix);
        break;
      }
    }
  }
  return fixes;
}
