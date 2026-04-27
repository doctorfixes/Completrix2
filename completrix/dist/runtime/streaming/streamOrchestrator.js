export class StreamOrchestrator {
    async orchestrate(source, handler) {
        return new Promise(resolve => {
            const pending = [];
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
