import type { Agent } from '../contracts/agent.js';
import type { RuntimeContext } from '../contracts/runtimeContext.js';
import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';
import { InvariantEnforcer } from './invariantEnforcer.js';
import { ConstraintEnforcer } from './constraintEnforcer.js';

function isFinalSystemSpec(value: unknown): value is FinalSystemSpec {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as FinalSystemSpec).id === 'string' &&
    Array.isArray((value as FinalSystemSpec).clusters) &&
    Array.isArray((value as FinalSystemSpec).contracts) &&
    typeof (value as FinalSystemSpec).dependencies === 'object' &&
    (value as FinalSystemSpec).dependencies !== null
  );
}

export class GovernanceWrapper<TInput, TOutput> implements Agent<TInput, TOutput> {
  readonly name: string;
  private inner: Agent<TInput, TOutput>;
  private invariantEnforcer = new InvariantEnforcer();
  private constraintEnforcer = new ConstraintEnforcer();

  constructor(inner: Agent<TInput, TOutput>) {
    this.inner = inner;
    this.name = `governed-${inner.name}`;
  }

  async run(input: TInput, ctx: RuntimeContext): Promise<TOutput> {
    const result = await this.inner.run(input, ctx);
    if (isFinalSystemSpec(result)) {
      const invariantViolations = this.invariantEnforcer.enforce(result);
      const constraintViolations = this.constraintEnforcer.enforce(result);
      const allViolations = [...invariantViolations, ...constraintViolations];
      if (allViolations.length > 0) {
        throw new Error(`Governance violations detected:\n${allViolations.join('\n')}`);
      }
    }
    return result;
  }
}
