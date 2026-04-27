import { z } from 'zod';
import { fixSchema } from './fixSchema.js';
import type { SelfGovernancePlan } from '../self/selfGovernance.js';

export const riskSchema = z.object({
  id: z.string(),
  description: z.string(),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  mitigation: z.string(),
});

export const governancePhaseSchema = z.object({
  id: z.string(),
  name: z.string(),
  fixes: z.array(fixSchema),
  dependsOn: z.array(z.string()),
  risks: z.array(riskSchema),
});

export const selfGovernancePlanSchema = z.object({
  id: z.string(),
  phases: z.array(governancePhaseSchema),
  invariants: z.array(z.string()),
  risks: z.array(riskSchema),
});

export function validateSelfGovernancePlan(data: unknown): SelfGovernancePlan {
  return selfGovernancePlanSchema.parse(data) as SelfGovernancePlan;
}
