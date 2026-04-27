import type { SelfGovernancePlan } from '../../../../shared/v4/self/selfGovernance.js';

export function deriveGlobalInvariants(plan: SelfGovernancePlan): string[] {
  const invariants: string[] = [
    'All phases must complete before deployment',
    'No circular dependencies between phases',
    'Each fix must reference a valid gap ID',
  ];
  if (plan.phases.length > 3) {
    invariants.push('Large plans must have a rollback strategy');
  }
  return invariants;
}
