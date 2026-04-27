export function derivePhaseRisks(phases) {
    const risks = [];
    for (const phase of phases) {
        if (phase.fixes.length > 5) {
            risks.push({
                id: `risk-large-phase-${phase.id}`,
                description: `Phase ${phase.name} has many fixes (${phase.fixes.length}), increasing regression risk`,
                severity: 'medium',
                mitigation: 'Split into smaller sub-phases',
            });
        }
    }
    return risks;
}
