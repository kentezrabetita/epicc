#!/usr/bin/env node
import inquirer from 'inquirer';
import shell from 'shelljs';
import ora from 'ora';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import Table from 'cli-table3';
import { Command } from 'commander';

const commits = [
  { type: 'feat', message: 'Add new feature' },
  { type: 'fix', message: 'Fix bug in feature' },
  { type: 'docs', message: 'Update documentation' },
  { type: 'style', message: 'Improve code style' },
  { type: 'perf', message: 'Improve algorithm performance' },
  { type: 'refactor', message: 'Refactor existing code' },
  { type: 'remove', message: 'Remove feature' },
  { type: 'security', message: 'Improve/Resolve security' },
  { type: 'test', message: 'Add/Improve tests' },
  { type: 'deprecate', message: 'Deprecate existing functionality' },
  { type: 'ci', message: 'Changes to CI/CD' },
  { type: 'change', message: 'Changes implementation of feature' },
  { type: 'build', message: 'Changes in the build system' }
];

const table = new Table({
  head: ['Type', 'Message'],
  colWidths: [15, 40]
});

commits.forEach((commit) => {
  table.push([commit.type, commit.message]);
});

async function showCommitsTable() {
  await console.log(table.toString());
}

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
  return new Promise((resolve, reject) => {
    shell.exec(`git push origin ${branch_name}`, (code, stdout, stderr) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject(stderr);
      }
    });
  });
}

async function generateCommit(commit_type, commit_message) {
  return new Promise((resolve, reject) => {
    shell.exec(
      `git add . && git commit -m "${commit_type}: ${commit_message}"`,
      (code, stdout, stderr) => {
        if (code === 0) {
          resolve({ stdout, stderr });
        } else {
          reject(stderr);
        }
      }
    );
  });
}

const program = new Command();

program
  .name('epicc')
  .description('conventional commit cli helper')
  .version('1.0.3')
  .action(() => {
    const title = `epic-cc`;
    const subtitle = `your conventional commit cli helper!`;

    figlet(title, (err, data) => {
      console.log(gradient.pastel.multiline(data));
      console.log(gradient.pastel(`${subtitle}`));
    });
  });

program
  .command('ac')
  .description('add all changes and commit using conventional naming')
  .action(async () => {
    const commit_type = await askTypeOfCommit();
    const commit_message = await askCommitMessage();

    const spinner = ora(
      `${chalk.blue.bold('⏳ Generating commit. Please standby. Over.\n')}`
    ).start();

    await generateCommit(commit_type, commit_message);

    spinner.succeed(
      `${chalk.green.bold(
        `✅ Conventional commit successful. Standing by for new orders. Over.`
      )}`
    );
  });

program
  .command('c')
  .description('commit changes using conventional naming')
  .action(async () => {
    const commit_type = await askTypeOfCommit();
    const commit_message = await askCommitMessage();

    shell.exec(`git commit -m "${commit_type}: ${commit_message}"`);

    console.log(
      `${chalk.green.bold(
        '✅ Commit successful. Standing by for new orders. Over.'
      )}`
    );
  });

program
  .command('p')
  .description('push changes to repository')
  .argument('<string>', 'branch name')
  .action(async (branch_name) => {
    const spinner = ora(
      `${chalk.blue.bold(
        '⏳ Copy that command control, pushing updates to the repository. Over.\n'
      )}`
    ).start();
    await pushToGit(branch_name);
    spinner.succeed(
      `${chalk.green.bold(
        `🚀 Command control, updates have been successfully pushed to the repository. Awaiting further orders. Over.`
      )}`
    );
  });

program.option('--show').action(async () => {
  await showCommitsTable();
});

program.parse();
