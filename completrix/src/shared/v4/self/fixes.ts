export enum FixType {
  AddModule = 'add-module',
  AddContract = 'add-contract',
  AddGovernance = 'add-governance',
  AddTest = 'add-test',
  AddRulePack = 'add-rule-pack',
  FixSchema = 'fix-schema',
}

export interface Fix {
  id: string;
  gapId: string;
  type: FixType;
  description: string;
  patch: string;
  estimatedEffort: number;
}
