import type { ClusterNode } from '../../../src/shared/v4/contracts/ClusterStructureMap.js';

export function generateRandomCluster(): ClusterNode {
  const id = `cluster-${Math.random().toString(36).slice(2)}`;
  return {
    id,
    name: `Cluster ${id}`,
    type: ['service', 'gateway', 'database'][Math.floor(Math.random() * 3)] ?? 'service',
    metadata: { random: Math.random() },
  };
}
