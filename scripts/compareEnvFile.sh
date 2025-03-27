#!/bin/bash
file="$1"
file2="$2"

tmp=$(mktemp)
tmp2=$(mktemp)
result=$(mktemp)

NOCOLOR="\033[0m"
RED="\033[1;31m"
GREEN="\033[1;32m"
BYellow='\033[1;33m'
Cyan='\033[0;36m'

# remove comments, empty space, and quotes
function filter {
    sed -e '/^#/d;/^\s*$/d' -e 's/\(\w*\)[ \t]*=[ \t]*\(.*\)/\1=\2/' -e "s/=['\"]\(.*\)['\"]/=\1/g" -e "s/'/'\\\''/g"
}

echo -e "${Cyan}***** Comparing $1 and $2 *****${NOCOLOR}"


if [ ! -s $file2 ]; then
# multiple logs to gain more notice
    echo -e "${RED}Missing $2 file${NOCOLOR}"  
    echo -e "${RED}Missing $2 file${NOCOLOR}"    
    echo -e "${RED}Missing $2 file${NOCOLOR}"     
    exit
fi

if [ -s $file ]; then
    # sort and filter
    sort $file | filter >$tmp
    sort $file2 | filter >$tmp2

    # diff 2 files, just get result from file 2
    diff -B $tmp $tmp2 | grep ">" | cut -c 3- >$result

    if [ -s $result ]; then
        # The file is not-empty.
        echo "-----------------------------------------"
        echo -e "${BYellow}$1 is outdated. Please sync it with $2\nThese values are missing or differing:${NOCOLOR}"
        echo -e "${Cyan}"
        cat $result
        echo -e "${NOCOLOR}-----------------------------------------"
    else
        echo -e "${GREEN}$1 is up to date${NOCOLOR}"
    fi

else
# multiple logs to gain more notice
    echo -e "${RED}Missing $1 file${NOCOLOR}"
    echo -e "${RED}Missing $1 file${NOCOLOR}"
    echo -e "${RED}Missing $1 file${NOCOLOR}"
fi
