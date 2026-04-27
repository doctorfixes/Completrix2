import { GapType } from '../../../../shared/v4/self/gaps.js';
export function detectMissingModules(index) {
    const gaps = [];
    const requiredModuleTypes = ['engine', 'contract', 'schema', 'agent'];
    for (const type of requiredModuleTypes) {
        const hasType = index.modules.some(m => m.type === type);
        if (!hasType) {
            gaps.push({
                id: `gap-missing-module-${type}`,
                type: GapType.MissingModule,
                severity: 'high',
                description: `No modules of type '${type}' found in repo index`,
                affectedPaths: [index.root],
            });
        }
    }
    return gaps;
}
