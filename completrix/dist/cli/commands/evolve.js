import { Command } from 'commander';
import { EvolutionPlannerV4 } from '../../autonomous/evolution/evolutionPlannerV4.js';
export const evolveCommand = new Command('evolve')
    .description('Plan evolution between two system specs')
    .argument('<current>', 'JSON of current FinalSystemSpec')
    .argument('<target>', 'JSON of target FinalSystemSpec')
    .action(async (currentJson, targetJson) => {
    const current = JSON.parse(currentJson);
    const target = JSON.parse(targetJson);
    const engine = new EvolutionPlannerV4({
        sessionId: `cli-${Date.now()}`,
        projectName: 'cli',
        timestamp: new Date().toISOString(),
        metadata: {},
    });
    const result = await engine.plan(current, target);
    console.log(JSON.stringify(result, null, 2));
});
