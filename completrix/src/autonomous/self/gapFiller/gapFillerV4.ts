import type { Gap } from '../../../shared/v4/self/gaps.js';
import type { Fix } from '../../../shared/v4/self/fixes.js';
import { applyGapFixRules } from './applyGapFixRules.js';

export class GapFillerV4 {
  async fill(gaps: Gap[]): Promise<Fix[]> {
    return applyGapFixRules(gaps);
  }
}
