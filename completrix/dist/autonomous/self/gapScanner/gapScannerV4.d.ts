import type { RepoIndex } from '../../../shared/v4/self/repoIndex.js';
import type { Gap } from '../../../shared/v4/self/gaps.js';
export declare class GapScannerV4 {
    scan(index: RepoIndex): Promise<Gap[]>;
}
