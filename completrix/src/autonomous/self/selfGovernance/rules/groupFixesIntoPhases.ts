import type { Fix } from '../../../../shared/v4/self/fixes.js';
import type { GovernancePhase } from '../../../../shared/v4/self/selfGovernance.js';

export function groupFixesIntoPhases(fixes: Fix[]): GovernancePhase[] {
  const phaseMap = new Map<string, Fix[]>();
  for (const fix of fixes) {
    const key = fix.type;
    const existing = phaseMap.get(key) ?? [];
    existing.push(fix);
    phaseMap.set(key, existing);
  }
  return Array.from(phaseMap.entries()).map(([type, phaseFixes]) => ({
    id: `phase-${type}`,
    name: `Phase: ${type}`,
    fixes: phaseFixes,
    dependsOn: [],
    risks: [],
  }));
}
