import { Command } from 'commander';
import { SelfCompleteEngineV1 } from '../../autonomous/self/selfComplete/selfCompleteEngineV1.js';
import { validateRepoIndex } from '../../shared/v4/schemas/repoIndexSchema.js';
import { readStdin } from '../stdinHelper.js';

export const selfCompleteCommand = new Command('self-complete')
  .description(
    'Scan, fix, and apply fixes in a convergence loop until no gaps remain. Accepts RepoIndex JSON from argument or stdin.'
  )
  .argument('[repoIndex]', 'JSON of RepoIndex, or reads from stdin if omitted')
  .option('--mutate', 'Write generated file stubs to disk in addition to updating the index', false)
  .action(async (indexArg?: string, options?: { mutate?: boolean }) => {
    const raw = indexArg ?? await readStdin();
    const index = validateRepoIndex(JSON.parse(raw));
    const engine = new SelfCompleteEngineV1();
    const result = await engine.complete(index, options?.mutate ?? false);
    console.log(JSON.stringify(result, null, 2));
  });
