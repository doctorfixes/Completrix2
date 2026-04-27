export interface ClusterDefinition {
    id: string;
    name: string;
    modules: string[];
    responsibilities: string[];
}
export interface ContractDefinition {
    id: string;
    name: string;
    type: 'interface' | 'event' | 'api';
    schema: Record<string, unknown>;
}
export interface DependencyGraph {
    nodes: string[];
    edges: Array<{
        from: string;
        to: string;
        type: string;
    }>;
}
export interface FinalSystemSpec {
    id: string;
    name: string;
    description: string;
    version: string;
    clusters: ClusterDefinition[];
    contracts: ContractDefinition[];
    dependencies: DependencyGraph;
}
