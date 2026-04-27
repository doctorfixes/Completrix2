import { describe, it, expect } from 'vitest';
import { ClarificationEngineV4 } from '../../src/autonomous/clarification/clarificationEngineV4.js';
import { PortfolioOptimizerV4 } from '../../src/autonomous/portfolio/portfolioOptimizerV4.js';
import { CreationEngineV4 } from '../../src/autonomous/creation/creationEngineV4.js';
import type { ExecutionPlan } from '../../src/shared/v4/contracts/ExecutionPlan.js';

const ctx = {
  sessionId: 'scenario-session',
  projectName: 'multi-system-test',
  timestamp: new Date().toISOString(),
  metadata: {},
};

describe('Multi-System Scenario', () => {
  it('should clarify, create, and optimize multiple systems', async () => {
    const clarifier = new ClarificationEngineV4(ctx);
    const creator = new CreationEngineV4(ctx);
    const optimizer = new PortfolioOptimizerV4(ctx);

    const intents = ['Build e-commerce platform', 'Build analytics dashboard'];
    const clarified = await Promise.all(intents.map(i => clarifier.clarify(i)));
    expect(clarified).toHaveLength(2);

    const plans: ExecutionPlan[] = clarified.map((_, i) => ({
      id: `plan-${i}`,
      phases: [{ id: `phase-${i}`, name: `Phase ${i}`, tasks: [], dependsOn: [], estimatedDuration: 5 }],
      estimatedDuration: 5,
      parallelizable: true,
    }));

    const specs = await Promise.all(plans.map(p => creator.create(p)));
    expect(specs).toHaveLength(2);

    const portfolio = await optimizer.optimize(specs);
    expect(portfolio.systems).toHaveLength(2);
    expect(portfolio.totalValue).toBeGreaterThan(0);
  });
});
