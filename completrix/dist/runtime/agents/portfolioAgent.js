import { PortfolioOptimizerV4 } from '../../autonomous/portfolio/portfolioOptimizerV4.js';
export class PortfolioAgent {
    name = 'portfolio-agent';
    async run(input, ctx) {
        const engine = new PortfolioOptimizerV4({
            sessionId: ctx.sessionId,
            projectName: ctx.projectName,
            timestamp: new Date().toISOString(),
            metadata: ctx.metadata,
        });
        return engine.optimize(input);
    }
}
