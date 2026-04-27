import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';

export class DriftMonitor {
  detect(before: FinalSystemSpec, after: FinalSystemSpec): string[] {
    const changes: string[] = [];
    if (before.version !== after.version) {
      changes.push(`Version changed: ${before.version} -> ${after.version}`);
    }
    const beforeClusters = new Set(before.clusters.map(c => c.id));
    for (const cluster of after.clusters) {
      if (!beforeClusters.has(cluster.id)) {
        changes.push(`New cluster added: ${cluster.id}`);
      }
    }
    const afterClusters = new Set(after.clusters.map(c => c.id));
    for (const cluster of before.clusters) {
      if (!afterClusters.has(cluster.id)) {
        changes.push(`Cluster removed: ${cluster.id}`);
      }
    }
    return changes;
  }
}
