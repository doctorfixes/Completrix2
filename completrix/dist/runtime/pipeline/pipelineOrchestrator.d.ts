import type { PipelineRegistry } from './pipelineRegistry.js';
export declare class PipelineOrchestrator {
    private registry;
    constructor(registry: PipelineRegistry);
    run(pipelineId: string, input: unknown): Promise<unknown>;
}
