import { z } from 'zod';
import { ModuleType } from '../self/common.js';
import type { RepoIndex } from '../self/repoIndex.js';

export const selfModuleSchema = z.object({
  path: z.string(),
  type: z.nativeEnum(ModuleType),
  exports: z.array(z.string()),
});

export const repoIndexSchema = z.object({
  root: z.string(),
  modules: z.array(selfModuleSchema),
  lastScanned: z.string(),
  totalFiles: z.number(),
});

export function validateRepoIndex(data: unknown): RepoIndex {
  return repoIndexSchema.parse(data) as RepoIndex;
}
