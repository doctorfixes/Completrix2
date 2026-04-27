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
