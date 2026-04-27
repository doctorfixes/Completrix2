import type { RuntimeContext } from './runtimeContext.js';
export interface Agent<TInput, TOutput> {
    name: string;
    run(input: TInput, ctx: RuntimeContext): Promise<TOutput>;
}
