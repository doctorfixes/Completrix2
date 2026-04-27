export declare class ParallelExecutor {
    execute<T>(tasks: Array<() => Promise<T>>): Promise<T[]>;
}
