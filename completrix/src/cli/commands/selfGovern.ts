import { Command } from 'commander';
import { SelfGovernancePlannerV4 } from '../../autonomous/self/selfGovernance/selfGovernancePlannerV4.js';
import type { Fix } from '../../shared/v4/self/fixes.js';

export const selfGovernCommand = new Command('self-govern')
  .description('Create a governance plan from fixes')
  .argument('<fixes>', 'JSON array of Fix')
  .action(async (fixesJson: string) => {
    const fixes = JSON.parse(fixesJson) as Fix[];
    const planner = new SelfGovernancePlannerV4();
    const result = await planner.plan(fixes);
    console.log(JSON.stringify(result, null, 2));
  });
