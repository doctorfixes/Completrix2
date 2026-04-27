import type { Gap } from '../../../../shared/v4/self/gaps.js';
import type { Fix } from '../../../../shared/v4/self/fixes.js';
import { GapType } from '../../../../shared/v4/self/gaps.js';
import { FixType } from '../../../../shared/v4/self/fixes.js';

export function proposeModuleFix(gap: Gap): Fix | null {
  if (gap.type !== GapType.MissingModule) return null;
  const typeMatch = gap.id.match(/^gap-missing-module-(.+)$/);
  const moduleType = typeMatch?.[1] ?? 'engine';
  const className = moduleType.charAt(0).toUpperCase() + moduleType.slice(1);
  return {
    id: `fix-${gap.id}`,
    gapId: gap.id,
    type: FixType.AddModule,
    description: `Add missing module to address: ${gap.description}`,
    patch: `export class Auto${className} {\n  // auto-generated ${moduleType} module\n}\n`,
    estimatedEffort: 4,
  };
}
