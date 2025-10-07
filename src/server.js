import express from 'express';
import { generateChangelog } from './services/changelogService.js';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  const token = req.headers['x-api-key'];
  const validToken = process.env.API_TOKEN || ''; // padrão local
  if (token !== validToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});

app.post('/generate', async (req, res) => {
  try {
    const { repoPath = '.', outputFile = 'CHANGELOG.md' } = req.body;
    const fullPath = path.resolve(repoPath);

    console.log(chalk.blue(`🧠 Generating changelog for: ${fullPath}`));

    await generateChangelog(outputFile);

    const changelog = fs.readFileSync(outputFile, 'utf-8');
    console.log(chalk.green('✅ Changelog generated successfully!'));
    res.status(200).json({ success: true, changelog });
  } catch (error) {
    console.error(chalk.red('❌ Error generating changelog'), error);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(chalk.green(`🚀 API running on http://localhost:${PORT}`));
});
