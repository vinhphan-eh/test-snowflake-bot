import { AppRegistry, LogBox } from 'react-native';
import Config from 'react-native-config';

import App from './src/App';
import { name as appName } from './app.json';

//TODO handle these errors
LogBox.ignoreLogs([
  "Accessing the 'state' property of the 'route' object is not supported.",
  "EventEmitter.removeListener('url', ...): Method has been deprecated.",
]);

const initMockServer = () => {
  require('react-native-url-polyfill/auto');
  const { mockServerNative } = require('./src/mock-server/mockServerNative');
  mockServerNative.listen({
    onUnhandledRequest: 'bypass',
  });
};

if (Config.RUN_MOCK_SERVER === 'true') {
  initMockServer();
}

AppRegistry.registerComponent(appName, () => App);
