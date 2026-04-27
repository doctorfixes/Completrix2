import { Command } from 'commander';
import { CreationEngineV4 } from '../../autonomous/creation/creationEngineV4.js';
import { validateExecutionPlan } from '../../shared/v4/schemas/executionPlanSchema.js';
import { readStdin } from '../stdinHelper.js';

export const createCommand = new Command('create')
  .description('Create a system spec from an execution plan. Accepts ExecutionPlan JSON from argument or stdin.')
  .argument('[plan]', 'JSON string of ExecutionPlan, or reads from stdin if omitted')
  .action(async (planArg?: string) => {
    const raw = planArg ?? await readStdin();
    const plan = validateExecutionPlan(JSON.parse(raw));
    const engine = new CreationEngineV4({
      sessionId: `cli-${Date.now()}`,
      projectName: 'cli',
      timestamp: new Date().toISOString(),
      metadata: {},
    });
    const result = await engine.create(plan);
    console.log(JSON.stringify(result, null, 2));
  });
