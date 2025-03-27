import { Alert, Linking } from 'react-native';
import { useTheme } from '@hero-design/rn';
import InAppBrowser from 'react-native-inappbrowser-reborn';

/**
 * Try to a link using a webview inside our app.
 * If not support, open using external browser
 */
export const useInAppBrowser = () => {
  const { colors } = useTheme();

  const openUrl = async (url: string) => {
    try {
      if (await InAppBrowser.isAvailable()) {
        await InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'close',
          preferredBarTintColor: colors.defaultGlobalSurface,
          preferredControlTintColor: colors.onInfoSurface,
          readerMode: false,
          animated: true,
          // Android Properties
          showTitle: true,
          toolbarColor: colors.defaultGlobalSurface,
          secondaryToolbarColor: 'black',
          navigationBarColor: 'black',
          navigationBarDividerColor: colors.onInfoSurface,
          enableUrlBarHiding: true,
          enableDefaultShare: true,
          forceCloseOnRedirection: false,
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        });
      } else {
        await Linking.openURL(url);
      }
    } catch (error) {
      Alert.alert('Unable to open URL');
    }
  };

  return { openUrl };
};
