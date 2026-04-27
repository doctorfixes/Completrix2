import type { CompletrixStream } from './stream.js';
export declare class StreamOrchestrator {
    orchestrate<T>(source: CompletrixStream<T>, handler: (v: T) => Promise<void>): Promise<void>;
}
