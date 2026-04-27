import { GapType } from '../../../../shared/v4/self/gaps.js';
import { FixType } from '../../../../shared/v4/self/fixes.js';
export function proposeModuleFix(gap) {
    if (gap.type !== GapType.MissingModule)
        return null;
    return {
        id: `fix-${gap.id}`,
        gapId: gap.id,
        type: FixType.AddModule,
        description: `Add missing module to address: ${gap.description}`,
        patch: `// TODO: create module at ${gap.affectedPaths[0] ?? 'unknown path'}`,
        estimatedEffort: 4,
    };
}
