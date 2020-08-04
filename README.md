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
* [`megatar hello [FILE]`](#megatar-hello-file)
* [`megatar help [COMMAND]`](#megatar-help-command)
* [`megatar save-image [FILE]`](#megatar-save-image-file)
* [`megatar update-config [CONFIG-FILE]`](#megatar-update-config-config-file)

## `megatar hello [FILE]`

describe the command here

```
USAGE
  $ megatar hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ megatar hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/felipecassiors/megatar/blob/v0.0.0/src/commands/hello.ts)_

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

## `megatar save-image [FILE]`

describe the command here

```
USAGE
  $ megatar save-image [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/save-image.ts](https://github.com/felipecassiors/megatar/blob/v0.0.0/src/commands/save-image.ts)_

## `megatar update-config [CONFIG-FILE]`

describe the command here

```
USAGE
  $ megatar update-config [CONFIG-FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print
```

_See code: [src/commands/update-config.ts](https://github.com/felipecassiors/megatar/blob/v0.0.0/src/commands/update-config.ts)_
<!-- commandsstop -->
