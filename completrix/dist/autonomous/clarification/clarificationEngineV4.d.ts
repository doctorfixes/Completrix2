import type { CompletrixContext } from '../../shared/v4/common/context.js';
export interface ClarifiedIntent {
    original: string;
    clarified: string;
    assumptions: string[];
    questions: string[];
}
export declare class ClarificationEngineV4 {
    private context;
    constructor(context: CompletrixContext);
    clarify(intent: string): Promise<ClarifiedIntent>;
}
