#!/bin/bash
envStag="$1"
envProd="$2"
tempStag=$(mktemp)
tempProd=$(mktemp)

NOCOLOR="\033[0m"
RED="\033[1;31m"
CYAN='\033[0;36m'


echo -e "${CYAN}***** Transform $1 and $2 to JSON *****${NOCOLOR}"

filter() {
  sed -e '/^#/d' \
      -e '/^\s*$/d' \
      -e 's/^\([^=]*\)=["'\'' ]*\([^"'\'' ]*\)["'\'' ]*$/\1=\2/'
}


transformEnvFileToJson() {
  awk -F '=' '
  BEGIN {
    print "["
    indent = "  "
  }
  {
    gsub(/\r/, "") # Remove carriage return characters
  }
  NF == 2 {
    key = $1
    value = $2
    gsub(/^[[:space:]]+|[[:space:]]+$/, "", key)   # Trim spaces from key
    gsub(/^[[:space:]]+|[[:space:]]+$/, "", value) # Trim spaces from value
    gsub(/"/, "\\\"", value)                       # Escape double quotes in value
    printf "%s%s{\n%s  \"key\": \"%s\",\n%s  \"value\": \"%s\"\n%s}",
      separator, indent, indent, key, indent, value, indent
    separator = ",\n"
  }
  END {
    print "\n]"
  }
  ' "$1" > "$2"
}

sort $envStag | filter >$tempStag
sort $envProd | filter >$tempProd

transformEnvFileToJson $tempStag src/common/switchEnvHelper/env-staging.json
transformEnvFileToJson $tempProd src/common/switchEnvHelper/env-prod.json
