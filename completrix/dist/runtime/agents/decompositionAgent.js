import { DecompositionEngineV4 } from '../../autonomous/decomposition/decompositionEngineV4.js';
export class DecompositionAgent {
    name = 'decomposition-agent';
    async run(input, ctx) {
        const engine = new DecompositionEngineV4({
            sessionId: ctx.sessionId,
            projectName: ctx.projectName,
            timestamp: new Date().toISOString(),
            metadata: ctx.metadata,
        });
        return engine.decompose(input);
    }
}
