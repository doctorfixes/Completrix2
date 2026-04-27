import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';
import type { PortfolioOptimizationPlan } from '../../shared/v4/contracts/PortfolioOptimizationPlan.js';
import { PortfolioAgent } from '../agents/portfolioAgent.js';

export class PortfolioWorkflow {
  private agent = new PortfolioAgent();

  async run(systems: FinalSystemSpec[]): Promise<PortfolioOptimizationPlan> {
    return this.agent.run(systems, {
      sessionId: `workflow-${Date.now()}`,
      projectName: 'portfolio-workflow',
      streaming: false,
      metadata: {},
    });
  }
}
