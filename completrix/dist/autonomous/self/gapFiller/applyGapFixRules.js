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
export function applyGapFixRules(gaps) {
    const fixes = [];
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
