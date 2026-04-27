import { mkdirSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import type { WriteOperation } from './fixApplierV1.js';

export class FileMutationEngine {
  write(operations: WriteOperation[]): string[] {
    const written: string[] = [];
    for (const op of operations) {
      mkdirSync(dirname(op.path), { recursive: true });
      writeFileSync(op.path, op.content, 'utf-8');
      written.push(op.path);
    }
    return written;
  }
}
