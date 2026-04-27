import type { Fix } from './fixes.js';

export interface Risk {
  id: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  mitigation: string;
}

export interface GovernancePhase {
  id: string;
  name: string;
  fixes: Fix[];
  dependsOn: string[];
  risks: Risk[];
}

export interface SelfGovernancePlan {
  id: string;
  phases: GovernancePhase[];
  invariants: string[];
  risks: Risk[];
}
