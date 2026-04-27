import type { CompletrixContext } from '../../shared/v4/common/context.js';
import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';
import type { ClusterStructureMap } from '../../shared/v4/contracts/ClusterStructureMap.js';
export declare class DecompositionEngineV4 {
    private context;
    constructor(context: CompletrixContext);
    decompose(spec: FinalSystemSpec): Promise<ClusterStructureMap>;
}
