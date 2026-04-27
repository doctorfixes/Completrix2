export class PipelineOrchestrator {
    registry;
    constructor(registry) {
        this.registry = registry;
    }
    async run(pipelineId, input) {
        const pipeline = this.registry.get(pipelineId);
        if (!pipeline) {
            throw new Error(`Pipeline not found: ${pipelineId}`);
        }
        return pipeline.run(input);
    }
}
