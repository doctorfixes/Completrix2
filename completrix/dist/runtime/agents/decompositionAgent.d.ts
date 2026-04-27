import type { Agent } from '../contracts/agent.js';
import type { RuntimeContext } from '../contracts/runtimeContext.js';
import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';
import type { ClusterStructureMap } from '../../shared/v4/contracts/ClusterStructureMap.js';
export declare class DecompositionAgent implements Agent<FinalSystemSpec, ClusterStructureMap> {
    readonly name = "decomposition-agent";
    run(input: FinalSystemSpec, ctx: RuntimeContext): Promise<ClusterStructureMap>;
}
