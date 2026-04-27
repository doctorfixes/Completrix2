import { GapFillerV4 } from '../../autonomous/self/gapFiller/gapFillerV4.js';
export class SelfFixAgent {
    name = 'self-fix-agent';
    async run(input, _ctx) {
        const filler = new GapFillerV4();
        return filler.fill(input);
    }
}
