import { Command } from 'commander';
import { DecompositionEngineV4 } from '../../autonomous/decomposition/decompositionEngineV4.js';
import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';

export const decomposeCommand = new Command('decompose')
  .description('Decompose a system spec into cluster structure')
  .argument('<spec>', 'JSON string of FinalSystemSpec')
  .action(async (specJson: string) => {
    const spec = JSON.parse(specJson) as FinalSystemSpec;
    const engine = new DecompositionEngineV4({
      sessionId: `cli-${Date.now()}`,
      projectName: 'cli',
      timestamp: new Date().toISOString(),
      metadata: {},
    });
    const result = await engine.decompose(spec);
    console.log(JSON.stringify(result, null, 2));
  });
