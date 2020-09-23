#!/bin/bash

script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd "$script_dir"

readme_file='../../README.md'
index_file='../../docs/index.md'

cat << EOF > $index_file
---
slug: "/"
title: "Introduction"
hide_title: true
---

EOF

cat $readme_file >> $index_file
