import type { CompletrixStream } from './stream.js';

export class StreamOrchestrator {
  async orchestrate<T>(
    source: CompletrixStream<T>,
    handler: (v: T) => Promise<void>
  ): Promise<void> {
    return new Promise<void>(resolve => {
      const pending: Array<Promise<void>> = [];
      source.onValue(value => {
        pending.push(handler(value));
      });
      // Resolve after allowing event loop to process
      setTimeout(async () => {
        await Promise.all(pending);
        resolve();
      }, 0);
    });
  }
}
