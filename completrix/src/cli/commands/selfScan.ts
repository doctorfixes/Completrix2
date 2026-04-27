import { Command } from 'commander';
import { GapScannerV4 } from '../../autonomous/self/gapScanner/gapScannerV4.js';
import type { RepoIndex } from '../../shared/v4/self/repoIndex.js';

export const selfScanCommand = new Command('self-scan')
  .description('Scan repo for gaps')
  .argument('<repoIndex>', 'JSON of RepoIndex')
  .action(async (indexJson: string) => {
    const index = JSON.parse(indexJson) as RepoIndex;
    const scanner = new GapScannerV4();
    const result = await scanner.scan(index);
    console.log(JSON.stringify(result, null, 2));
  });
