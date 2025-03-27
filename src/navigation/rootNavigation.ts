import type { NavigationContainerRef, ParamListBase, RouteProp } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { NavigateFromRootParams, RootStackParamList } from './navigationTypes';
import type { TabKeysType } from './TopTabsNavigator';
import { topTabUtils } from './utils';
import type { BenefitsTabKeysType } from '../features/benefits/common/hooks/useBenefitsTabs/constants';

// This allow to get route and navigation props
export const CORE_SETTINGS_STACK = 'settings/index';

export interface StackNavigationProps<ParamList extends ParamListBase, RouteName extends keyof ParamList = string> {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}

// This allow to call navigation from outside a Navigator.
let navigationRef: NavigationContainerRef<RootStackParamList> | null = null;

export const swagPersonalSetTopLevelNavigator = (ref: NavigationContainerRef<RootStackParamList>) => {
  navigationRef = ref;
};
/**
 * Navigate using navigation ref. By default, please use `navigation.navigate` instead of this function
 * When use this function, please be careful
 */
export const navigateFromRoot = <RouteName extends keyof RootStackParamList>(
  ...args: NavigateFromRootParams<RouteName>
) => {
  navigationRef?.navigate(...args);
};

export const navigateToTopTabs = (tabKeys?: TabKeysType) => {
  const { pillarAppLocation, setSelectedTab } = topTabUtils;
  navigationRef?.navigate(pillarAppLocation);

  if (setSelectedTab && tabKeys) {
    // jump to other tabs, default jump back to previous tab
    setSelectedTab(tabKeys);
  }
};

export const navigateToBenefitsTopTabs = (tabKeys?: BenefitsTabKeysType) => {
  const { pillarAppLocation, setSelectedBenefitsTab } = topTabUtils;
  navigationRef?.navigate(pillarAppLocation);

  if (setSelectedBenefitsTab && tabKeys) {
    // jump to other tabs, default jump back to previous tab
    setSelectedBenefitsTab(tabKeys);
  }
};

export const openSuperAppProfileStack = () => {
  navigationRef?.navigate(CORE_SETTINGS_STACK);
};

export const getNavigationRef = () => navigationRef;

export const workaroundNavigate = (navigateFunction: () => void) => {
  setTimeout(navigateFunction, 100);
};
