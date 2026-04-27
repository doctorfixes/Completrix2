import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';
export declare class DriftMonitor {
    detect(before: FinalSystemSpec, after: FinalSystemSpec): string[];
}
