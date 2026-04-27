import type { CompletrixContext } from '../../shared/v4/common/context.js';
import type { ExecutionPlan } from '../../shared/v4/contracts/ExecutionPlan.js';
import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';
export declare class CreationEngineV4 {
    private context;
    constructor(context: CompletrixContext);
    create(plan: ExecutionPlan): Promise<FinalSystemSpec>;
}
