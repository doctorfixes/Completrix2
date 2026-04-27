import type { CompletrixContext } from '../../shared/v4/common/context.js';
import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';
import type { EvolutionPlan } from '../../shared/v4/contracts/EvolutionPlan.js';
export declare class EvolutionPlannerV4 {
    private context;
    constructor(context: CompletrixContext);
    plan(current: FinalSystemSpec, target: FinalSystemSpec): Promise<EvolutionPlan>;
}
