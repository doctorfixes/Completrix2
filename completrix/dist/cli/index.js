#!/usr/bin/env node
import { Command } from 'commander';
import { clarifyCommand } from './commands/clarify.js';
import { decomposeCommand } from './commands/decompose.js';
import { createCommand } from './commands/create.js';
import { optimizeCommand } from './commands/optimize.js';
import { evolveCommand } from './commands/evolve.js';
import { selfScanCommand } from './commands/selfScan.js';
import { selfFixCommand } from './commands/selfFix.js';
import { selfGovernCommand } from './commands/selfGovern.js';
const program = new Command();
program
    .name('completrix')
    .description('Completrix v4 - Autonomous system composition engine')
    .version('4.0.0');
program.addCommand(clarifyCommand);
program.addCommand(decomposeCommand);
program.addCommand(createCommand);
program.addCommand(optimizeCommand);
program.addCommand(evolveCommand);
program.addCommand(selfScanCommand);
program.addCommand(selfFixCommand);
program.addCommand(selfGovernCommand);
program.parse(process.argv);
