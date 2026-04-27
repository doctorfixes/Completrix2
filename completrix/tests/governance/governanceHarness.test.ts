import { describe, it, expect } from 'vitest';
import { validateInvariants } from './invariantValidator.js';
import { validateConstraints } from './constraintValidator.js';
import { validateDrift } from './driftValidator.js';
import { validateAutoFix } from './autoFixValidator.js';
import type { FinalSystemSpec } from '../../src/shared/v4/contracts/FinalSystemSpec.js';
import { FixType } from '../../src/shared/v4/self/fixes.js';
import type { Fix } from '../../src/shared/v4/self/fixes.js';

const validSpec: FinalSystemSpec = {
  id: 'harness-spec',
  name: 'Harness Spec',
  description: 'Governance harness test spec',
  version: '1.0.0',
  clusters: [
    { id: 'c1', name: 'Core', modules: ['m1'], responsibilities: ['core functionality'] },
  ],
  contracts: [],
  dependencies: {
    nodes: ['c1'],
    edges: [],
  },
};

describe('Governance Harness', () => {
  it('should pass invariant validation for a valid spec', () => {
    expect(validateInvariants(validSpec)).toBe(true);
  });

  it('should pass constraint validation for a valid spec', () => {
    expect(validateConstraints(validSpec)).toBe(true);
  });

  it('should detect no drift when specs are identical', () => {
    expect(validateDrift(validSpec, validSpec)).toBe(true);
  });

  it('should detect drift when clusters change', () => {
    const modified: FinalSystemSpec = {
      ...validSpec,
      version: '2.0.0',
      clusters: [
        ...validSpec.clusters,
        { id: 'c2', name: 'New Cluster', modules: [], responsibilities: [] },
      ],
      dependencies: { nodes: ['c1', 'c2'], edges: [] },
    };
    expect(validateDrift(validSpec, modified)).toBe(false);
  });

  it('should validate a well-formed fix', () => {
    const fix: Fix = {
      id: 'fix-1',
      gapId: 'gap-1',
      type: FixType.AddModule,
      description: 'Add missing module',
      patch: '// add module',
      estimatedEffort: 4,
    };
    expect(validateAutoFix(fix)).toBe(true);
  });
});
