import { z } from 'zod';
import type { PortfolioOptimizationPlan } from '../contracts/PortfolioOptimizationPlan.js';

export const systemEntrySchema = z.object({
  systemId: z.string(),
  name: z.string(),
  value: z.number(),
  priority: z.number(),
});

export const optimizationSchema = z.object({
  id: z.string(),
  type: z.string(),
  description: z.string(),
  impact: z.number(),
  affectedSystems: z.array(z.string()),
});

export const portfolioOptimizationPlanSchema = z.object({
  portfolioId: z.string(),
  systems: z.array(systemEntrySchema),
  optimizations: z.array(optimizationSchema),
  totalValue: z.number(),
});

export function validatePortfolioOptimizationPlan(data: unknown): PortfolioOptimizationPlan {
  return portfolioOptimizationPlanSchema.parse(data) as PortfolioOptimizationPlan;
}
