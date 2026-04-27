import type { CompletrixContext } from '../../shared/v4/common/context.js';
import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';
import type { EvolutionPlan } from '../../shared/v4/contracts/EvolutionPlan.js';

export class EvolutionPlannerV4 {
  private context: CompletrixContext;

  constructor(context: CompletrixContext) {
    this.context = context;
  }

  async plan(current: FinalSystemSpec, target: FinalSystemSpec): Promise<EvolutionPlan> {
    const addedClusters = target.clusters.filter(
      tc => !current.clusters.find(cc => cc.id === tc.id)
    );
    const steps = addedClusters.map(c => ({
      id: `step-add-${c.id}`,
      description: `Add cluster ${c.name}`,
      type: 'additive' as const,
      affectedComponents: [c.id],
    }));
    return {
      id: `evolution-${current.id}-to-${target.id}`,
      fromVersion: current.version,
      toVersion: target.version,
      steps,
      breakingChanges: false,
    };
  }
}
