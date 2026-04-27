import { z } from 'zod';
export const executionPhaseSchema = z.object({
    id: z.string(),
    name: z.string(),
    tasks: z.array(z.string()),
    dependsOn: z.array(z.string()),
    estimatedDuration: z.number(),
});
export const executionPlanSchema = z.object({
    id: z.string(),
    phases: z.array(executionPhaseSchema),
    estimatedDuration: z.number(),
    parallelizable: z.boolean(),
});
export function validateExecutionPlan(data) {
    return executionPlanSchema.parse(data);
}
