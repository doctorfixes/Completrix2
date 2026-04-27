import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';

export class InvariantEnforcer {
  enforce(spec: FinalSystemSpec): string[] {
    const violations: string[] = [];
    const nodeSet = new Set(spec.dependencies.nodes);
    for (const edge of spec.dependencies.edges) {
      if (!nodeSet.has(edge.from)) {
        violations.push(`Invariant violation: unknown node '${edge.from}' in dependency edge`);
      }
      if (!nodeSet.has(edge.to)) {
        violations.push(`Invariant violation: unknown node '${edge.to}' in dependency edge`);
      }
    }
    if (!spec.id || spec.id.trim() === '') {
      violations.push('Invariant violation: spec must have a non-empty id');
    }
    return violations;
  }
}
