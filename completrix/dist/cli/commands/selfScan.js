import { Command } from 'commander';
import { GapScannerV4 } from '../../autonomous/self/gapScanner/gapScannerV4.js';
export const selfScanCommand = new Command('self-scan')
    .description('Scan repo for gaps')
    .argument('<repoIndex>', 'JSON of RepoIndex')
    .action(async (indexJson) => {
    const index = JSON.parse(indexJson);
    const scanner = new GapScannerV4();
    const result = await scanner.scan(index);
    console.log(JSON.stringify(result, null, 2));
});
