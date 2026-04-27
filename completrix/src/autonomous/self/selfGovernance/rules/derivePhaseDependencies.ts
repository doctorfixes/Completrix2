import type { GovernancePhase } from '../../../../shared/v4/self/selfGovernance.js';

export function derivePhaseDependencies(phases: GovernancePhase[]): GovernancePhase[] {
  return phases.map((phase, index) => ({
    ...phase,
    dependsOn: index > 0 ? [phases[index - 1]!.id] : [],
  }));
}
