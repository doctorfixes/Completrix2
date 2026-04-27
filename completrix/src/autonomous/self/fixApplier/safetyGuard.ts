import type { Fix } from '../../../shared/v4/self/fixes.js';

export interface SafetyViolation {
  fixId: string;
  reason: string;
}

export function checkMutationSafety(fixes: Fix[]): SafetyViolation[] {
  const violations: SafetyViolation[] = [];
  const seenGapIds = new Set<string>();

  for (const fix of fixes) {
    if (!fix.id || !fix.gapId || !fix.description || !fix.patch) {
      violations.push({ fixId: fix.id || fix.gapId || 'unknown', reason: 'Fix has missing required fields' });
      continue;
    }

    if (seenGapIds.has(fix.gapId)) {
      violations.push({ fixId: fix.id, reason: `Duplicate fix for gap '${fix.gapId}'` });
    }
    seenGapIds.add(fix.gapId);
  }

  return violations;
}
