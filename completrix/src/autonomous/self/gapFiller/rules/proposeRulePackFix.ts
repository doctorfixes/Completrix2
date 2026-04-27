import type { Gap } from '../../../../shared/v4/self/gaps.js';
import type { Fix } from '../../../../shared/v4/self/fixes.js';
import { GapType } from '../../../../shared/v4/self/gaps.js';
import { FixType } from '../../../../shared/v4/self/fixes.js';

export function proposeRulePackFix(gap: Gap): Fix | null {
  if (gap.type !== GapType.IncompleteRulePack) return null;
  return {
    id: `fix-${gap.id}`,
    gapId: gap.id,
    type: FixType.AddRulePack,
    description: `Complete rule pack: ${gap.description}`,
    patch: `// TODO: add missing rules to pack`,
    estimatedEffort: 3,
  };
}
