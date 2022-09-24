---
title: Script to suggest custom aliases
path: alias_suggestion_script
seoTitle: Creating a script to suggest custom aliases
description: Identify potential aliases by analyzing your systems command history.
datePublished: !!str 2022-09-24
---

# Create a script to suggest custom aliases

I was setting up a new [GitHub codespaces](https://github.com/features/codespaces) environment and wanted to create some [dotfiles](https://wiki.archlinux.org/title/Dotfiles) that would automatically install and configure my local macOS environment.

I noticed that I have almost no aliases. Let's fix that.

## Typical Suggested Alias

Some [suggested aliases](https://www.cyberciti.biz/tips/bash-aliases-mac-centos-linux-unix.html) I saw online instantly seemed like great ideas!

```shell
alias ..="cd .."
alias ...="cd ../.."
alias ll="ls -la"
```

This led me to wonder how often I actually run these commands and if there are other potentially good aliases that are specific to my usage.

## Analyzing Command History

ZSH stores a file in your home directory called `.zsh_history`.

_You may have a different history file. Run `echo $HISTFILE` to see what your system uses._

My system is configured to store **50000** lines in this history file (see your size with `echo $HISTSIZE`). At the time of writing my `.zsh_history` file had `2465` commands.

The contents of this file look like:

```shell
> tail -n 5 ~/.zsh_history
: 1664040286:0;clear
: 1664040287:0;git statys
: 1664040290:0;git status
: 1664040291:0;git diff
: 1664040294:0;tail -n 5 ~/.zsh_history
```

Let's parse it!

### Parsing the history file

I am going to use ruby to do this as I am trying to learn the language. I would typically reach for Python here.

The code that I wrote to do this can be found [here](https://github.com/AndrewRPorter/shell_history_analyzer) but essentially performs the steps below:

1. Read history file into array
2. Prune array, stripping metadata and extracting just the command (split on `;`)
3. Create a mapping of `command -> count`
4. Sort the map by command count and output the top N entries

### Results

Here are the 25 top used commands from my `~/.zsh_history` file:

```shell
clear: 348
git status: 237
yarn dev: 138
ls: 127
git diff: 84
cd ..: 64
./scripts/dev.sh: 60
./scripts/deploy.sh: 43
pytest -rav: 35
code .: 34
python3 main.py: 32
git push: 28
cd client: 28
black .: 24
git add -A; git commit -m 'WIP': 23
cd server: 23
./scripts/test.sh: 20
cd dev: 19
yarn: 18
git checkout main: 18
pytest: 14
python3 -m unittest server_test.py: 14
git pull: 13
ruby -v: 11
git log: 11
```

### Identifying Aliases

I already have a couple of these aliases set but one particular command sticks out.

`git add -A; git commit -m 'WIP'` is a pretty long command that I use to quickly save the current state of my work (I know this is gross and I should either stash or come up with a better commit message 🤷).

Let's create a new alias for this:

```shell
alias gw="git add -A; git commit -m 'WIP'"
```

BOOM! 31 characters to 2.

## Conclusion

This probably won't help anyone at all... BUT, it was a fun way for me to explore my historical command usage while learning ruby. If you are interested, my dotfiles are located [here](https://github.com/AndrewRPorter/dotfiles).
