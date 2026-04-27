import type { SelfModule } from './common.js';

export interface RepoIndex {
  root: string;
  modules: SelfModule[];
  lastScanned: string;
  totalFiles: number;
}
