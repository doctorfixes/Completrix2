import { Command } from 'commander';
import { PortfolioOptimizerV4 } from '../../autonomous/portfolio/portfolioOptimizerV4.js';
import { finalSystemSpecSchema } from '../../shared/v4/schemas/finalSystemSpecSchema.js';
import { z } from 'zod';
import { readStdin } from '../stdinHelper.js';

const optimizeInputSchema = z.array(finalSystemSpecSchema);

export const optimizeCommand = new Command('optimize')
  .description('Optimize a portfolio of systems. Accepts FinalSystemSpec[] JSON from argument or stdin.')
  .argument('[systems]', 'JSON array of FinalSystemSpec, or reads from stdin if omitted')
  .action(async (systemsArg?: string) => {
    const raw = systemsArg ?? await readStdin();
    const systems = optimizeInputSchema.parse(JSON.parse(raw));
    const engine = new PortfolioOptimizerV4({
      sessionId: `cli-${Date.now()}`,
      projectName: 'cli',
      timestamp: new Date().toISOString(),
      metadata: {},
    });
    const result = await engine.optimize(systems);
    console.log(JSON.stringify(result, null, 2));
  });
