import type { EffectCallback } from 'react';
import { useEffect } from 'react';
import type { BenefitsTabKeysType } from './useBenefitsTabs/constants';
import { useTopTabStore } from '../../../../common/stores/useTopTabStore';

export const useOnTabFocusedEffect = (tabKey: BenefitsTabKeysType, effect: EffectCallback) => {
  const selectedTab = useTopTabStore(state => state.selectedTab);
  useEffect(() => {
    if (selectedTab === tabKey) {
      effect();
    }
  }, [selectedTab]);
};
