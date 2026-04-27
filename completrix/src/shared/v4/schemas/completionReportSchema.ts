import { z } from 'zod';
import { fixSchema } from './fixSchema.js';
import { gapSchema } from './gapSchema.js';
import { selfGovernancePlanSchema } from './selfGovernancePlanSchema.js';
import type { CompletionReport } from '../self/completionReport.js';

export const appliedFixSchema = z.object({
  fix: fixSchema,
  appliedAt: z.string(),
  status: z.enum(['applied', 'skipped', 'failed']),
});

export const completionReportSchema = z.object({
  status: z.enum(['complete', 'incomplete']),
  remainingGaps: z.array(gapSchema),
  appliedFixes: z.array(appliedFixSchema),
  governancePlan: selfGovernancePlanSchema,
});

export function validateCompletionReport(data: unknown): CompletionReport {
  return completionReportSchema.parse(data) as CompletionReport;
}
