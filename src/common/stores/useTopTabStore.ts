import { create } from 'zustand';
import type { BenefitsTabKeysType } from '../../features/benefits/common/hooks/useBenefitsTabs/constants';
import type { TabKeysType } from '../../navigation/TopTabsNavigator';

interface TopTabStoreData {
  selectedTab?: TabKeysType | BenefitsTabKeysType;
}

export const useTopTabStore = create<TopTabStoreData>()(() => ({}));
