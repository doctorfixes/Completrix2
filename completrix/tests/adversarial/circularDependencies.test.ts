import { describe, it, expect } from 'vitest';
import { InvariantEnforcer } from '../../src/runtime/governance/invariantEnforcer.js';
import type { FinalSystemSpec } from '../../src/shared/v4/contracts/FinalSystemSpec.js';

describe('Circular Dependencies', () => {
  it('should detect references to unknown nodes', () => {
    const spec: FinalSystemSpec = {
      id: 'circular-sys',
      name: 'Circular System',
      description: 'System with bad deps',
      version: '1.0.0',
      clusters: [{ id: 'c1', name: 'C1', modules: [], responsibilities: [] }],
      contracts: [],
      dependencies: {
        nodes: ['c1'],
        edges: [
          { from: 'c1', to: 'c2', type: 'depends-on' }, // c2 doesn't exist
        ],
      },
    };

    const enforcer = new InvariantEnforcer();
    const violations = enforcer.enforce(spec);
    expect(violations.length).toBeGreaterThan(0);
    expect(violations[0]).toContain('c2');
  });

  it('should pass for a valid spec with no bad deps', () => {
    const spec: FinalSystemSpec = {
      id: 'valid-sys',
      name: 'Valid System',
      description: 'Valid',
      version: '1.0.0',
      clusters: [
        { id: 'c1', name: 'C1', modules: [], responsibilities: [] },
        { id: 'c2', name: 'C2', modules: [], responsibilities: [] },
      ],
      contracts: [],
      dependencies: {
        nodes: ['c1', 'c2'],
        edges: [{ from: 'c1', to: 'c2', type: 'depends-on' }],
      },
    };

    const enforcer = new InvariantEnforcer();
    const violations = enforcer.enforce(spec);
    expect(violations).toHaveLength(0);
  });
});
