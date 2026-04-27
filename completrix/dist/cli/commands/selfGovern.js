import { Command } from 'commander';
import { SelfGovernancePlannerV4 } from '../../autonomous/self/selfGovernance/selfGovernancePlannerV4.js';
export const selfGovernCommand = new Command('self-govern')
    .description('Create a governance plan from fixes')
    .argument('<fixes>', 'JSON array of Fix')
    .action(async (fixesJson) => {
    const fixes = JSON.parse(fixesJson);
    const planner = new SelfGovernancePlannerV4();
    const result = await planner.plan(fixes);
    console.log(JSON.stringify(result, null, 2));
});
