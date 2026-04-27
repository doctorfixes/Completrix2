import type { Agent } from '../contracts/agent.js';
import type { RuntimeContext } from '../contracts/runtimeContext.js';
import type { RepoIndex } from '../../shared/v4/self/repoIndex.js';
import type { Gap } from '../../shared/v4/self/gaps.js';
export declare class SelfScanAgent implements Agent<RepoIndex, Gap[]> {
    readonly name = "self-scan-agent";
    run(input: RepoIndex, _ctx: RuntimeContext): Promise<Gap[]>;
}
