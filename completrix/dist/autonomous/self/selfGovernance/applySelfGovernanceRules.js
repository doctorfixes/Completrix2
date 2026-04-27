import { groupFixesIntoPhases } from './rules/groupFixesIntoPhases.js';
import { derivePhaseDependencies } from './rules/derivePhaseDependencies.js';
import { derivePhaseRisks } from './rules/derivePhaseRisks.js';
import { deriveGlobalInvariants } from './rules/deriveGlobalInvariants.js';
export function applySelfGovernanceRules(fixes) {
    const phases = derivePhaseDependencies(groupFixesIntoPhases(fixes));
    const risks = derivePhaseRisks(phases);
    const plan = {
        id: `governance-plan-${Date.now()}`,
        phases,
        invariants: [],
        risks,
    };
    plan.invariants = deriveGlobalInvariants(plan);
    return plan;
}
