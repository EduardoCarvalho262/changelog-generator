import fs from 'fs';
import { getCleanCommits } from '../parsers/commitParser.js';

export async function generateChangelog() {
  const grouped = await getCleanCommits();

  let changelog = '# Changelog\n\n';
  for (const [type, commits] of Object.entries(grouped)) {
    changelog += `## ${type}\n`;
    commits.forEach(msg => {
      changelog += `- ${msg}\n`;
    });
    changelog += '\n';
  }

  fs.writeFileSync('CHANGELOG.md', changelog);
  console.log('✅ Changelog generated successfully!');
}
