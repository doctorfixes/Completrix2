# Gap Filler

The `GapFillerV4` proposes `Fix` objects for each detected `Gap`.

## Usage

```typescript
import { GapFillerV4 } from './gapFillerV4.js';

const filler = new GapFillerV4();
const fixes = await filler.fill(gaps);
```

## CLI

`self-fix` reads a `Gap[]` JSON array from a command-line argument or stdin and writes `Fix[]` JSON to stdout:

```bash
completrix self-fix < gaps.json > fixes.json
```

## Fix Rules

Each `Gap` is matched against the following rules in order. The first matching rule produces a `Fix`; unmatched gaps are silently skipped.

| Gap type | Fix type | Estimated effort |
|---|---|---|
| `missing-module` | `add-module` | 4 h |
| `missing-contract` | `add-contract` | 2 h |
| `missing-governance` | `add-governance` | 3 h |
| `missing-test` | `add-test` | 6 h |
| `incomplete-rule-pack` | `add-rule-pack` | 3 h |
| `schema-inconsistency` | `fix-schema` | 2 h |
