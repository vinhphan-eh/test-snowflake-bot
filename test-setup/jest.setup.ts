import 'react-native-gesture-handler/jestSetup';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';

// @ts-ignore
import mockRNCNetInfo from '../__mocks__/@react-native-community/net-info';
// @ts-ignore
import mockClipboard from '@react-native-clipboard/clipboard/jest/clipboard-mock.js';

dayjs.extend(customParseFormat);
dayjs.extend(utc);

/**
 * mock window for hero-design, it prompts to use jsdom, but it's slow
 * so we keep node testEnvironment and self-mocking
 */
// @ts-ignore
global.window = {
  ...global,
  navigator: {
    platform: '',
  },
} as any;

jest.mock('react-native-reanimated', () => {
  const Reanimated = jest.requireActual('react-native-reanimated/mock');
  return {
    ...Reanimated,
    FadeOut: {
      duration: jest.fn(),
    },
    scrollTo: jest.fn(),
    runOnUI: (fn: any) => fn,
  };
});

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

jest.mock('../node_modules/react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native-permissions', () => require('react-native-permissions/mock'));

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-native-clipboard/clipboard', () => mockClipboard);

jest.mock('react-intl', () => {
  return {
    ...jest.requireActual('react-intl'),
    useIntl: () => ({
      ...jest.requireActual('react-intl').useIntl(),
    }),
  };
});

jest.mock('@ptomasroos/react-native-multi-slider', () => {
  const React = jest.requireActual('react');
  return class Slider extends React.Component {
    render() {
      return React.createElement(
        'MultiSlider',
        {
          ...(this.props ?? {}),
          testID: 'native-multi-slider',
        },
        this.props.children,
      );
    }
  };
});
