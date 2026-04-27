import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';
import type { PortfolioOptimizationPlan } from '../../shared/v4/contracts/PortfolioOptimizationPlan.js';
export declare class PortfolioWorkflow {
    private agent;
    run(systems: FinalSystemSpec[]): Promise<PortfolioOptimizationPlan>;
}
