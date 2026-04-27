import { SelfGovernancePlannerV4 } from '../../autonomous/self/selfGovernance/selfGovernancePlannerV4.js';
export class SelfGovernAgent {
    name = 'self-govern-agent';
    async run(input, _ctx) {
        const planner = new SelfGovernancePlannerV4();
        return planner.plan(input);
    }
}
