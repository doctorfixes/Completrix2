import type { Agent } from '../contracts/agent.js';
import type { RuntimeContext } from '../contracts/runtimeContext.js';
import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';
import type { EvolutionPlan } from '../../shared/v4/contracts/EvolutionPlan.js';
export declare class EvolutionAgent implements Agent<{
    current: FinalSystemSpec;
    target: FinalSystemSpec;
}, EvolutionPlan> {
    readonly name = "evolution-agent";
    run(input: {
        current: FinalSystemSpec;
        target: FinalSystemSpec;
    }, ctx: RuntimeContext): Promise<EvolutionPlan>;
}
