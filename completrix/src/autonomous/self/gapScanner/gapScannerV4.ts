import type { RepoIndex } from '../../../shared/v4/self/repoIndex.js';
import type { Gap } from '../../../shared/v4/self/gaps.js';
import { applyGapScanRules } from './applyGapScanRules.js';

export class GapScannerV4 {
  async scan(index: RepoIndex): Promise<Gap[]> {
    return applyGapScanRules(index);
  }
}
