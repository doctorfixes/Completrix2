import { ClarificationEngineV4 } from '../../autonomous/clarification/clarificationEngineV4.js';
export class ClarificationAgent {
    name = 'clarification-agent';
    async run(input, ctx) {
        const engine = new ClarificationEngineV4({
            sessionId: ctx.sessionId,
            projectName: ctx.projectName,
            timestamp: new Date().toISOString(),
            metadata: ctx.metadata,
        });
        return engine.clarify(input);
    }
}
