#!/bin/bash

cd $(dirname $0)/..

echo Jest version $(./node_modules/.bin/jest --version)

# prints a space separated list of files to be considered for testing,
# or "yarn.lock" if yarn.lock was among the changed files.
function list_changed_files() {
  files=$(mktemp)
  trap "rm -f $files" RETURN

  git diff --name-status main |
    awk '{print $2}' |
    egrep '\.ts$|yarn.lock' >$files

  grep yarn.lock $files >/dev/null
  if [ $? -eq 0 ]; then
    echo yarn.lock
  else
    tr '\n' ' ' <$files
  fi
}

function run_jest() {
  if [[ -n "$*" && "$1" != "yarn.lock" ]]; then
    related="--findRelatedTests $*"
    echo "* running related tests: $*"
  else
    echo "* running all tests"
  fi

  node --expose-gc \
    --no-compilation-cache \
    --max-old-space-size=6144 \
    ./node_modules/.bin/jest \
    --env=node \
    --logHeapUsage \
    --forceExit \
    --silent \
    --coverage \
    --config="./jest.config.js" \
    $related
}

function main() {
  case "$1" in
  "-c")
    run_jest $(list_changed_files)
    ;;
    # show what the changes files are
  "-l")
    echo $(list_changed_files)
    ;;
  **)
    run_jest
    ;;
  esac
}

main $@
