import { CreationEngineV4 } from '../../autonomous/creation/creationEngineV4.js';
export class CreationAgent {
    name = 'creation-agent';
    async run(input, ctx) {
        const engine = new CreationEngineV4({
            sessionId: ctx.sessionId,
            projectName: ctx.projectName,
            timestamp: new Date().toISOString(),
            metadata: ctx.metadata,
        });
        return engine.create(input);
    }
}
