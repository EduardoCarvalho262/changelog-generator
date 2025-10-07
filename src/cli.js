#!/usr/bin/env node
import { Command } from 'commander';
import { generateChangelog } from './services/changelogService.js';
import chalk from 'chalk';

const program = new Command();

program
  .name('changeloggen')
  .description('Generate clean changelogs automatically 🧠')
  .version('1.0.0');

program
  .option('-o, --output <file>', 'output file name', 'CHANGELOG.md')
  .action(async (options) => {
    console.log(chalk.blue('🧠 Generating changelog...'));
    await generateChangelog(options.output);
    console.log(chalk.green(`✨ Done! Saved to ${options.output}`));
  });

program.parse(process.argv);
