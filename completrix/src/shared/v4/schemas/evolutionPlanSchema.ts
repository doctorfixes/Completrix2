import { z } from 'zod';
import type { EvolutionPlan } from '../contracts/EvolutionPlan.js';

export const evolutionStepSchema = z.object({
  id: z.string(),
  description: z.string(),
  type: z.enum(['additive', 'breaking', 'deprecation', 'refactor']),
  affectedComponents: z.array(z.string()),
});

export const evolutionPlanSchema = z.object({
  id: z.string(),
  fromVersion: z.string(),
  toVersion: z.string(),
  steps: z.array(evolutionStepSchema),
  breakingChanges: z.boolean(),
});

export function validateEvolutionPlan(data: unknown): EvolutionPlan {
  return evolutionPlanSchema.parse(data) as EvolutionPlan;
}
