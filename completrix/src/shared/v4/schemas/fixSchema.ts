import { z } from 'zod';
import { FixType } from '../self/fixes.js';
import type { Fix } from '../self/fixes.js';

export const fixSchema = z.object({
  id: z.string(),
  gapId: z.string(),
  type: z.nativeEnum(FixType),
  description: z.string(),
  patch: z.string(),
  estimatedEffort: z.number(),
});

export function validateFix(data: unknown): Fix {
  return fixSchema.parse(data) as Fix;
}
