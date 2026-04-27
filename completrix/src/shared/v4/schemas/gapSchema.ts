import { z } from 'zod';
import { GapType } from '../self/gaps.js';
import type { Gap } from '../self/gaps.js';

export const gapSchema = z.object({
  id: z.string(),
  type: z.nativeEnum(GapType),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  description: z.string(),
  affectedPaths: z.array(z.string()),
});

export function validateGap(data: unknown): Gap {
  return gapSchema.parse(data) as Gap;
}
