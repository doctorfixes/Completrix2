import type { PipelineRegistry } from './pipelineRegistry.js';

export class PipelineOrchestrator {
  private registry: PipelineRegistry;

  constructor(registry: PipelineRegistry) {
    this.registry = registry;
  }

  async run(pipelineId: string, input: unknown): Promise<unknown> {
    const pipeline = this.registry.get(pipelineId);
    if (!pipeline) {
      throw new Error(`Pipeline not found: ${pipelineId}`);
    }
    return pipeline.run(input);
  }
}
