import { commits } from '../data/commits.js';
import Table from 'cli-table3';

export const createTable = async () => {
  const table = new Table({
    head: ['Type', 'Message'],
    colWidths: [15, 40]
  });

  await commits.forEach((commit) => {
    table.push([commit.type, commit.message]);
  });

  return table;
};
