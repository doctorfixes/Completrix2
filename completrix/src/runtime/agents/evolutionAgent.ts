import type { Agent } from '../contracts/agent.js';
import type { RuntimeContext } from '../contracts/runtimeContext.js';
import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';
import type { EvolutionPlan } from '../../shared/v4/contracts/EvolutionPlan.js';
import { EvolutionPlannerV4 } from '../../autonomous/evolution/evolutionPlannerV4.js';

export class EvolutionAgent implements Agent<{ current: FinalSystemSpec; target: FinalSystemSpec }, EvolutionPlan> {
  readonly name = 'evolution-agent';

  async run(input: { current: FinalSystemSpec; target: FinalSystemSpec }, ctx: RuntimeContext): Promise<EvolutionPlan> {
    const engine = new EvolutionPlannerV4({
      sessionId: ctx.sessionId,
      projectName: ctx.projectName,
      timestamp: new Date().toISOString(),
      metadata: ctx.metadata,
    });
    return engine.plan(input.current, input.target);
  }
}
