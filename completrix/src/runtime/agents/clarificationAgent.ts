import type { Agent } from '../contracts/agent.js';
import type { RuntimeContext } from '../contracts/runtimeContext.js';
import { ClarificationEngineV4, type ClarifiedIntent } from '../../autonomous/clarification/clarificationEngineV4.js';

export class ClarificationAgent implements Agent<string, ClarifiedIntent> {
  readonly name = 'clarification-agent';

  async run(input: string, ctx: RuntimeContext): Promise<ClarifiedIntent> {
    const engine = new ClarificationEngineV4({
      sessionId: ctx.sessionId,
      projectName: ctx.projectName,
      timestamp: new Date().toISOString(),
      metadata: ctx.metadata,
    });
    return engine.clarify(input);
  }
}
