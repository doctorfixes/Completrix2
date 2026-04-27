import { Command } from 'commander';
import { EvolutionPlannerV4 } from '../../autonomous/evolution/evolutionPlannerV4.js';
import { finalSystemSpecSchema } from '../../shared/v4/schemas/finalSystemSpecSchema.js';
import { z } from 'zod';
import { readStdin } from '../stdinHelper.js';

const evolveInputSchema = z.object({
  current: finalSystemSpecSchema,
  target: finalSystemSpecSchema,
});

export const evolveCommand = new Command('evolve')
  .description('Plan evolution between two system specs. Accepts {"current":...,"target":...} from stdin, or two JSON arguments.')
  .argument('[current]', 'JSON of current FinalSystemSpec, or {"current":...,"target":...} when used alone')
  .argument('[target]', 'JSON of target FinalSystemSpec')
  .action(async (currentArg?: string, targetArg?: string) => {
    let current, target;
    if (currentArg && targetArg) {
      current = finalSystemSpecSchema.parse(JSON.parse(currentArg));
      target = finalSystemSpecSchema.parse(JSON.parse(targetArg));
    } else {
      const raw = currentArg ?? await readStdin();
      const parsed = evolveInputSchema.parse(JSON.parse(raw));
      current = parsed.current;
      target = parsed.target;
    }
    const engine = new EvolutionPlannerV4({
      sessionId: `cli-${Date.now()}`,
      projectName: 'cli',
      timestamp: new Date().toISOString(),
      metadata: {},
    });
    const result = await engine.plan(current, target);
    console.log(JSON.stringify(result, null, 2));
  });
