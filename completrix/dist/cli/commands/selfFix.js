import { Command } from 'commander';
import { GapFillerV4 } from '../../autonomous/self/gapFiller/gapFillerV4.js';
export const selfFixCommand = new Command('self-fix')
    .description('Propose fixes for gaps')
    .argument('<gaps>', 'JSON array of Gap')
    .action(async (gapsJson) => {
    const gaps = JSON.parse(gapsJson);
    const filler = new GapFillerV4();
    const result = await filler.fill(gaps);
    console.log(JSON.stringify(result, null, 2));
});
