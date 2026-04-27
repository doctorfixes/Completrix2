import { Command } from 'commander';
import { DecompositionEngineV4 } from '../../autonomous/decomposition/decompositionEngineV4.js';
import { validateFinalSystemSpec } from '../../shared/v4/schemas/finalSystemSpecSchema.js';
import { readStdin } from '../stdinHelper.js';

export const decomposeCommand = new Command('decompose')
  .description('Decompose a system spec into cluster structure. Accepts FinalSystemSpec JSON from argument or stdin.')
  .argument('[spec]', 'JSON string of FinalSystemSpec, or reads from stdin if omitted')
  .action(async (specArg?: string) => {
    const raw = specArg ?? await readStdin();
    const spec = validateFinalSystemSpec(JSON.parse(raw));
    const engine = new DecompositionEngineV4({
      sessionId: `cli-${Date.now()}`,
      projectName: 'cli',
      timestamp: new Date().toISOString(),
      metadata: {},
    });
    const result = await engine.decompose(spec);
    console.log(JSON.stringify(result, null, 2));
  });
