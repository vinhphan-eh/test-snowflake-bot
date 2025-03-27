import { useMemo } from 'react';
import { useGetMoneyTabKeys } from './useGetMoneyTabKeys';
import { PillarIds, WalletTabKeys } from '../constants/navigation';
import { switchPillar } from '../stores/useMiniAppSwitcherStore';

const MAPPED_NAMES: Record<string, string> = {
  [WalletTabKeys.SPEND]: 'Spend',
  [WalletTabKeys.STASH]: 'Stash',
  [WalletTabKeys.INCOME]: 'Income',
  [WalletTabKeys.BILL_MANAGEMENT]: 'Bill Management',
  [WalletTabKeys.HERO_POINTS]: 'Points',
  [WalletTabKeys.CARD]: 'Card',
  [WalletTabKeys.SUPER]: 'Super',
  [WalletTabKeys.SUPPORT]: 'Support',
};

const MONEY_MODULE = 'money';

type ParamsOnPress = {
  onFinish?: () => void;
};

export const useGetMoneyTabs = () => {
  const moneyTabKeys = useGetMoneyTabKeys();
  const tabs = useMemo(() => {
    return moneyTabKeys.map(key => {
      return {
        key,
        name: MAPPED_NAMES[key] || key,
        module: MONEY_MODULE,
        onPress: (params?: ParamsOnPress) => {
          switchPillar({
            to: {
              pillarId: PillarIds.WalletApp,
              tab: key,
              onFinish: params?.onFinish,
            },
          });
        },
      };
    });
  }, [moneyTabKeys]);

  return tabs;
};
