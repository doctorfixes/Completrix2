import type { FinalSystemSpec } from '../../src/shared/v4/contracts/FinalSystemSpec.js';
import { DriftMonitor } from '../../src/runtime/governance/driftMonitor.js';

export function validateDrift(before: FinalSystemSpec, after: FinalSystemSpec): boolean {
  const monitor = new DriftMonitor();
  const changes = monitor.detect(before, after);
  return changes.length === 0;
}
