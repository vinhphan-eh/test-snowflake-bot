#!/bin/sh

USE_FETCH_HOOK_PATH="src/common/shared-hooks/useFetchData"
# Files path as string separated by a space. E.g: src/a/b src/c/d
ALL_FILES_PATH_STRING_TO_FIX=$@
WRONG_TYPE_IMPORT="import \* as Types"
CORRECT_TYPE_IMPORT="import type \* as Types"
# Get all files path as array, then loop through each file to fix import path
IFS=' ' read -ra FILES_PATH <<< "$ALL_FILES_PATH_STRING_TO_FIX"
for current_file in "${FILES_PATH[@]}"; do
  # Get relative import path
  RELATIVE_USE_FETCH_HOOK_PATH=$(perl -le 'use File::Spec; print File::Spec->abs2rel(@ARGV)' $USE_FETCH_HOOK_PATH "$(dirname $current_file)")

  # Replace absolute import path by relative import path
  # Fix eslint import type
  perl -pi -e \
  "s~$USE_FETCH_HOOK_PATH~$RELATIVE_USE_FETCH_HOOK_PATH~g; 
  s~$WRONG_TYPE_IMPORT~$CORRECT_TYPE_IMPORT~g" \
   "$current_file"
done