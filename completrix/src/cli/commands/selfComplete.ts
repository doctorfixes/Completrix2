import { Command } from 'commander';
import { SelfCompleteEngineV1 } from '../../autonomous/self/selfComplete/selfCompleteEngineV1.js';
import { validateRepoIndex } from '../../shared/v4/schemas/repoIndexSchema.js';
import { readStdin } from '../stdinHelper.js';

export const selfCompleteCommand = new Command('self-complete')
  .description(
    'Scan, fix, and apply fixes in a convergence loop until no gaps remain. Accepts RepoIndex JSON from argument or stdin.'
  )
  .argument('[repoIndex]', 'JSON of RepoIndex, or reads from stdin if omitted')
  .action(async (indexArg?: string) => {
    const raw = indexArg ?? await readStdin();
    const index = validateRepoIndex(JSON.parse(raw));
    const engine = new SelfCompleteEngineV1();
    const result = await engine.complete(index);
    console.log(JSON.stringify(result, null, 2));
  });
