import type { Gap } from '../../../shared/v4/self/gaps.js';
import type { Fix } from '../../../shared/v4/self/fixes.js';
export declare class GapFillerV4 {
    fill(gaps: Gap[]): Promise<Fix[]>;
}
