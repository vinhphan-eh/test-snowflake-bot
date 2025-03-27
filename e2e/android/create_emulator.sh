#!/bin/bash
# create emulator for testing
adb devices | grep emulator | cut -f1 | while read line; do adb -s $line emu kill; done
ABI=x86_64
if [[ $(uname -p) == 'arm' ]]; then
    echo M1
    ABI=arm64-v8a
fi
echo $ABI

if [ ! -d "$HOME/.android/avd/Pixel_3_XL_API_30_AOSP.avd" ]; then
    avdmanager create avd -n Pixel_3_XL_API_30_AOSP -d pixel_3_xl --package "system-images;android-30;google_apis;$ABI" --force

    nohup emulator @Pixel_3_XL_API_30_AOSP -gpu swiftshader_indirect -no-window -no-audio -no-boot-anim -camera-back none -camera-front none -qemu -m 4096 2>&1 &
    adb wait-for-device shell 'while [[ -z $(getprop sys.boot_completed | tr -d '\r') ]]; do echo "wait for emulator boot completed..."; sleep 1; done; input keyevent 82'

    # change some config
    # !! qemu: available lcd densities are: 120, 160, 213, 240, 280, 320, 360, 400, 420, 480, 560, 640 !!
    sed -i 's/hw.keyboard = no/hw.keyboard = yes/g' ~/.android/avd/Pixel_3_XL_API_30_AOSP.avd/config.ini
    sed -i 's/hw.audioInput = yes/hw.audioInput = no/g' ~/.android/avd/Pixel_3_XL_API_30_AOSP.avd/config.ini
    sed -i 's/hw.audioOutput = yes/hw.audioOutput = no/g' ~/.android/avd/Pixel_3_XL_API_30_AOSP.avd/config.ini
    sed -i 's/hw.battery = yes/hw.battery = no/g' ~/.android/avd/Pixel_3_XL_API_30_AOSP.avd/config.ini
    sed -i 's/hw.gps = yes/hw.gps = no/g' ~/.android/avd/Pixel_3_XL_API_30_AOSP.avd/config.ini
    sed -i 's/hw.lcd.density = 560/hw.lcd.density = 120/g' ~/.android/avd/Pixel_3_XL_API_30_AOSP.avd/config.ini
    sed -i 's/hw.lcd.height = 2960/hw.lcd.height = 740/g' ~/.android/avd/Pixel_3_XL_API_30_AOSP.avd/config.ini
    sed -i 's/hw.lcd.vsync = 60/hw.lcd.vsync = 30/g' ~/.android/avd/Pixel_3_XL_API_30_AOSP.avd/config.ini
    sed -i 's/hw.lcd.width = 1440/hw.lcd.width = 360/g' ~/.android/avd/Pixel_3_XL_API_30_AOSP.avd/config.ini
    sed -i 's/hw.mainKeys = no/hw.mainKeys = yes/g' ~/.android/avd/Pixel_3_XL_API_30_AOSP.avd/config.ini
    sed -i 's/hw.accelerometer = yes/hw.accelerometer = no/g' ~/.android/avd/Pixel_3_XL_API_30_AOSP.avd/config.ini
    sed -i 's/hw.gyroscope = yes/hw.gyroscope = no/g' ~/.android/avd/Pixel_3_XL_API_30_AOSP.avd/config.ini
    sed -i 's/hw.sensors.proximity = yes/hw.sensors.proximity = no/g' ~/.android/avd/Pixel_3_XL_API_30_AOSP.avd/config.ini
    sed -i 's/hw.sensors.light = yes/hw.sensors.light = no/g' ~/.android/avd/Pixel_3_XL_API_30_AOSP.avd/config.ini
    sed -i 's/hw.sensors.pressure = yes/hw.sensors.pressure = no/g' ~/.android/avd/Pixel_3_XL_API_30_AOSP.avd/config.ini
    sed -i 's/hw.sensors.magnetic_field = yes/hw.sensors.magnetic_field = no/g' ~/.android/avd/Pixel_3_XL_API_30_AOSP.avd/config.ini
    sed -i 's/hw.sensors.humidity = yes/hw.sensors.humidity = no/g' ~/.android/avd/Pixel_3_XL_API_30_AOSP.avd/config.ini
    sed -i 's/hw.sensors.temperature = yes/hw.sensors.temperature = no/g' ~/.android/avd/Pixel_3_XL_API_30_AOSP.avd/config.ini
    sed -i 's/vm.heapSize = 384M/vm.heapSize = 4096M/g' ~/.android/avd/Pixel_3_XL_API_30_AOSP.avd/config.ini
else
    echo "avd folder exists"
    # boot it up
    nohup emulator @Pixel_3_XL_API_30_AOSP -gpu swiftshader_indirect -no-window -no-audio -no-boot-anim -camera-back none -camera-front none -qemu -m 4096 2>&1 &
    adb wait-for-device shell 'while [[ -z $(getprop sys.boot_completed | tr -d '\r') ]]; do echo "wait for emulator boot completed..."; sleep 1; done; input keyevent 82'
fi

# retry incase the Android OS crash :|
nohup emulator @Pixel_3_XL_API_30_AOSP -gpu swiftshader_indirect -no-window -no-audio -no-boot-anim -camera-back none -camera-front none -qemu -m 4096 2>&1 &
adb wait-for-device shell 'while [[ -z $(getprop sys.boot_completed | tr -d '\r') ]]; do echo "wait for emulator boot completed..."; sleep 1; done; input keyevent 82'

# print the config
echo "===================== AVD config ====================="
cat ~/.android/avd/Pixel_3_XL_API_30_AOSP.avd/config.ini

echo "Emulator has finished booting"
adb devices | grep emulator | cut -f1 | while read line; do adb -s $line emu kill; done
