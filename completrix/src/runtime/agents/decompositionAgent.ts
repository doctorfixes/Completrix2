import type { Agent } from '../contracts/agent.js';
import type { RuntimeContext } from '../contracts/runtimeContext.js';
import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';
import type { ClusterStructureMap } from '../../shared/v4/contracts/ClusterStructureMap.js';
import { DecompositionEngineV4 } from '../../autonomous/decomposition/decompositionEngineV4.js';

export class DecompositionAgent implements Agent<FinalSystemSpec, ClusterStructureMap> {
  readonly name = 'decomposition-agent';

  async run(input: FinalSystemSpec, ctx: RuntimeContext): Promise<ClusterStructureMap> {
    const engine = new DecompositionEngineV4({
      sessionId: ctx.sessionId,
      projectName: ctx.projectName,
      timestamp: new Date().toISOString(),
      metadata: ctx.metadata,
    });
    return engine.decompose(input);
  }
}
