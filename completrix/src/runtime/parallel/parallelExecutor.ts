export class ParallelExecutor {
  async execute<T>(tasks: Array<() => Promise<T>>): Promise<T[]> {
    return Promise.all(tasks.map(task => task()));
  }
}
