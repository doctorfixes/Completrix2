import type { Gap } from '../../../../shared/v4/self/gaps.js';
import type { Fix } from '../../../../shared/v4/self/fixes.js';
import { GapType } from '../../../../shared/v4/self/gaps.js';
import { FixType } from '../../../../shared/v4/self/fixes.js';

export function proposeContractFix(gap: Gap): Fix | null {
  if (gap.type !== GapType.MissingContract) return null;
  return {
    id: `fix-${gap.id}`,
    gapId: gap.id,
    type: FixType.AddContract,
    description: `Add missing contract: ${gap.description}`,
    patch: `export interface Contract {\n  id: string;\n  version: string;\n}\n`,
    estimatedEffort: 2,
  };
}
