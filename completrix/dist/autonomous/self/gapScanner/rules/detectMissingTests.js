import { GapType } from '../../../../shared/v4/self/gaps.js';
import { ModuleType } from '../../../../shared/v4/self/common.js';
export function detectMissingTests(index) {
    const gaps = [];
    const testModules = index.modules.filter(m => m.type === ModuleType.Test);
    const engineModules = index.modules.filter(m => m.type === ModuleType.Engine);
    if (engineModules.length > 0 && testModules.length === 0) {
        gaps.push({
            id: 'gap-no-tests',
            type: GapType.MissingTest,
            severity: 'high',
            description: 'Engines exist but no test modules found',
            affectedPaths: engineModules.map(m => m.path),
        });
    }
    return gaps;
}
