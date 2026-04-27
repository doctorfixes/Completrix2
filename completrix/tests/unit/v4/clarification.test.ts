import { describe, it, expect } from 'vitest';
import { ClarificationEngineV4 } from '../../../src/autonomous/clarification/clarificationEngineV4.js';

const ctx = {
  sessionId: 'test-session',
  projectName: 'test-project',
  timestamp: new Date().toISOString(),
  metadata: {},
};

describe('ClarificationEngineV4', () => {
  it('should return a ClarifiedIntent with required fields', async () => {
    const engine = new ClarificationEngineV4(ctx);
    const result = await engine.clarify('Build a microservices platform');
    expect(result).toHaveProperty('original');
    expect(result).toHaveProperty('clarified');
    expect(result).toHaveProperty('assumptions');
    expect(result).toHaveProperty('questions');
    expect(result.original).toBe('Build a microservices platform');
    expect(Array.isArray(result.assumptions)).toBe(true);
    expect(Array.isArray(result.questions)).toBe(true);
  });

  it('should preserve the original intent', async () => {
    const engine = new ClarificationEngineV4(ctx);
    const intent = 'Create a data pipeline';
    const result = await engine.clarify(intent);
    expect(result.original).toBe(intent);
  });
});
