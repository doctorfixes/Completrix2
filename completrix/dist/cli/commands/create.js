import { Command } from 'commander';
import { CreationEngineV4 } from '../../autonomous/creation/creationEngineV4.js';
export const createCommand = new Command('create')
    .description('Create a system spec from an execution plan')
    .argument('<plan>', 'JSON string of ExecutionPlan')
    .action(async (planJson) => {
    const plan = JSON.parse(planJson);
    const engine = new CreationEngineV4({
        sessionId: `cli-${Date.now()}`,
        projectName: 'cli',
        timestamp: new Date().toISOString(),
        metadata: {},
    });
    const result = await engine.create(plan);
    console.log(JSON.stringify(result, null, 2));
});
