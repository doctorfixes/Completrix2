export class CompletrixStream {
    handlers = [];
    closed = false;
    push(value) {
        if (this.closed)
            return;
        for (const handler of this.handlers) {
            handler(value);
        }
    }
    onValue(handler) {
        this.handlers.push(handler);
    }
    close() {
        this.closed = true;
        this.handlers = [];
    }
}
