export class ParallelExecutor {
    async execute(tasks) {
        return Promise.all(tasks.map(task => task()));
    }
}
