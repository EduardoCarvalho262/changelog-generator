import fs from 'fs';
import dayjs from 'dayjs';
import { getCleanCommits } from '../parsers/commitParser.js';

const typeEmojis = {
  feat: '🚀',
  fix: '🐛',
  chore: '🧹',
  other: '🧩',
};

export async function generateChangelog(outputFile = 'CHANGELOG.md') {
  const grouped = await getCleanCommits();
  const date = dayjs().format('YYYY-MM-DD');
  let changelog = `# 🧾 Changelog — ${date}\n\n`;

  for (const [type, commits] of Object.entries(grouped)) {
    const emoji = typeEmojis[type] || '✨';
    changelog += `## ${emoji} ${type.toUpperCase()}\n`;
    commits.forEach(msg => {
      const cleaned = msg.replace(/^(feat|fix|chore)(\(.+\))?:/, '').trim();
      changelog += `- ${cleaned}\n`;
    });
    changelog += '\n';
  }

  fs.writeFileSync(outputFile, changelog);
  console.log('✅ Changelog generated successfully!');
}
