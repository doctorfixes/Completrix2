import type { Agent } from '../contracts/agent.js';
import type { RuntimeContext } from '../contracts/runtimeContext.js';
import type { ExecutionPlan } from '../../shared/v4/contracts/ExecutionPlan.js';
import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';
import { CreationEngineV4 } from '../../autonomous/creation/creationEngineV4.js';

export class CreationAgent implements Agent<ExecutionPlan, FinalSystemSpec> {
  readonly name = 'creation-agent';

  async run(input: ExecutionPlan, ctx: RuntimeContext): Promise<FinalSystemSpec> {
    const engine = new CreationEngineV4({
      sessionId: ctx.sessionId,
      projectName: ctx.projectName,
      timestamp: new Date().toISOString(),
      metadata: ctx.metadata,
    });
    return engine.create(input);
  }
}
