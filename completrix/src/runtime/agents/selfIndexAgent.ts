import type { Agent } from '../contracts/agent.js';
import type { RuntimeContext } from '../contracts/runtimeContext.js';
import type { RepoIndex } from '../../shared/v4/self/repoIndex.js';
import { RepoIndexerV4 } from '../../autonomous/self/indexer/repoIndexerV4.js';

export class SelfIndexAgent implements Agent<string, RepoIndex> {
  readonly name = 'self-index-agent';

  async run(root: string, _ctx: RuntimeContext): Promise<RepoIndex> {
    const indexer = new RepoIndexerV4();
    return indexer.index(root);
  }
}
