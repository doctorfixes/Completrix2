import type { Agent } from '../contracts/agent.js';
import type { RuntimeContext } from '../contracts/runtimeContext.js';
import type { Gap } from '../../shared/v4/self/gaps.js';
import type { Fix } from '../../shared/v4/self/fixes.js';
import { GapFillerV4 } from '../../autonomous/self/gapFiller/gapFillerV4.js';

export class SelfFixAgent implements Agent<Gap[], Fix[]> {
  readonly name = 'self-fix-agent';

  async run(input: Gap[], _ctx: RuntimeContext): Promise<Fix[]> {
    const filler = new GapFillerV4();
    return filler.fill(input);
  }
}
