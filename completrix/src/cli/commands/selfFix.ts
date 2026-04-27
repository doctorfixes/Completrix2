import { Command } from 'commander';
import { GapFillerV4 } from '../../autonomous/self/gapFiller/gapFillerV4.js';
import { gapSchema } from '../../shared/v4/schemas/gapSchema.js';
import { z } from 'zod';
import { readStdin } from '../stdinHelper.js';

const selfFixInputSchema = z.array(gapSchema);

export const selfFixCommand = new Command('self-fix')
  .description('Propose fixes for gaps. Accepts Gap[] JSON from argument or stdin.')
  .argument('[gaps]', 'JSON array of Gap, or reads from stdin if omitted')
  .action(async (gapsArg?: string) => {
    const raw = gapsArg ?? await readStdin();
    const gaps = selfFixInputSchema.parse(JSON.parse(raw));
    const filler = new GapFillerV4();
    const result = await filler.fill(gaps);
    console.log(JSON.stringify(result, null, 2));
  });
