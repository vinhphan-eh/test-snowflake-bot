#!/bin/bash
start=`date +%s`
echo "Running eslint --fix --no-ignore $*"
eslint --fix --no-ignore $* 2>&1 >/dev/null
echo "exit code: $?"
end=`date +%s`
runtime=$((end-start))
echo "eslint --fix --no-ignore $* took $runtime seconds"


