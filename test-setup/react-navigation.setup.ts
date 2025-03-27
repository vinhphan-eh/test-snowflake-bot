import { mockedUseNavigation, mockedUseIsFocused } from '../__mocks__/react-navigation';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');

  return {
    ...actualNav,
    useNavigation: mockedUseNavigation,
    useRoute: jest.fn(),
    useIsFocused: mockedUseIsFocused,
  };
});
