import { describe, it, expect } from 'vitest';
import { CreationEngineV4 } from '../../src/autonomous/creation/creationEngineV4.js';
import { validateFinalSystemSpec } from '../../src/shared/v4/schemas/finalSystemSpecSchema.js';
import type { ExecutionPlan } from '../../src/shared/v4/contracts/ExecutionPlan.js';

const ctx = {
  sessionId: 'scenario-session',
  projectName: 'creation-test',
  timestamp: new Date().toISOString(),
  metadata: {},
};

describe('Creation Scenario', () => {
  it('should create a valid FinalSystemSpec that passes schema validation', async () => {
    const plan: ExecutionPlan = {
      id: 'full-plan',
      phases: [
        { id: 'infra', name: 'Infrastructure', tasks: ['setup-k8s', 'setup-db'], dependsOn: [], estimatedDuration: 10 },
        { id: 'backend', name: 'Backend', tasks: ['api', 'workers'], dependsOn: ['infra'], estimatedDuration: 20 },
        { id: 'frontend', name: 'Frontend', tasks: ['ui', 'cdn'], dependsOn: ['backend'], estimatedDuration: 15 },
      ],
      estimatedDuration: 45,
      parallelizable: false,
    };

    const engine = new CreationEngineV4(ctx);
    const spec = await engine.create(plan);
    const validated = validateFinalSystemSpec(spec);
    expect(validated.id).toBe(spec.id);
    expect(validated.clusters).toHaveLength(3);
  });
});
