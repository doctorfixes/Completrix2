import { createInterface } from 'readline';

export async function readStdin(): Promise<string> {
  const rl = createInterface({ input: process.stdin, terminal: false });
  const lines: string[] = [];
  for await (const line of rl) {
    lines.push(line);
  }
  return lines.join('\n');
}
