import type { Agent } from '../contracts/agent.js';
import type { RuntimeContext } from '../contracts/runtimeContext.js';
import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';
export declare class GovernanceWrapper<TInput> implements Agent<TInput, FinalSystemSpec> {
    readonly name: string;
    private inner;
    private invariantEnforcer;
    private constraintEnforcer;
    constructor(inner: Agent<TInput, FinalSystemSpec>);
    run(input: TInput, ctx: RuntimeContext): Promise<FinalSystemSpec>;
}
