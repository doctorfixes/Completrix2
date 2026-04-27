import { GapType } from '../../../../shared/v4/self/gaps.js';
import { FixType } from '../../../../shared/v4/self/fixes.js';
export function proposeSchemaFix(gap) {
    if (gap.type !== GapType.SchemaInconsistency)
        return null;
    return {
        id: `fix-${gap.id}`,
        gapId: gap.id,
        type: FixType.FixSchema,
        description: `Fix schema inconsistency: ${gap.description}`,
        patch: `// TODO: add missing Zod schema`,
        estimatedEffort: 2,
    };
}
