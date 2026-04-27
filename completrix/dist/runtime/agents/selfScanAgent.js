import { GapScannerV4 } from '../../autonomous/self/gapScanner/gapScannerV4.js';
export class SelfScanAgent {
    name = 'self-scan-agent';
    async run(input, _ctx) {
        const scanner = new GapScannerV4();
        return scanner.scan(input);
    }
}
