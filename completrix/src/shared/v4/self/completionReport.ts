import type { Fix } from './fixes.js';
import type { Gap } from './gaps.js';
import type { SelfGovernancePlan } from './selfGovernance.js';

export interface AppliedFix {
  fix: Fix;
  appliedAt: string;
  status: 'applied' | 'skipped' | 'failed';
}

export interface CompletionReport {
  status: 'complete' | 'incomplete';
  remainingGaps: Gap[];
  appliedFixes: AppliedFix[];
  governancePlan: SelfGovernancePlan;
}
