import { Command } from 'commander';
import { PortfolioOptimizerV4 } from '../../autonomous/portfolio/portfolioOptimizerV4.js';
export const optimizeCommand = new Command('optimize')
    .description('Optimize a portfolio of systems')
    .argument('<systems>', 'JSON array of FinalSystemSpec')
    .action(async (systemsJson) => {
    const systems = JSON.parse(systemsJson);
    const engine = new PortfolioOptimizerV4({
        sessionId: `cli-${Date.now()}`,
        projectName: 'cli',
        timestamp: new Date().toISOString(),
        metadata: {},
    });
    const result = await engine.optimize(systems);
    console.log(JSON.stringify(result, null, 2));
});
