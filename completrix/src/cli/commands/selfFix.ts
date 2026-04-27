import { Command } from 'commander';
import { GapFillerV4 } from '../../autonomous/self/gapFiller/gapFillerV4.js';
import type { Gap } from '../../shared/v4/self/gaps.js';

export const selfFixCommand = new Command('self-fix')
  .description('Propose fixes for gaps')
  .argument('<gaps>', 'JSON array of Gap')
  .action(async (gapsJson: string) => {
    const gaps = JSON.parse(gapsJson) as Gap[];
    const filler = new GapFillerV4();
    const result = await filler.fill(gaps);
    console.log(JSON.stringify(result, null, 2));
  });
