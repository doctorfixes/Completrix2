import type { Agent } from '../contracts/agent.js';
import type { RuntimeContext } from '../contracts/runtimeContext.js';
import { type ClarifiedIntent } from '../../autonomous/clarification/clarificationEngineV4.js';
export declare class ClarificationAgent implements Agent<string, ClarifiedIntent> {
    readonly name = "clarification-agent";
    run(input: string, ctx: RuntimeContext): Promise<ClarifiedIntent>;
}
