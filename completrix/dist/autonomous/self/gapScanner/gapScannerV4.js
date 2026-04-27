import { applyGapScanRules } from './applyGapScanRules.js';
export class GapScannerV4 {
    async scan(index) {
        return applyGapScanRules(index);
    }
}
