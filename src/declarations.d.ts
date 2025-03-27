/**
 * React Navigation: Better type-safety
 * https://reactnavigation.org/blog/2021/08/14/react-navigation-6.0/#better-type-safety
 */
declare global {
  import type { RootStackParamList } from './navigation/navigationTypes';
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    type RootParamList = RootStackParamList;
  }
}

declare namespace global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  function __reanimatedWorkletInit(): void;
}
