import { applySelfGovernanceRules } from './applySelfGovernanceRules.js';
export class SelfGovernancePlannerV4 {
    async plan(fixes) {
        return applySelfGovernanceRules(fixes);
    }
}
