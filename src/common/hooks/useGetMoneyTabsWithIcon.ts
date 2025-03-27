import { useMemo } from 'react';
import type { IconName } from '@hero-design/rn';
import { useGetMoneyTabs } from './useGetMoneyTabs';
import { WalletTabKeys } from '../constants/navigation';

const MAPPED_ICONS: Record<string, IconName> = {
  [WalletTabKeys.SPEND]: 'wallet-outlined',
  [WalletTabKeys.INCOME]: 'bank',
  [WalletTabKeys.STASH]: 'stash-outlined',
  [WalletTabKeys.BILL_MANAGEMENT]: 'bill-management-outlined',
  [WalletTabKeys.HERO_POINTS]: 'hero-points',
  [WalletTabKeys.CARD]: 'credit-card-outlined',
  [WalletTabKeys.SUPER]: 'piggy-bank-outlined',
  [WalletTabKeys.SUPPORT]: 'circle-question-outlined',
};

export const useGetMoneyTabsWithIcon = () => {
  const tabs = useGetMoneyTabs();

  return useMemo(
    () =>
      tabs
        .filter(tab => tab.key !== WalletTabKeys.HERO_DOLLARS) // ignore hero dollars tab
        .map(tab => {
          return {
            ...tab,
            icon: MAPPED_ICONS[tab.key],
          };
        }),
    [tabs]
  );
};
