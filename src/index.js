#!/usr/bin/env node
import inquirer from 'inquirer';

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

async function askTicketNumber() {
  const answer = await inquirer.prompt({
    name: 'ticket_number',
    type: 'input',
    message: 'What is the ticket number?',
    default() {
      return 'Ticket';
    }
  });

  return answer.ticket_number;
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
const ticket_number = await askTicketNumber();
const commit_message = await askCommitMessage();

console.log(
  'Ticket #' + ticket_number + ': ' + commit_type + ': ' + commit_message
);
