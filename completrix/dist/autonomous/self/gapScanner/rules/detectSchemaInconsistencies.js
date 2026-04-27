import { GapType } from '../../../../shared/v4/self/gaps.js';
import { ModuleType } from '../../../../shared/v4/self/common.js';
export function detectSchemaInconsistencies(index) {
    const gaps = [];
    const contracts = index.modules.filter(m => m.type === ModuleType.Contract);
    const schemas = index.modules.filter(m => m.type === ModuleType.Schema);
    if (contracts.length > schemas.length) {
        gaps.push({
            id: 'gap-schema-inconsistency',
            type: GapType.SchemaInconsistency,
            severity: 'medium',
            description: `${contracts.length} contracts but only ${schemas.length} schemas`,
            affectedPaths: contracts.map(m => m.path),
        });
    }
    return gaps;
}
