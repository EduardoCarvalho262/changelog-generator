import { generateChangelog } from './services/changelogService.js';
import chalk from 'chalk';

console.log(chalk.blue('🧠 Generating changelog...'));
await generateChangelog();
console.log(chalk.green('✨ Done!'));
