#!/bin/sh

echo $1

LINES=$(jq .total.lines.pct $1)
STATEMENTS=$(jq .total.statements.pct $1)
FUNCTIONS=$(jq .total.functions.pct $1)
BRANCHES=$(jq .total.branches.pct $1)

LINES=$(awk 'BEGIN{print 100*"'$LINES'"}')
STATEMENTS=$(awk 'BEGIN{print 100*"'$STATEMENTS'"}')
FUNCTIONS=$(awk 'BEGIN{print 100*"'$FUNCTIONS'"}')
BRANCHES=$(awk 'BEGIN{print 100*"'$BRANCHES'"}')

echo "LINES: $LINES, STATEMENTS: $STATEMENTS, FUNCTIONS: $FUNCTIONS, BRANCHES: $BRANCHES"
# this number should be the same in jest.config.js
TARGET_COVERAGE=7000

if [ $LINES -lt $TARGET_COVERAGE -o $STATEMENTS -lt $TARGET_COVERAGE -o $FUNCTIONS -lt $TARGET_COVERAGE -o $BRANCHES -lt $TARGET_COVERAGE ]; then
  echo "Coverage below $TARGET_COVERAGE => LINES: $LINES, STATEMENTS: $STATEMENTS, FUNCTIONS: $FUNCTIONS, BRANCHES: $BRANCHES"
  exit 1
fi
