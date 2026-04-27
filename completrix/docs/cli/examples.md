# CLI Examples

## Clarify

```bash
completrix clarify "Build a real-time chat application"
```

## Self-Scan

```bash
completrix self-scan "$(cat examples/self-bootstrap/repoIndex.json)"
```

## Self-Index

Generate a `repoIndex.json` by scanning the current directory:

```bash
completrix self-index > repoIndex.json
```

## Self-Index piped to Self-Scan

Scan the current repo for gaps without a pre-existing `repoIndex.json`:

```bash
completrix self-index | completrix self-scan
```

Or generate the index file first, then scan:

```bash
completrix self-index > repoIndex.json
completrix self-scan < repoIndex.json
```

## Self-Fix from Gaps

Generate fixes from a `gaps.json` file produced by `self-scan`:

```bash
completrix self-fix < gaps.json > fixes.json
```

## Full Self-Bootstrap Pipeline

Run the complete self-improvement cycle — index, scan, fix, and govern — writing each stage to a file:

```bash
completrix self-index > repoIndex.json
completrix self-scan < repoIndex.json > gaps.json
completrix self-fix < gaps.json > fixes.json
completrix self-govern < fixes.json > governance.json
```

Or stream the entire pipeline in one pass:

```bash
completrix self-index | completrix self-scan | completrix self-fix | completrix self-govern
```
