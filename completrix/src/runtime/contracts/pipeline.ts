export interface Pipeline {
  id: string;
  agents: string[];
  run(input: unknown): Promise<unknown>;
}
