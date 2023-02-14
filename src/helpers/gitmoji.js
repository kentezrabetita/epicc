export const addGitmoji = (commit_type) => {
  switch (commit_type) {
    case 'feat':
      return '✨';
    case 'fix':
      return '🐞';
    case 'docs':
      return '📚';
    case 'style':
      return '🎨';
    case 'perf':
      return '⚡️';
    case 'refactor':
      return '🔨';
    case 'remove':
      return '🗑️';
    case 'security':
      return '🔒';
    case 'test':
      return '🚨';
    case 'deprecate':
      return '💩';
    case 'ci':
      return '💚';
    case 'change':
      return '💡';
    case 'build':
      return '🔧';
  }
};
