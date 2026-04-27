import type { SelfGovernancePlan } from '../../../../shared/v4/self/selfGovernance.js';

export function deriveMutationSafetyInvariants(plan: SelfGovernancePlan): string[] {
  return [
    'Applied fixes must not introduce circular dependencies',
    'Each gap may only be fixed once per convergence iteration',
    'All fix fields must be non-empty before application',
    'Governance plan must be validated before any mutation is committed',
  ];
}
