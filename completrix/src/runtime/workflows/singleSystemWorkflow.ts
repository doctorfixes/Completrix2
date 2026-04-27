import type { ExecutionPlan } from '../../shared/v4/contracts/ExecutionPlan.js';
import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';
import { CreationAgent } from '../agents/creationAgent.js';
import { GovernanceWrapper } from '../governance/governanceWrapper.js';

export class SingleSystemWorkflow {
  private agent = new GovernanceWrapper(new CreationAgent());

  async run(plan: ExecutionPlan): Promise<FinalSystemSpec> {
    return this.agent.run(plan, {
      sessionId: `workflow-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      projectName: 'single-system-workflow',
      streaming: false,
      metadata: {},
    });
  }
}
