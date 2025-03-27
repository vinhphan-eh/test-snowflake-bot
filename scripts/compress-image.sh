#!/bin/bash
RED="\033[1;31m"
GREEN="\033[1;32m"
NOCOLOR="\033[0m"

TINYAPIKEY="d4PDRmFqKhSVwm9bzKPG3HqfT7MpkJ3W"
OUTDIR="src/common/assets/images"
NOTFOUNDERR="Not found any uncommited png file.\nif you already committed images without compression, revert your commit and re-run the script or manually compress on https://tinypng.com"

checkGit=$(git status --porcelain | grep "A\|^??\|M" | cut -c 4-)

linesLength=$(find $checkGit -name "*.png*" 2>/dev/null | wc -l)
if [ $linesLength = 0 ]; then
    echo -e "${RED}${NOTFOUNDERR}${NOCOLOR}"
else
    for filePath in $(find $checkGit -name "*.png*"); do
        fileName=${filePath##*/}
        outputPath="${OUTDIR}/${fileName}"

        echo "---------------"
        echo "Compressing $fileName:"
        downloadUrl=$(curl https://api.tinify.com/shrink --user api:$TINYAPIKEY --data-binary @"${filePath}" -D- --silent | grep -i location | cut -d " " -f2-)
        downloadUrl=${downloadUrl// /}
        downloadUrl=$(echo -n "$downloadUrl" | sed s/.$//)
        result=$(curl "${downloadUrl}" -w "%{http_code}" -o $outputPath --silent)
        if [[ $result = 200 ]]; then
            echo -e "${GREEN}Successfully save to $outputPath${NOCOLOR}"
        else
            echo -e "${RED}Failed to compress${NOCOLOR}"
        fi

    done
fi
