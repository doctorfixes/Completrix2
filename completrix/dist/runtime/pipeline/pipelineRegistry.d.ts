import type { Pipeline } from '../contracts/pipeline.js';
export declare class PipelineRegistry {
    private pipelines;
    register(pipeline: Pipeline): void;
    get(id: string): Pipeline | undefined;
}
