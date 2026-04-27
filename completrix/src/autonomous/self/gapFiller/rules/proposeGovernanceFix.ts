import type { Gap } from '../../../../shared/v4/self/gaps.js';
import type { Fix } from '../../../../shared/v4/self/fixes.js';
import { GapType } from '../../../../shared/v4/self/gaps.js';
import { FixType } from '../../../../shared/v4/self/fixes.js';

export function proposeGovernanceFix(gap: Gap): Fix | null {
  if (gap.type !== GapType.MissingGovernance) return null;
  return {
    id: `fix-${gap.id}`,
    gapId: gap.id,
    type: FixType.AddGovernance,
    description: `Add governance rules: ${gap.description}`,
    patch: `// TODO: create governance.json`,
    estimatedEffort: 3,
  };
}
