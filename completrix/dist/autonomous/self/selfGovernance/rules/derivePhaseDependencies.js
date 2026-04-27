export function derivePhaseDependencies(phases) {
    return phases.map((phase, index) => ({
        ...phase,
        dependsOn: index > 0 ? [phases[index - 1].id] : [],
    }));
}
