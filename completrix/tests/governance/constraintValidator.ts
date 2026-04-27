import type { FinalSystemSpec } from '../../src/shared/v4/contracts/FinalSystemSpec.js';
import { ConstraintEnforcer } from '../../src/runtime/governance/constraintEnforcer.js';

export function validateConstraints(spec: FinalSystemSpec): boolean {
  const enforcer = new ConstraintEnforcer();
  const violations = enforcer.enforce(spec);
  return violations.length === 0;
}
