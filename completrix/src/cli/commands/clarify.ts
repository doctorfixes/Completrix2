import { Command } from 'commander';
import { z } from 'zod';
import { ClarificationEngineV4 } from '../../autonomous/clarification/clarificationEngineV4.js';
import { readStdin } from '../stdinHelper.js';

const clarifyInputSchema = z.object({ intent: z.string().min(1) });

export const clarifyCommand = new Command('clarify')
  .description('Clarify a system intent. Accepts a JSON object {"intent":"..."} from argument or stdin.')
  .argument('[input]', 'JSON object with intent field, or reads from stdin if omitted')
  .action(async (input?: string) => {
    const raw = input ?? await readStdin();
    const parsed = clarifyInputSchema.parse(JSON.parse(raw));
    const engine = new ClarificationEngineV4({
      sessionId: `cli-${Date.now()}`,
      projectName: 'cli',
      timestamp: new Date().toISOString(),
      metadata: {},
    });
    const result = await engine.clarify(parsed.intent);
    console.log(JSON.stringify(result, null, 2));
  });
