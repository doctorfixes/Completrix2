import { z } from 'zod';
import type { CrossSystemInferenceResult } from '../contracts/CrossSystemInferenceResult.js';

export const crossSystemInferenceResultSchema = z.object({
  sourceSystem: z.string(),
  targetSystem: z.string(),
  inferredContracts: z.array(z.string()),
  confidence: z.number().min(0).max(1),
});

export function validateCrossSystemInferenceResult(data: unknown): CrossSystemInferenceResult {
  return crossSystemInferenceResultSchema.parse(data) as CrossSystemInferenceResult;
}
