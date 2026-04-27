export interface ExecutionPhase {
  id: string;
  name: string;
  tasks: string[];
  dependsOn: string[];
  estimatedDuration: number;
}

export interface ExecutionPlan {
  id: string;
  phases: ExecutionPhase[];
  estimatedDuration: number;
  parallelizable: boolean;
}
