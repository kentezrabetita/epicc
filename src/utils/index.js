import inquirer from 'inquirer';
import shell from 'shelljs';
import ora from 'ora';
import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';

import { createTable } from '../helpers/table.js';
import { gitmojis } from '../data/gitmojis.js';
import { addGitmoji } from '../helpers/gitmoji.js';

export const showCommitsTable = async () => {
  const table = await createTable();
  await console.log(table.toString());
};

export const showGreetings = async () => {
  const title = `epicc`;

  await figlet(title, (err, data) => {
    console.log(gradient.pastel.multiline(data));
    console.log();
    console.log(
      gradient.pastel.multiline(
        'An opinionated interactive CLI that helps you automate generate conventional commits with emojis'
      )
    );
  });
};

export const askTypeOfCommit = async () => {
  const answer = await inquirer.prompt({
    name: 'commit_type',
    type: 'list',
    message: 'What is your commit type?',
    choices: gitmojis
  });

  const emoji = await addGitmoji(answer.commit_type);
  const commit = emoji.concat(' ', answer.commit_type);

  return commit;
};

export const askCommitMessage = async () => {
  const answer = await inquirer.prompt({
    name: 'commit_message',
    type: 'input',
    message: 'Enter commit message: '
  });

  return answer.commit_message;
};

export const generateCommit = async (commit_type, commit_message) => {
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
};

export const addAllCommit = async () => {
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
};

export const stagedCommit = async () => {
  const commit_type = await askTypeOfCommit();
  const commit_message = await askCommitMessage();

  shell.exec(`git commit -m "${commit_type}: ${commit_message}"`);

  console.log(
    `${chalk.green.bold(
      '✅ Commit successful. Standing by for new orders. Over.'
    )}`
  );
};

export const pushToGit = async (branch_name) => {
  return new Promise((resolve, reject) => {
    shell.exec(`git push origin ${branch_name}`, (code, stdout, stderr) => {
      if (code === 0) {
        resolve({ stdout, stderr });
      } else {
        reject(stderr);
      }
    });
  });
};

export const pushCommits = async (branch_name) => {
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
};
