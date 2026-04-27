import { z } from 'zod';
import type { ExecutionPlan } from '../contracts/ExecutionPlan.js';
export declare const executionPhaseSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    tasks: z.ZodArray<z.ZodString, "many">;
    dependsOn: z.ZodArray<z.ZodString, "many">;
    estimatedDuration: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    tasks: string[];
    dependsOn: string[];
    estimatedDuration: number;
}, {
    id: string;
    name: string;
    tasks: string[];
    dependsOn: string[];
    estimatedDuration: number;
}>;
export declare const executionPlanSchema: z.ZodObject<{
    id: z.ZodString;
    phases: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        tasks: z.ZodArray<z.ZodString, "many">;
        dependsOn: z.ZodArray<z.ZodString, "many">;
        estimatedDuration: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        tasks: string[];
        dependsOn: string[];
        estimatedDuration: number;
    }, {
        id: string;
        name: string;
        tasks: string[];
        dependsOn: string[];
        estimatedDuration: number;
    }>, "many">;
    estimatedDuration: z.ZodNumber;
    parallelizable: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    id: string;
    estimatedDuration: number;
    phases: {
        id: string;
        name: string;
        tasks: string[];
        dependsOn: string[];
        estimatedDuration: number;
    }[];
    parallelizable: boolean;
}, {
    id: string;
    estimatedDuration: number;
    phases: {
        id: string;
        name: string;
        tasks: string[];
        dependsOn: string[];
        estimatedDuration: number;
    }[];
    parallelizable: boolean;
}>;
export declare function validateExecutionPlan(data: unknown): ExecutionPlan;
