import type { FinalSystemSpec } from '../../src/shared/v4/contracts/FinalSystemSpec.js';
import { InvariantEnforcer } from '../../src/runtime/governance/invariantEnforcer.js';

export function validateInvariants(spec: FinalSystemSpec): boolean {
  const enforcer = new InvariantEnforcer();
  const violations = enforcer.enforce(spec);
  return violations.length === 0;
}
