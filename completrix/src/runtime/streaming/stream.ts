export class CompletrixStream<T> {
  private handlers: Array<(v: T) => void> = [];
  private closed = false;

  push(value: T): void {
    if (this.closed) return;
    for (const handler of this.handlers) {
      handler(value);
    }
  }

  onValue(handler: (v: T) => void): void {
    this.handlers.push(handler);
  }

  close(): void {
    this.closed = true;
    this.handlers = [];
  }
}
