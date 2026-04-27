import { z } from 'zod';
export const clusterDefinitionSchema = z.object({
    id: z.string(),
    name: z.string(),
    modules: z.array(z.string()),
    responsibilities: z.array(z.string()),
});
export const contractDefinitionSchema = z.object({
    id: z.string(),
    name: z.string(),
    type: z.enum(['interface', 'event', 'api']),
    schema: z.record(z.unknown()),
});
export const dependencyGraphSchema = z.object({
    nodes: z.array(z.string()),
    edges: z.array(z.object({
        from: z.string(),
        to: z.string(),
        type: z.string(),
    })),
});
export const finalSystemSpecSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    version: z.string(),
    clusters: z.array(clusterDefinitionSchema),
    contracts: z.array(contractDefinitionSchema),
    dependencies: dependencyGraphSchema,
});
export function validateFinalSystemSpec(data) {
    return finalSystemSpecSchema.parse(data);
}
