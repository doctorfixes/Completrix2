export class PipelineRegistry {
    pipelines = new Map();
    register(pipeline) {
        this.pipelines.set(pipeline.id, pipeline);
    }
    get(id) {
        return this.pipelines.get(id);
    }
}
