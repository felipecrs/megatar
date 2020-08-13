#!/bin/sh

set -e

printf '\n%s' 'megatar autocomplete -r &>/dev/null' | tee -a "$HOME/.bashrc" "$HOME/.zshrc"
printf '%s\n' "$(megatar autocomplete:script bash)" | tee -a "$HOME/.bashrc"
printf '%s\n' "$(megatar autocomplete:script zsh)" | tee -a "$HOME/.zshrc"
