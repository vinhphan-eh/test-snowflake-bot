#!/bin/sh

export $(grep -v '^#' example/.env | xargs)

E2E_RUNNABLE=./e2e/scripts

echo "\033[0;32mRunning Detox E2E test suites...\033[0m"

if [ $E2E_PLATFORM == "ios" ] ; then
    detox test -c ios.sim.release "$@"
else
    detox test -c android.emu.release --retries=1 "$@"
fi
