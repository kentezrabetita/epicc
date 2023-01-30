#!/usr/bin/env node
import inquirer from 'inquirer';
import shell from 'shelljs';
import ora from 'ora';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
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

const program = new Command();

program
  .name('epic-cc')
  .description('conventional commit cli helper')
  .version('1.0.0')
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

    shell.exec('git add .');
    shell.exec(`git commit -m "${commit_type}: ${commit_message}"`);

    console.log(
      `${chalk.bgBlue.bold('conventional commit created succesfully')}`
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
      `${chalk.bgBlue.bold('conventional commit created succesfully')}`
    );
  });

program
  .command('p')
  .description('push changes to repository')
  .argument('<string>', 'branch name')
  .action(async (branch_name) => {
    const spinner = ora(
      `${chalk.bgRed.bold('pushing changes to repository...\n')}`
    ).start();
    await pushToGit(branch_name);
    spinner.succeed(
      `${chalk.bgGreen.bold(`changes pushed to repository ${branch_name} 🚀`)}`
    );
  });

program.parse();
