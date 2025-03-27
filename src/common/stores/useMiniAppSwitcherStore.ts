import { useEffect } from 'react';
import { create } from 'zustand';
import type { PillarIds } from './useSessionStore';
import { useSessionStore } from './useSessionStore';
import type { BenefitsTabKeysType } from '../../features/benefits/common/hooks/useBenefitsTabs/constants';
import {
  navigateFromRoot,
  navigateToBenefitsTopTabs,
  navigateToTopTabs,
  workaroundNavigate,
} from '../../navigation/rootNavigation';
import type { TabKeysType } from '../../navigation/TopTabsNavigator';

type ActionCallback = {
  onFinish?: () => void;
};

type SwitchAppAction =
  | {
      pillarId: 'WalletApp';
      tab: TabKeysType;
    }
  | {
      pillarId: 'BenefitsApp';
      tab: BenefitsTabKeysType;
    }
  | {
      pillarId: 'SwagApp';
    };

type SwitchAppActionWithCallback = SwitchAppAction & ActionCallback;

type SwitchAppParam = {
  to: SwitchAppActionWithCallback;
};

type MiniAppSwitcherStore = {
  storedSwitchAppAction?: SwitchAppActionWithCallback;
  currentPillar?: PillarIds;
  readyToSwitchTab?: boolean;
};

export const useMiniAppSwitcherStore = create<MiniAppSwitcherStore>()(() => ({}));

export const switchPillar = (param: SwitchAppParam) => {
  if (param.to.pillarId !== useMiniAppSwitcherStore.getState().currentPillar) {
    useMiniAppSwitcherStore.setState({ readyToSwitchTab: false });
  }
  useSessionStore.getState().setPillar?.(param.to.pillarId);
  useMiniAppSwitcherStore.setState({ storedSwitchAppAction: param.to });
};

const clearSwitchPillarAction = () => {
  useMiniAppSwitcherStore.setState({ storedSwitchAppAction: undefined });
};

export const setReadyToSwitchTab = (value: boolean) => {
  useMiniAppSwitcherStore.setState({ readyToSwitchTab: value });
};

export const useListenerToSwitchPillar = () => {
  const storedSwitchAppAction = useMiniAppSwitcherStore(state => state.storedSwitchAppAction);
  const readyToSwitchTab = useMiniAppSwitcherStore(state => state.readyToSwitchTab);

  useEffect(() => {
    // wait for tabs to be ready
    // swag app doesnt need to wait
    if (storedSwitchAppAction && (readyToSwitchTab || storedSwitchAppAction.pillarId === 'SwagApp')) {
      if (storedSwitchAppAction.pillarId === 'WalletApp') {
        navigateToTopTabs(storedSwitchAppAction.tab);
      } else if (storedSwitchAppAction.pillarId === 'BenefitsApp') {
        navigateToBenefitsTopTabs(storedSwitchAppAction.tab);
      } else {
        navigateFromRoot('dashboard');
      }
      workaroundNavigate(() => {
        storedSwitchAppAction.onFinish?.();
      });
      clearSwitchPillarAction();
    }
  }, [storedSwitchAppAction, readyToSwitchTab]);
};
