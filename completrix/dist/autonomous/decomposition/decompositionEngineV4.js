export class DecompositionEngineV4 {
    context;
    constructor(context) {
        this.context = context;
    }
    async decompose(spec) {
        const clusters = {};
        for (const cluster of spec.clusters) {
            clusters[cluster.id] = {
                id: cluster.id,
                name: cluster.name,
                type: 'cluster',
                metadata: { modules: cluster.modules },
            };
        }
        const edges = spec.dependencies.edges.map(e => ({
            from: e.from,
            to: e.to,
            label: e.type,
        }));
        return { clusters, edges };
    }
}
