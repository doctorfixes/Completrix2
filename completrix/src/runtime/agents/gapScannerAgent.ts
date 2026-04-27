import type { Agent } from '../contracts/agent.js';
import type { RuntimeContext } from '../contracts/runtimeContext.js';
import type { RepoIndex } from '../../shared/v4/self/repoIndex.js';
import type { Gap } from '../../shared/v4/self/gaps.js';
import { GapScannerV4 } from '../../autonomous/self/gapScanner/gapScannerV4.js';

export class GapScannerAgent implements Agent<RepoIndex, Gap[]> {
  readonly name = 'gap-scanner-agent';

  async run(input: RepoIndex, _ctx: RuntimeContext): Promise<Gap[]> {
    const scanner = new GapScannerV4();
    return scanner.scan(input);
  }
}
