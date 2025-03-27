adb devices | grep emulator | cut -f1 | while read line; do adb -s $line emu kill; done
nohup emulator @Pixel_3_XL_API_30_AOSP -change-language en -change-country AU -change-locale en-AU -verbose -no-audio -no-boot-anim -no-window -read-only -gpu off -camera-back none -camera-front none -qemu -m 4096 2>&1 &

echo "Waiting for device..."
adb wait-for-device shell 'while [[ -z $(getprop sys.boot_completed | tr -d '\r') ]]; do echo "wait for emulator boot completed..."; sleep 1; done; input keyevent 82'

adb wait-for-device shell true

echo "Wait 60s for all app package loaded"
sleep 60
#ui not responding"
#adb shell 'while true; do
#    output=$(pm uninstall --user 0 com.android.launcher3 2>&1)
#    if [[ $output == *"Success"* ]]; then
#        echo "Uninstall launcher successful."
#        break
#    else
#        echo $output
#        echo "Uninstall launcher failed. Retrying..."
#        sleep 5
#    fi
#done
#pm uninstall --user 0 org.chromium.webview_shell
#pm uninstall --user 0 com.android.dialer
#pm uninstall --user 0 com.android.camera2
#pm uninstall --user 0 com.android.quicksearchbox
#pm uninstall --user 0 com.android.calendar
#pm uninstall --user 0 com.android.messaging
#pm uninstall --user 0 com.android.deskclock
#pm uninstall --user 0 com.android.contacts'

echo "Android Emulator started."
