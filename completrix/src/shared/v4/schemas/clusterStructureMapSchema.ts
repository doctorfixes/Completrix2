import { z } from 'zod';
import type { ClusterStructureMap } from '../contracts/ClusterStructureMap.js';

export const clusterNodeSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  metadata: z.record(z.unknown()),
});

export const edgeSchema = z.object({
  from: z.string(),
  to: z.string(),
  label: z.string(),
});

export const clusterStructureMapSchema = z.object({
  clusters: z.record(clusterNodeSchema),
  edges: z.array(edgeSchema),
});

export function validateClusterStructureMap(data: unknown): ClusterStructureMap {
  return clusterStructureMapSchema.parse(data) as ClusterStructureMap;
}
