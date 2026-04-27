import type { Fix } from '../../../shared/v4/self/fixes.js';
import type { SelfGovernancePlan } from '../../../shared/v4/self/selfGovernance.js';
import { groupFixesIntoPhases } from './rules/groupFixesIntoPhases.js';
import { derivePhaseDependencies } from './rules/derivePhaseDependencies.js';
import { derivePhaseRisks } from './rules/derivePhaseRisks.js';
import { deriveGlobalInvariants } from './rules/deriveGlobalInvariants.js';

export function applySelfGovernanceRules(fixes: Fix[]): SelfGovernancePlan {
  const phases = derivePhaseDependencies(groupFixesIntoPhases(fixes));
  const risks = derivePhaseRisks(phases);
  const plan: SelfGovernancePlan = {
    id: `governance-plan-${Date.now()}`,
    phases,
    invariants: [],
    risks,
  };
  plan.invariants = deriveGlobalInvariants(plan);
  return plan;
}
