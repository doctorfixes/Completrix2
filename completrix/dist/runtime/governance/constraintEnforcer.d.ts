import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';
export declare class ConstraintEnforcer {
    private readonly maxClusters;
    private readonly maxContracts;
    enforce(spec: FinalSystemSpec): string[];
}
