import type { Pipeline } from '../contracts/pipeline.js';

export class PipelineRegistry {
  private pipelines = new Map<string, Pipeline>();

  register(pipeline: Pipeline): void {
    this.pipelines.set(pipeline.id, pipeline);
  }

  get(id: string): Pipeline | undefined {
    return this.pipelines.get(id);
  }
}
