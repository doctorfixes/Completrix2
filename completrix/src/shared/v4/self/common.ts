export enum ModuleType {
  Engine = 'engine',
  Contract = 'contract',
  Schema = 'schema',
  Agent = 'agent',
  Pipeline = 'pipeline',
  Governance = 'governance',
  Test = 'test',
  CLI = 'cli',
  Util = 'util',
}

export interface SelfModule {
  path: string;
  type: ModuleType;
  exports: string[];
}
