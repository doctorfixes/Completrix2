import { InvariantEnforcer } from './invariantEnforcer.js';
import { ConstraintEnforcer } from './constraintEnforcer.js';
export class GovernanceWrapper {
    name;
    inner;
    invariantEnforcer = new InvariantEnforcer();
    constraintEnforcer = new ConstraintEnforcer();
    constructor(inner) {
        this.inner = inner;
        this.name = `governed-${inner.name}`;
    }
    async run(input, ctx) {
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
