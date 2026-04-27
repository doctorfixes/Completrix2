import { Command } from 'commander';
import { GapScannerV4 } from '../../autonomous/self/gapScanner/gapScannerV4.js';
import { validateRepoIndex } from '../../shared/v4/schemas/repoIndexSchema.js';
import { readStdin } from '../stdinHelper.js';

export const selfScanCommand = new Command('self-scan')
  .description('Scan repo for gaps. Accepts RepoIndex JSON from argument or stdin.')
  .argument('[repoIndex]', 'JSON of RepoIndex, or reads from stdin if omitted')
  .action(async (indexArg?: string) => {
    const raw = indexArg ?? await readStdin();
    const index = validateRepoIndex(JSON.parse(raw));
    const scanner = new GapScannerV4();
    const result = await scanner.scan(index);
    console.log(JSON.stringify(result, null, 2));
  });
