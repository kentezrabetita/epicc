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
    case 'refactor':
      return '🔨';
    case 'change':
      return '💡';
    case 'remove':
      return '🚧';
    case 'test':
      return '🚨';
    case 'chore':
      return '🧹';
    case 'revert':
      return '⏪';
    case 'security':
      return '🔒';
    case 'deprecate':
      return '💩';
    case 'ci':
      return '💚';
    case 'perf':
      return '⚡️';
    case 'build':
      return '🔧';
  }
};
