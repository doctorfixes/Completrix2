import type { Pipeline } from '../contracts/pipeline.js';
import { SingleSystemWorkflow } from '../workflows/singleSystemWorkflow.js';
import { PortfolioWorkflow } from '../workflows/portfolioWorkflow.js';
import { PipelineRegistry } from './pipelineRegistry.js';

function buildSingleSystemPipeline(): Pipeline {
  const workflow = new SingleSystemWorkflow();
  return {
    id: 'single-system',
    agents: ['creation-agent'],
    run: (input) => workflow.run(input as Parameters<SingleSystemWorkflow['run']>[0]),
  };
}

function buildPortfolioPipeline(): Pipeline {
  const workflow = new PortfolioWorkflow();
  return {
    id: 'portfolio',
    agents: ['portfolio-agent'],
    run: (input) => workflow.run(input as Parameters<PortfolioWorkflow['run']>[0]),
  };
}

export function buildDefaultRegistry(): PipelineRegistry {
  const registry = new PipelineRegistry();
  registry.register(buildSingleSystemPipeline());
  registry.register(buildPortfolioPipeline());
  return registry;
}
