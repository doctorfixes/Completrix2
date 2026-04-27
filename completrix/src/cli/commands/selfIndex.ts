import { Command } from 'commander';
import { RepoIndexerV4 } from '../../autonomous/self/indexer/repoIndexerV4.js';
import { resolve } from 'path';

export const selfIndexCommand = new Command('self-index')
  .description('Generate a RepoIndex JSON by scanning a directory. Output can be piped to self-scan.')
  .argument('[root]', 'Root directory to scan (defaults to current directory)', '.')
  .action((root: string) => {
    const indexer = new RepoIndexerV4();
    const result = indexer.index(resolve(root));
    console.log(JSON.stringify(result, null, 2));
  });
