import { detectMissingModules } from './rules/detectMissingModules.js';
import { detectMissingContracts } from './rules/detectMissingContracts.js';
import { detectMissingGovernance } from './rules/detectMissingGovernance.js';
import { detectMissingTests } from './rules/detectMissingTests.js';
import { detectIncompleteRulePacks } from './rules/detectIncompleteRulePacks.js';
import { detectSchemaInconsistencies } from './rules/detectSchemaInconsistencies.js';
export function applyGapScanRules(index) {
    return [
        ...detectMissingModules(index),
        ...detectMissingContracts(index),
        ...detectMissingGovernance(index),
        ...detectMissingTests(index),
        ...detectIncompleteRulePacks(index),
        ...detectSchemaInconsistencies(index),
    ];
}
