export class ConstraintEnforcer {
    maxClusters = 20;
    maxContracts = 50;
    enforce(spec) {
        const violations = [];
        if (spec.clusters.length > this.maxClusters) {
            violations.push(`Constraint violation: too many clusters (${spec.clusters.length} > ${this.maxClusters})`);
        }
        if (spec.contracts.length > this.maxContracts) {
            violations.push(`Constraint violation: too many contracts (${spec.contracts.length} > ${this.maxContracts})`);
        }
        return violations;
    }
}
