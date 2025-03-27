import '@testing-library/jest-native/extend-expect';
import { mockedNavigationEventEmitter } from '../../__mocks__/react-navigation';

afterAll(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global?.gc?.();
});
beforeEach(() => jest.resetAllMocks());
beforeEach(() => {
  mockedNavigationEventEmitter.removeAllListeners();
});

/**
 * Fix `ExceptionsManager.handleException`
 *
 * https://github.com/facebook/react-native/issues/29849#issuecomment-937407819
 */
jest.mock('react-native/Libraries/LogBox/LogBox');
