import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';

export class ConstraintEnforcer {
  private readonly maxClusters = 20;
  private readonly maxContracts = 50;

  enforce(spec: FinalSystemSpec): string[] {
    const violations: string[] = [];
    if (spec.clusters.length > this.maxClusters) {
      violations.push(`Constraint violation: too many clusters (${spec.clusters.length} > ${this.maxClusters})`);
    }
    if (spec.contracts.length > this.maxContracts) {
      violations.push(`Constraint violation: too many contracts (${spec.contracts.length} > ${this.maxContracts})`);
    }
    return violations;
  }
}
