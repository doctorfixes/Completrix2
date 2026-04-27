export interface ClusterNode {
  id: string;
  name: string;
  type: string;
  metadata: Record<string, unknown>;
}

export interface Edge {
  from: string;
  to: string;
  label: string;
}

export interface ClusterStructureMap {
  clusters: Record<string, ClusterNode>;
  edges: Edge[];
}
