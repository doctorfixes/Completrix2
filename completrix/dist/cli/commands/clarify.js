import { Command } from 'commander';
import { ClarificationEngineV4 } from '../../autonomous/clarification/clarificationEngineV4.js';
export const clarifyCommand = new Command('clarify')
    .description('Clarify a system intent')
    .argument('<intent>', 'System intent to clarify')
    .action(async (intent) => {
    const engine = new ClarificationEngineV4({
        sessionId: `cli-${Date.now()}`,
        projectName: 'cli',
        timestamp: new Date().toISOString(),
        metadata: {},
    });
    const result = await engine.clarify(intent);
    console.log(JSON.stringify(result, null, 2));
});
