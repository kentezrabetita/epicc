#!/usr/bin/env node
import { Command } from 'commander';
import { showGreetings, showCommitsTable } from './utils/index.js';
import { addAllCommit, stagedCommit, pushCommits } from './utils/index.js';

const program = new Command();

program
  .command('a')
  .description('add all changes and commit using conventional naming')
  .action(async () => await addAllCommit());

program
  .command('s')
  .description('commit current staged changes using conventional naming')
  .action(async () => await stagedCommit());

program
  .command('p')
  .description('push changes to repository')
  .argument('<string>', 'branch name')
  .action(async (branch_name) => await pushCommits(branch_name));

program
  .name('epicc')
  .description(
    'An opinionated interactive CLI that helps you automate and generate conventional commits with emojis'
  )
  .version('1.0.7')
  .option(
    '-st, --show-table',
    'show list of conventional commits in table format'
  )
  .action(async (options) => {
    if (options.showTable === true) await showCommitsTable();
    else await showGreetings();
  });

program.parse(process.argv);
