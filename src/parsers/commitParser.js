import simpleGit from 'simple-git';

const git = simpleGit();

/**
 * Lê commits e retorna apenas os válidos (sem merge/bot)
 */
export async function getCleanCommits() {
  const logs = await git.log();
  const filtered = logs.all.filter(c =>
    !c.message.startsWith('Merge') &&
    !c.message.toLowerCase().includes('bot')
  );

  // Agrupa por tipo (feat, fix, chore, etc)
  const grouped = filtered.reduce((acc, commit) => {
    const match = commit.message.match(/^(feat|fix|chore)(\(.+\))?:/);
    const type = match ? match[1] : 'other';
    acc[type] = acc[type] || [];
    acc[type].push(commit.message);
    return acc;
  }, {});

  return grouped;
}
