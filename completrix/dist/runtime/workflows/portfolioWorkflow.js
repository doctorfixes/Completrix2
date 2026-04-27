import { PortfolioAgent } from '../agents/portfolioAgent.js';
export class PortfolioWorkflow {
    agent = new PortfolioAgent();
    async run(systems) {
        return this.agent.run(systems, {
            sessionId: `workflow-${Date.now()}`,
            projectName: 'portfolio-workflow',
            streaming: false,
            metadata: {},
        });
    }
}
