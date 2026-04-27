import type { Fix } from '../../../shared/v4/self/fixes.js';
import type { SelfGovernancePlan } from '../../../shared/v4/self/selfGovernance.js';
import { applySelfGovernanceRules } from './applySelfGovernanceRules.js';

export class SelfGovernancePlannerV4 {
  async plan(fixes: Fix[]): Promise<SelfGovernancePlan> {
    return applySelfGovernanceRules(fixes);
  }
}
