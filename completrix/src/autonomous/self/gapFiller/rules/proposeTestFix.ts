import type { Gap } from '../../../../shared/v4/self/gaps.js';
import type { Fix } from '../../../../shared/v4/self/fixes.js';
import { GapType } from '../../../../shared/v4/self/gaps.js';
import { FixType } from '../../../../shared/v4/self/fixes.js';

export function proposeTestFix(gap: Gap): Fix | null {
  if (gap.type !== GapType.MissingTest) return null;
  return {
    id: `fix-${gap.id}`,
    gapId: gap.id,
    type: FixType.AddTest,
    description: `Add tests: ${gap.description}`,
    patch: `// TODO: create test file`,
    estimatedEffort: 6,
  };
}
