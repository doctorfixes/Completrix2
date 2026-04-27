import type { RepoIndex } from '../../../shared/v4/self/repoIndex.js';
import type { Gap } from '../../../shared/v4/self/gaps.js';
import { detectMissingModules } from './rules/detectMissingModules.js';
import { detectMissingContracts } from './rules/detectMissingContracts.js';
import { detectMissingGovernance } from './rules/detectMissingGovernance.js';
import { detectMissingTests } from './rules/detectMissingTests.js';
import { detectIncompleteRulePacks } from './rules/detectIncompleteRulePacks.js';
import { detectSchemaInconsistencies } from './rules/detectSchemaInconsistencies.js';

export function applyGapScanRules(index: RepoIndex): Gap[] {
  return [
    ...detectMissingModules(index),
    ...detectMissingContracts(index),
    ...detectMissingGovernance(index),
    ...detectMissingTests(index),
    ...detectIncompleteRulePacks(index),
    ...detectSchemaInconsistencies(index),
  ];
}
