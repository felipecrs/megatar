Megatar
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
megatar/1.2.0 linux-x64 node-v14.16.0
$ megatar --help [COMMAND]
USAGE
  $ megatar COMMAND
...
```
<!-- usagestop -->

# Commands

<!-- commands -->
* [`megatar autocomplete [SHELL]`](#megatar-autocomplete-shell)
* [`megatar chart:list-images CHARTS`](#megatar-chartlist-images-charts)
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

_See code: [@oclif/plugin-autocomplete](https://github.com/oclif/plugin-autocomplete/blob/v0.3.0/src/commands/autocomplete/index.ts)_

## `megatar chart:list-images CHARTS`

list the docker images found in a helm chart

```
USAGE
  $ megatar chart:list-images CHARTS

ARGUMENTS
  CHARTS  the charts to find the images from (can be any value accepted by the helm template command)

OPTIONS
  -h, --help  show CLI help

EXAMPLES
  $ megatar chart:list-images jenkins/jenkins
  $ megatar chart:list-images https://github.com/jenkinsci/helm-charts/releases/download/jenkins-3.2.4/jenkins-3.2.4.tgz
```

_See code: [src/commands/chart/list-images.ts](https://github.com/felipecassiors/megatar/blob/v1.2.0/src/commands/chart/list-images.ts)_

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

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.2/src/commands/help.ts)_

## `megatar save-image IMAGE`

save a docker image to a tgz file

```
USAGE
  $ megatar save-image IMAGE

ARGUMENTS
  IMAGE  the docker image to save

OPTIONS
  -h, --help                 show CLI help
  -t, --new-tag=new-tag      the new tag to write in the image
  --[no-]discard-repository  whether to discard the repository and registry fields or not

EXAMPLES
  $ megatar save-image hello-world
  $ megatar save-image hello-world --new-tag test
```

_See code: [src/commands/save-image.ts](https://github.com/felipecassiors/megatar/blob/v1.2.0/src/commands/save-image.ts)_
<!-- commandsstop -->
