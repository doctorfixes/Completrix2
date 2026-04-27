import type { Agent } from '../contracts/agent.js';
import type { RuntimeContext } from '../contracts/runtimeContext.js';
import type { Fix } from '../../shared/v4/self/fixes.js';
import type { SelfGovernancePlan } from '../../shared/v4/self/selfGovernance.js';
import { SelfGovernancePlannerV4 } from '../../autonomous/self/selfGovernance/selfGovernancePlannerV4.js';

export class SelfGovernanceAgent implements Agent<Fix[], SelfGovernancePlan> {
  readonly name = 'self-governance-agent';

  async run(input: Fix[], _ctx: RuntimeContext): Promise<SelfGovernancePlan> {
    const planner = new SelfGovernancePlannerV4();
    return planner.plan(input);
  }
}
