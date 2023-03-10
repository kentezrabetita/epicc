export const addGitmoji = (commit_type) => {
  switch (commit_type) {
    case 'feat':
      return 'โจ';
    case 'fix':
      return '๐';
    case 'docs':
      return '๐';
    case 'style':
      return '๐จ';
    case 'refactor':
      return '๐จ';
    case 'change':
      return '๐ก';
    case 'remove':
      return '๐ง';
    case 'test':
      return '๐จ';
    case 'chore':
      return '๐งน';
    case 'revert':
      return 'โช';
    case 'security':
      return '๐';
    case 'deprecate':
      return '๐ฉ';
    case 'ci':
      return '๐';
    case 'perf':
      return 'โก๏ธ';
    case 'build':
      return '๐ง';
  }
};
