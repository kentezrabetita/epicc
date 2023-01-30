#!/usr/bin/env node
import inquirer from 'inquirer';
import shell from 'shelljs';
import ora from 'ora';
import chalk from 'chalk';
import { Command } from 'commander';

async function askTypeOfCommit() {
  const answer = await inquirer.prompt({
    name: 'commit_type',
    type: 'list',
    message: 'What is your commit type?',
    choices: [
      'feat',
      'refactor',
      'fix',
      'bug',
      'docs',
      'build',
      'change',
      'chore',
      'ci',
      'deprecate',
      'perf',
      'remove',
      'revert',
      'security',
      'style',
      'test'
    ]
  });

  return answer.commit_type;
}

async function askCommitMessage() {
  const answer = await inquirer.prompt({
    name: 'commit_message',
    type: 'input',
    message: 'Enter commit message: '
  });

  return answer.commit_message;
}

async function pushToGit(branch_name) {
  await shell.exec(`git push origin ${branch_name}`);
}

const program = new Command();

program
  .name('cm-util')
  .description('conventional commit cli helper')
  .version('1.0.0');

program
  .command('c')
  .description('commit using conventional naming')
  .action(async () => {
    const commit_type = await askTypeOfCommit();
    const commit_message = await askCommitMessage();

    shell.exec('git add .');
    shell.exec(`git commit -m "${commit_type}: ${commit_message}"`);
  });

program
  .command('p')
  .description('push changes to repository')
  .argument('<string>', 'branch name')
  .action(async (branch_name) => {
    const spinner = ora(
      `Loading ${chalk.red('pushing changes to repository...')}`
    ).start();
    await pushToGit(branch_name);
    spinner.succeed(`changes pushed to repository ${branch_name} 🚀`);
  });

program.parse();
