import type { RepoIndex } from '../../../shared/v4/self/repoIndex.js';
import type { AppliedFix, CompletionReport } from '../../../shared/v4/self/completionReport.js';
import { GapScannerV4 } from '../gapScanner/gapScannerV4.js';
import { GapFillerV4 } from '../gapFiller/gapFillerV4.js';
import { FixApplierV1 } from '../fixApplier/fixApplierV1.js';
import { SelfGovernancePlannerV4 } from '../selfGovernance/selfGovernancePlannerV4.js';

const MAX_ITERATIONS = 10;

export class SelfCompleteEngineV1 {
  private readonly scanner = new GapScannerV4();
  private readonly filler = new GapFillerV4();
  private readonly applier = new FixApplierV1();
  private readonly planner = new SelfGovernancePlannerV4();

  async complete(repoIndex: RepoIndex): Promise<CompletionReport> {
    let workingIndex: RepoIndex = {
      ...repoIndex,
      modules: [...repoIndex.modules],
    };

    const allAppliedFixes: AppliedFix[] = [];
    let remainingGaps = await this.scanner.scan(workingIndex);

    for (let iteration = 0; iteration < MAX_ITERATIONS && remainingGaps.length > 0; iteration++) {
      const fixes = await this.filler.fill(remainingGaps);
      if (fixes.length === 0) break;

      const result = this.applier.apply(fixes, workingIndex);
      allAppliedFixes.push(...result.appliedFixes);
      workingIndex = result.updatedIndex;

      remainingGaps = await this.scanner.scan(workingIndex);
    }

    const allFixes = allAppliedFixes.map(af => af.fix);
    const governancePlan = await this.planner.plan(allFixes);

    return {
      status: remainingGaps.length === 0 ? 'complete' : 'incomplete',
      remainingGaps,
      appliedFixes: allAppliedFixes,
      governancePlan,
    };
  }
}
