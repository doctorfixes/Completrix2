export interface EvolutionStep {
    id: string;
    description: string;
    type: 'additive' | 'breaking' | 'deprecation' | 'refactor';
    affectedComponents: string[];
}
export interface EvolutionPlan {
    id: string;
    fromVersion: string;
    toVersion: string;
    steps: EvolutionStep[];
    breakingChanges: boolean;
}
