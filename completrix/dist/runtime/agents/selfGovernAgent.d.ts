import type { Agent } from '../contracts/agent.js';
import type { RuntimeContext } from '../contracts/runtimeContext.js';
import type { Fix } from '../../shared/v4/self/fixes.js';
import type { SelfGovernancePlan } from '../../shared/v4/self/selfGovernance.js';
export declare class SelfGovernAgent implements Agent<Fix[], SelfGovernancePlan> {
    readonly name = "self-govern-agent";
    run(input: Fix[], _ctx: RuntimeContext): Promise<SelfGovernancePlan>;
}
