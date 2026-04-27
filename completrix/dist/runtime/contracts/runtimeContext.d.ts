export interface RuntimeContext {
    sessionId: string;
    projectName: string;
    streaming: boolean;
    metadata: Record<string, unknown>;
}
