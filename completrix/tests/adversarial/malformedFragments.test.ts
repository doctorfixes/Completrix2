import { describe, it, expect } from 'vitest';
import { validateFinalSystemSpec } from '../../src/shared/v4/schemas/finalSystemSpecSchema.js';

describe('Malformed Fragment Handling', () => {
  it('should reject null input', () => {
    expect(() => validateFinalSystemSpec(null)).toThrow();
  });

  it('should reject missing required fields', () => {
    expect(() => validateFinalSystemSpec({ id: 'test' })).toThrow();
  });

  it('should reject wrong types', () => {
    expect(() => validateFinalSystemSpec({
      id: 123,
      name: 'test',
      description: 'test',
      version: '1.0',
      clusters: [],
      contracts: [],
      dependencies: { nodes: [], edges: [] },
    })).toThrow();
  });

  it('should accept a valid spec', () => {
    const valid = {
      id: 'test',
      name: 'Test',
      description: 'Test system',
      version: '1.0.0',
      clusters: [],
      contracts: [],
      dependencies: { nodes: [], edges: [] },
    };
    expect(() => validateFinalSystemSpec(valid)).not.toThrow();
  });
});
