import EventEmitter from 'events';
import type { NavigationProp, ParamListBase } from '@react-navigation/native';

export const mockedNavigate = jest.fn();
export const mockedGoBack = jest.fn();
export const mockedPopToTop = jest.fn();
export const mockedReplace = jest.fn();
export const mockedGetParent = jest.fn();
export const mockedDispatch = jest.fn();
export const mockReset = jest.fn();
export const mockedUseIsFocused = jest.fn()

export const mockedUseNavigation = <T extends NavigationProp<ParamListBase>>(): T =>
  ({
    navigate: mockedNavigate,
    goBack: mockedGoBack,
    popToTop: mockedPopToTop,
    dispatch: mockedDispatch,
    getParent: mockedGetParent,
    replace: mockedReplace,
    reset: mockReset,
    addListener: jest.fn().mockImplementation((eventName, callback) => {
      mockedNavigationEventEmitter.addListener(eventName, callback);
      return () => {
        mockedNavigationEventEmitter.removeListener(eventName, callback);
      };
    }),

    removeListener: mockedNavigationEventEmitter.removeListener,
  } as unknown as T);

export const mockedNavigationEventEmitter = new EventEmitter();
