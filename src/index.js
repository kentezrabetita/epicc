#!/usr/bin/env node
import inquirer from 'inquirer';
import shell from 'shelljs';

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
    ],
    defualt() {
      return 'Commit';
    }
  });

  return answer.commit_type;
}

async function askCommitMessage() {
  const answer = await inquirer.prompt({
    name: 'commit_message',
    type: 'input',
    message: 'Enter commit message: ',
    default() {
      return 'Message';
    }
  });

  return answer.commit_message;
}

const commit_type = await askTypeOfCommit();
const commit_message = await askCommitMessage();

shell.exec('git add .');
shell.exec(`git commit -m "${commit_type}: ${commit_message}"`);
