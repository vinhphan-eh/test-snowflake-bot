#!/bin/bash

#Overwrite emulator directory
echo "Overwrite emulator directory"
curl -L https://redirector.gvt1.com/edgedl/android/repository/emulator-linux_x64-9751036.zip >> emulator.zip
mv "$ANDROID_HOME/emulator" "$ANDROID_HOME/emulator_old"
unzip -o emulator.zip -d $ANDROID_HOME
mv "$ANDROID_HOME/emulator_old/package.xml" "$ANDROID_HOME/emulator/package.xml"
rm -rf "$ANDROID_HOME/emulator_old"
echo "===================== change version of emulator/package.xml ====================="
# replace `<major>\d+</major><minor>\d+</minor><micro>\d+</micro>` with `<major>33</major><minor>1</minor><micro>23</micro>`
sed -i 's/<major>[0-9]\+<\/major><minor>[0-9]\+<\/minor><micro>[0-9]\+<\/micro>/<major>33<\/major><minor>1<\/minor><micro>23<\/micro>/g' "$ANDROID_HOME/emulator/package.xml"

# install emulator for testing
ABI=x86_64
if [[ $(uname -p) == 'arm' ]]; then
    echo M1
    ABI=arm64-v8a
fi
echo $ABI
echo y | sdkmanager --install "system-images;android-30;google_apis;$ABI"
echo y | sdkmanager --licenses
