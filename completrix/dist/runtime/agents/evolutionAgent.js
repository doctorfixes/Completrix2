import { EvolutionPlannerV4 } from '../../autonomous/evolution/evolutionPlannerV4.js';
export class EvolutionAgent {
    name = 'evolution-agent';
    async run(input, ctx) {
        const engine = new EvolutionPlannerV4({
            sessionId: ctx.sessionId,
            projectName: ctx.projectName,
            timestamp: new Date().toISOString(),
            metadata: ctx.metadata,
        });
        return engine.plan(input.current, input.target);
    }
}
