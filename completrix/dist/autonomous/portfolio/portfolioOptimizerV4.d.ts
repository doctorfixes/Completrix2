import type { CompletrixContext } from '../../shared/v4/common/context.js';
import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';
import type { PortfolioOptimizationPlan } from '../../shared/v4/contracts/PortfolioOptimizationPlan.js';
export declare class PortfolioOptimizerV4 {
    private context;
    constructor(context: CompletrixContext);
    optimize(systems: FinalSystemSpec[]): Promise<PortfolioOptimizationPlan>;
}
