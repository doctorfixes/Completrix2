import type { Fix } from '../../src/shared/v4/self/fixes.js';

export function validateAutoFix(fix: Fix): boolean {
  return (
    typeof fix.id === 'string' &&
    fix.id.length > 0 &&
    typeof fix.gapId === 'string' &&
    fix.gapId.length > 0 &&
    typeof fix.description === 'string' &&
    typeof fix.patch === 'string' &&
    typeof fix.estimatedEffort === 'number' &&
    fix.estimatedEffort >= 0
  );
}
