import type { Agent } from '../contracts/agent.js';
import type { RuntimeContext } from '../contracts/runtimeContext.js';
import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';
import type { PortfolioOptimizationPlan } from '../../shared/v4/contracts/PortfolioOptimizationPlan.js';
import { PortfolioOptimizerV4 } from '../../autonomous/portfolio/portfolioOptimizerV4.js';

export class PortfolioAgent implements Agent<FinalSystemSpec[], PortfolioOptimizationPlan> {
  readonly name = 'portfolio-agent';

  async run(input: FinalSystemSpec[], ctx: RuntimeContext): Promise<PortfolioOptimizationPlan> {
    const engine = new PortfolioOptimizerV4({
      sessionId: ctx.sessionId,
      projectName: ctx.projectName,
      timestamp: new Date().toISOString(),
      metadata: ctx.metadata,
    });
    return engine.optimize(input);
  }
}
