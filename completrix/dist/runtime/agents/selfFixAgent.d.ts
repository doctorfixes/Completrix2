import type { Agent } from '../contracts/agent.js';
import type { RuntimeContext } from '../contracts/runtimeContext.js';
import type { Gap } from '../../shared/v4/self/gaps.js';
import type { Fix } from '../../shared/v4/self/fixes.js';
export declare class SelfFixAgent implements Agent<Gap[], Fix[]> {
    readonly name = "self-fix-agent";
    run(input: Gap[], _ctx: RuntimeContext): Promise<Fix[]>;
}
