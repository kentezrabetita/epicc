# Epicc

An opinionated interactive CLI that helps you automate and generate conventional commits with emojis.

![Alt Text](https://github.com/kentezrabetita/personal-portfolio/blob/main/public/assets/thumbnails/epicc.gif)

## Installation

Using npm :

```sh
$ npm install -g epicc
```

Using yarn :

```sh
$ yarn add global epicc
```

## Usage

### Flow

First, you will be ask what type of commit do you want to make.

```
? What is your commit type? (Use arrow keys)
❯ ✨ Feature
  🐞 Bug Fix
  📚 Documentation
  🎨 Style
  ⚡️ Performance
  🔨 Refactor
  🗑️ Removal
  🔒 Security
  🚨 Tests
  💩 Deprecation
  💚 Continuous Integration
  💡 Change
  🔧 Build
```

Second, you will input the commit message.

```
? What is your commit type? ✨ Feature
? Enter commit message:  add awesome commit message
⠋ ⏳ Generating commit. Please standby. Over.
[main fef19ef] ✨ feat: add awesome commit message
 3 files changed, 14 insertions(+), 10 deletions(-)
✔ ✅ Conventional commit successful. Standing by for new orders. Over.
```

Lastly, by using the `epicc p [branch-name]`, it will then push your commits to the respectine repository.

```sh
epicc p main
```

```
⠙ ⏳ Copy that command control, pushing updates to the repository. Over.
To https://github.com/kentezrabetita/dict-examination.git
✔ 🚀 Command control, updates have been successfully pushed to the repository. Awaiting further orders. Over.
```

### Options

- `-V, --version` will display current package version
- `-h, --help` will display help
- `-st, --show-table` will show a table of conventional commits

### Commands

- `epicc ac` will add all your changes and generate a conventional commit depending on your selection.
- `epicc c` will generate a conventional commit but with only the specific changes you stage.
- `epicc p [branch]` will push the changes to the repository
