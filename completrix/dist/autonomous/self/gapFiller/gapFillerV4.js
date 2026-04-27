import { applyGapFixRules } from './applyGapFixRules.js';
export class GapFillerV4 {
    async fill(gaps) {
        return applyGapFixRules(gaps);
    }
}
