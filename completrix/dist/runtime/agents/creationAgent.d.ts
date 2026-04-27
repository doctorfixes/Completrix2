import type { Agent } from '../contracts/agent.js';
import type { RuntimeContext } from '../contracts/runtimeContext.js';
import type { ExecutionPlan } from '../../shared/v4/contracts/ExecutionPlan.js';
import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';
export declare class CreationAgent implements Agent<ExecutionPlan, FinalSystemSpec> {
    readonly name = "creation-agent";
    run(input: ExecutionPlan, ctx: RuntimeContext): Promise<FinalSystemSpec>;
}
