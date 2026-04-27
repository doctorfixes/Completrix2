import { z } from 'zod';
import type { FinalSystemSpec } from '../contracts/FinalSystemSpec.js';
export declare const clusterDefinitionSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    modules: z.ZodArray<z.ZodString, "many">;
    responsibilities: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    modules: string[];
    responsibilities: string[];
}, {
    id: string;
    name: string;
    modules: string[];
    responsibilities: string[];
}>;
export declare const contractDefinitionSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    type: z.ZodEnum<["interface", "event", "api"]>;
    schema: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    type: "interface" | "event" | "api";
    schema: Record<string, unknown>;
}, {
    id: string;
    name: string;
    type: "interface" | "event" | "api";
    schema: Record<string, unknown>;
}>;
export declare const dependencyGraphSchema: z.ZodObject<{
    nodes: z.ZodArray<z.ZodString, "many">;
    edges: z.ZodArray<z.ZodObject<{
        from: z.ZodString;
        to: z.ZodString;
        type: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        type: string;
        from: string;
        to: string;
    }, {
        type: string;
        from: string;
        to: string;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    edges: {
        type: string;
        from: string;
        to: string;
    }[];
    nodes: string[];
}, {
    edges: {
        type: string;
        from: string;
        to: string;
    }[];
    nodes: string[];
}>;
export declare const finalSystemSpecSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    description: z.ZodString;
    version: z.ZodString;
    clusters: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        modules: z.ZodArray<z.ZodString, "many">;
        responsibilities: z.ZodArray<z.ZodString, "many">;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        modules: string[];
        responsibilities: string[];
    }, {
        id: string;
        name: string;
        modules: string[];
        responsibilities: string[];
    }>, "many">;
    contracts: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        type: z.ZodEnum<["interface", "event", "api"]>;
        schema: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        name: string;
        type: "interface" | "event" | "api";
        schema: Record<string, unknown>;
    }, {
        id: string;
        name: string;
        type: "interface" | "event" | "api";
        schema: Record<string, unknown>;
    }>, "many">;
    dependencies: z.ZodObject<{
        nodes: z.ZodArray<z.ZodString, "many">;
        edges: z.ZodArray<z.ZodObject<{
            from: z.ZodString;
            to: z.ZodString;
            type: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            type: string;
            from: string;
            to: string;
        }, {
            type: string;
            from: string;
            to: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        edges: {
            type: string;
            from: string;
            to: string;
        }[];
        nodes: string[];
    }, {
        edges: {
            type: string;
            from: string;
            to: string;
        }[];
        nodes: string[];
    }>;
}, "strip", z.ZodTypeAny, {
    id: string;
    name: string;
    description: string;
    version: string;
    clusters: {
        id: string;
        name: string;
        modules: string[];
        responsibilities: string[];
    }[];
    contracts: {
        id: string;
        name: string;
        type: "interface" | "event" | "api";
        schema: Record<string, unknown>;
    }[];
    dependencies: {
        edges: {
            type: string;
            from: string;
            to: string;
        }[];
        nodes: string[];
    };
}, {
    id: string;
    name: string;
    description: string;
    version: string;
    clusters: {
        id: string;
        name: string;
        modules: string[];
        responsibilities: string[];
    }[];
    contracts: {
        id: string;
        name: string;
        type: "interface" | "event" | "api";
        schema: Record<string, unknown>;
    }[];
    dependencies: {
        edges: {
            type: string;
            from: string;
            to: string;
        }[];
        nodes: string[];
    };
}>;
export declare function validateFinalSystemSpec(data: unknown): FinalSystemSpec;
