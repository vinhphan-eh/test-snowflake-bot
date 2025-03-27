import { useState, useEffect } from 'react';
import type { BenefitsTabKeysType } from './useBenefitsTabs/constants';
import { useTopTabStore } from '../../../../common/stores/useTopTabStore';

// using Tabs.Scroll lazyPreloadDistance at src/navigation/BenefitsTopTabs.tsx makes bottom drawer is not working on  iphone SE
// so if we are not on this screen, we use a fake screen to avoid the drawer to be loaded
export const usePreventLazyLoad = (key: BenefitsTabKeysType) => {
  const selectedTab = useTopTabStore(state => state.selectedTab);
  const [shouldUseFakeScreen, setShouldUseFakeScreen] = useState(true);
  useEffect(() => {
    if (selectedTab === key) {
      setShouldUseFakeScreen(false);
    } else {
      setShouldUseFakeScreen(true);
    }
  }, [selectedTab, shouldUseFakeScreen, key]);

  return { shouldUseFakeScreen };
};
