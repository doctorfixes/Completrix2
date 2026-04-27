import type { Agent } from '../contracts/agent.js';
import type { RuntimeContext } from '../contracts/runtimeContext.js';
import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';
import { InvariantEnforcer } from './invariantEnforcer.js';
import { ConstraintEnforcer } from './constraintEnforcer.js';

export class GovernanceWrapper<TInput> implements Agent<TInput, FinalSystemSpec> {
  readonly name: string;
  private inner: Agent<TInput, FinalSystemSpec>;
  private invariantEnforcer = new InvariantEnforcer();
  private constraintEnforcer = new ConstraintEnforcer();

  constructor(inner: Agent<TInput, FinalSystemSpec>) {
    this.inner = inner;
    this.name = `governed-${inner.name}`;
  }

  async run(input: TInput, ctx: RuntimeContext): Promise<FinalSystemSpec> {
    const result = await this.inner.run(input, ctx);
    const invariantViolations = this.invariantEnforcer.enforce(result);
    const constraintViolations = this.constraintEnforcer.enforce(result);
    const allViolations = [...invariantViolations, ...constraintViolations];
    if (allViolations.length > 0) {
      throw new Error(`Governance violations detected:\n${allViolations.join('\n')}`);
    }
    return result;
  }
}
