export declare class CompletrixStream<T> {
    private handlers;
    private closed;
    push(value: T): void;
    onValue(handler: (v: T) => void): void;
    close(): void;
}
