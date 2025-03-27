import { NativeModules, DevSettings } from 'react-native';

const main = () => {
  const message = {
    stop: '(*) Stop Debugging',
    debug: '(*) Debug JS Remotely',
  };

  DevSettings.addMenuItem(message.debug, () => {
    NativeModules.DevSettings.setIsDebuggingRemotely(true);
  });
  DevSettings.addMenuItem(message.stop, () => {
    NativeModules.DevSettings.setIsDebuggingRemotely(false);
  });
};

if (__DEV__) {
  // add a delay to avoid issue with React Native Debugger
  setTimeout(main, 100);
}
