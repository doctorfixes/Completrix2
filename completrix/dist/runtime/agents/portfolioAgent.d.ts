import type { Agent } from '../contracts/agent.js';
import type { RuntimeContext } from '../contracts/runtimeContext.js';
import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';
import type { PortfolioOptimizationPlan } from '../../shared/v4/contracts/PortfolioOptimizationPlan.js';
export declare class PortfolioAgent implements Agent<FinalSystemSpec[], PortfolioOptimizationPlan> {
    readonly name = "portfolio-agent";
    run(input: FinalSystemSpec[], ctx: RuntimeContext): Promise<PortfolioOptimizationPlan>;
}
