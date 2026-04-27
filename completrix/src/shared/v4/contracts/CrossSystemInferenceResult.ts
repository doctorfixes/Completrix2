export interface CrossSystemInferenceResult {
  sourceSystem: string;
  targetSystem: string;
  inferredContracts: string[];
  confidence: number;
}
