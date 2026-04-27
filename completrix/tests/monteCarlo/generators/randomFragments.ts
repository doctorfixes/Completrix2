import type { FinalSystemSpec } from '../../../src/shared/v4/contracts/FinalSystemSpec.js';

export function generateRandomFragment(): Partial<FinalSystemSpec> {
  const id = `spec-${Math.random().toString(36).slice(2)}`;
  const clusterCount = Math.floor(Math.random() * 4) + 1;
  const clusters = Array.from({ length: clusterCount }, (_, i) => ({
    id: `c${i}`,
    name: `Cluster ${i}`,
    modules: [`m${i}`],
    responsibilities: [`resp${i}`],
  }));
  return {
    id,
    name: `Random System ${id}`,
    description: 'Randomly generated system',
    version: '1.0.0',
    clusters,
    contracts: [],
    dependencies: {
      nodes: clusters.map(c => c.id),
      edges: [],
    },
  };
}
