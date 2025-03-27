import type React from 'react';
import type { TabKeysType } from './TopTabsNavigator';
import type { BenefitsTabKeysType } from '../features/benefits/common/hooks/useBenefitsTabs/constants';

export const CORE_DASH_BOARD = 'dashboard';
export const CORE_WORKZONE = 'workzone';

class TopTabUtils {
  setSelectedTab?: React.Dispatch<React.SetStateAction<TabKeysType>> = undefined;

  selectedTab?: TabKeysType = '';

  pillarAppLocation: typeof CORE_DASH_BOARD | typeof CORE_WORKZONE = CORE_DASH_BOARD;

  setSelectedBenefitsTab?: React.Dispatch<React.SetStateAction<BenefitsTabKeysType>> = undefined;

  initMoneySelectTab(setSelectedTab: React.Dispatch<React.SetStateAction<TabKeysType>>, isWorkzone: boolean) {
    this.setSelectedTab = setSelectedTab;
    this.pillarAppLocation = isWorkzone ? CORE_WORKZONE : CORE_DASH_BOARD;
  }

  initBenefitsSelectTab(
    setSelectedTab: React.Dispatch<React.SetStateAction<BenefitsTabKeysType>>,
    isWorkzone: boolean
  ) {
    this.setSelectedBenefitsTab = setSelectedTab;
    this.pillarAppLocation = isWorkzone ? CORE_WORKZONE : CORE_DASH_BOARD;
  }
}

export const topTabUtils = new TopTabUtils();
