import type { ClusterStructureMap } from '../../../src/shared/v4/contracts/ClusterStructureMap.js';
import { generateRandomCluster } from './randomClusters.js';

export function generateRandomGraph(size: number): ClusterStructureMap {
  const clusterList = Array.from({ length: size }, () => generateRandomCluster());
  const clusters: ClusterStructureMap['clusters'] = {};
  for (const c of clusterList) {
    clusters[c.id] = c;
  }
  const edges = [];
  for (let i = 1; i < clusterList.length; i++) {
    const from = clusterList[i - 1]!;
    const to = clusterList[i]!;
    edges.push({ from: from.id, to: to.id, label: 'depends-on' });
  }
  return { clusters, edges };
}
