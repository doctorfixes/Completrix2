# Clarification Engine

The `ClarificationEngineV4` takes a raw system intent and produces a `ClarifiedIntent` with assumptions and clarifying questions.

## Usage

```typescript
const engine = new ClarificationEngineV4(context);
const result = await engine.clarify("Build a microservices platform");
```
