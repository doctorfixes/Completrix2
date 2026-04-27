import type { Pipeline } from '../contracts/pipeline.js';
import type { ExecutionPlan } from '../../shared/v4/contracts/ExecutionPlan.js';
import type { FinalSystemSpec } from '../../shared/v4/contracts/FinalSystemSpec.js';
import { SingleSystemWorkflow } from '../workflows/singleSystemWorkflow.js';
import { PortfolioWorkflow } from '../workflows/portfolioWorkflow.js';
import { PipelineRegistry } from './pipelineRegistry.js';

function buildSingleSystemPipeline(): Pipeline {
  const workflow = new SingleSystemWorkflow();
  return {
    id: 'single-system',
    agents: ['creation-agent'],
    run: (input: unknown) => workflow.run(input as ExecutionPlan),
  };
}

function buildPortfolioPipeline(): Pipeline {
  const workflow = new PortfolioWorkflow();
  return {
    id: 'portfolio',
    agents: ['portfolio-agent'],
    run: (input: unknown) => workflow.run(input as FinalSystemSpec[]),
  };
}

export function buildDefaultRegistry(): PipelineRegistry {
  const registry = new PipelineRegistry();
  registry.register(buildSingleSystemPipeline());
  registry.register(buildPortfolioPipeline());
  return registry;
}
