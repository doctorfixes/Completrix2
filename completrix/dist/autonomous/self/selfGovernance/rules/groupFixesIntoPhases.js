export function groupFixesIntoPhases(fixes) {
    const phaseMap = new Map();
    for (const fix of fixes) {
        const key = fix.type;
        const existing = phaseMap.get(key) ?? [];
        existing.push(fix);
        phaseMap.set(key, existing);
    }
    return Array.from(phaseMap.entries()).map(([type, phaseFixes]) => ({
        id: `phase-${type}`,
        name: `Phase: ${type}`,
        fixes: phaseFixes,
        dependsOn: [],
        risks: [],
    }));
}
