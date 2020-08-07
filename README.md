megatar
=======

Create full offline Helm chart packages.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/megatar.svg)](https://npmjs.org/package/megatar)
[![Downloads/week](https://img.shields.io/npm/dw/megatar.svg)](https://npmjs.org/package/megatar)
[![License](https://img.shields.io/npm/l/megatar.svg)](https://github.com/felipecassiors/megatar/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g megatar
$ megatar COMMAND
running command...
$ megatar (-v|--version|version)
megatar/0.0.0 linux-x64 node-v12.18.3
$ megatar --help [COMMAND]
USAGE
  $ megatar COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`megatar autocomplete [SHELL]`](#megatar-autocomplete-shell)
* [`megatar help [COMMAND]`](#megatar-help-command)
* [`megatar save-image IMAGE`](#megatar-save-image-image)

## `megatar autocomplete [SHELL]`

display autocomplete installation instructions

```
USAGE
  $ megatar autocomplete [SHELL]

ARGUMENTS
  SHELL  shell type

OPTIONS
  -r, --refresh-cache  Refresh cache (ignores displaying instructions)

EXAMPLES
  $ megatar autocomplete
  $ megatar autocomplete bash
  $ megatar autocomplete zsh
  $ megatar autocomplete --refresh-cache
```

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.2.0/src/commands/autocomplete/index.ts)_

## `megatar help [COMMAND]`

display help for megatar

```
USAGE
  $ megatar help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.0/src/commands/help.ts)_

## `megatar save-image IMAGE`

save a docker image to a tgz file

```
USAGE
  $ megatar save-image IMAGE

ARGUMENTS
  IMAGE  the docker image to save

OPTIONS
  -h, --help              show CLI help
  -t, --new-tag=new-tag   the new tag to write in the image
  --[no-]discard-parents  whether to discard the repository and registry fields or not

EXAMPLE
  $ megatar save-image hello-world
```

_See code: [src/commands/save-image.ts](https://github.com/felipecassiors/megatar/blob/v0.0.0/src/commands/save-image.ts)_
<!-- commandsstop -->
