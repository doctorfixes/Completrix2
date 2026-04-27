export enum GapType {
  MissingModule = 'missing-module',
  MissingContract = 'missing-contract',
  MissingGovernance = 'missing-governance',
  MissingTest = 'missing-test',
  IncompleteRulePack = 'incomplete-rule-pack',
  SchemaInconsistency = 'schema-inconsistency',
}

export interface Gap {
  id: string;
  type: GapType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  affectedPaths: string[];
}
