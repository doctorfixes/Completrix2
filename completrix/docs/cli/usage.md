# CLI Usage

```bash
completrix clarify "Build a microservices platform"
completrix decompose '<spec-json>'
completrix create '<plan-json>'
completrix optimize '<systems-json>'
completrix evolve '<current-json>' '<target-json>'
completrix self-index [root]
completrix self-scan [<repo-index-json>]
completrix self-fix [<gaps-json>]
completrix self-govern [<fixes-json>]
```

`self-scan`, `self-fix`, and `self-govern` each accept their input JSON either as a command-line argument or from stdin, making them composable with Unix pipes and file redirections:

```bash
completrix self-scan < repoIndex.json > gaps.json
completrix self-fix < gaps.json > fixes.json
completrix self-govern < fixes.json > governance.json
```
