#!/bin/bash

set -euxo pipefail

npm install
npm link

# Set up autocomplete and reload it on every new shell instance
zshrc=/etc/zsh/zshrc
bashrc=/etc/bash.bashrc
printf '\n%s' 'megatar autocomplete -r &>/dev/null' | sudo tee -a $bashrc $zshrc
printf '%s\n' "$(megatar autocomplete:script bash)" | sudo tee -a $bashrc
printf '%s\n' "$(megatar autocomplete:script zsh)" | sudo tee -a $bashrc
