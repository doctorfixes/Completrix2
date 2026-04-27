import type { Fix } from '../../../shared/v4/self/fixes.js';
import type { AppliedFix } from '../../../shared/v4/self/completionReport.js';
import type { RepoIndex } from '../../../shared/v4/self/repoIndex.js';
import { checkMutationSafety } from './safetyGuard.js';
import { applyFixRules } from './applyFixRules.js';

export interface FixApplicationResult {
  appliedFixes: AppliedFix[];
  updatedIndex: RepoIndex;
}

export class FixApplierV1 {
  apply(fixes: Fix[], index: RepoIndex): FixApplicationResult {
    const workingIndex: RepoIndex = {
      ...index,
      modules: [...index.modules],
    };

    const violations = checkMutationSafety(fixes);
    const safeFixIds = new Set(
      fixes
        .filter(f => !violations.some(v => v.fixId === f.id))
        .map(f => f.id)
    );

    const safeFixes = fixes.filter(f => safeFixIds.has(f.id));
    const skippedFixes: AppliedFix[] = fixes
      .filter(f => !safeFixIds.has(f.id))
      .map(f => ({ fix: f, appliedAt: new Date().toISOString(), status: 'skipped' as const }));

    const appliedFixes = applyFixRules(safeFixes, workingIndex);

    return {
      appliedFixes: [...appliedFixes, ...skippedFixes],
      updatedIndex: workingIndex,
    };
  }
}
