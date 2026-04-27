export interface SystemEntry {
    systemId: string;
    name: string;
    value: number;
    priority: number;
}
export interface Optimization {
    id: string;
    type: string;
    description: string;
    impact: number;
    affectedSystems: string[];
}
export interface PortfolioOptimizationPlan {
    portfolioId: string;
    systems: SystemEntry[];
    optimizations: Optimization[];
    totalValue: number;
}
