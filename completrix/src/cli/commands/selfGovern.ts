import { Command } from 'commander';
import { SelfGovernancePlannerV4 } from '../../autonomous/self/selfGovernance/selfGovernancePlannerV4.js';
import { fixSchema } from '../../shared/v4/schemas/fixSchema.js';
import { z } from 'zod';
import { readStdin } from '../stdinHelper.js';

const selfGovernInputSchema = z.array(fixSchema);

export const selfGovernCommand = new Command('self-govern')
  .description('Create a governance plan from fixes. Accepts Fix[] JSON from argument or stdin.')
  .argument('[fixes]', 'JSON array of Fix, or reads from stdin if omitted')
  .action(async (fixesArg?: string) => {
    const raw = fixesArg ?? await readStdin();
    const fixes = selfGovernInputSchema.parse(JSON.parse(raw));
    const planner = new SelfGovernancePlannerV4();
    const result = await planner.plan(fixes);
    console.log(JSON.stringify(result, null, 2));
  });
