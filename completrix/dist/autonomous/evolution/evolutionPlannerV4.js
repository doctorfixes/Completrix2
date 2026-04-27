export class EvolutionPlannerV4 {
    context;
    constructor(context) {
        this.context = context;
    }
    async plan(current, target) {
        const addedClusters = target.clusters.filter(tc => !current.clusters.find(cc => cc.id === tc.id));
        const steps = addedClusters.map(c => ({
            id: `step-add-${c.id}`,
            description: `Add cluster ${c.name}`,
            type: 'additive',
            affectedComponents: [c.id],
        }));
        return {
            id: `evolution-${current.id}-to-${target.id}`,
            fromVersion: current.version,
            toVersion: target.version,
            steps,
            breakingChanges: false,
        };
    }
}
