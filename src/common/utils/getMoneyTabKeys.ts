import type { TabKeysType, TabPermissions } from '../../navigation/TopTabsNavigator';
import { WalletTabKeys } from '../constants/navigation';

export const getMoneyTabKeys: (permission: TabPermissions) => TabKeysType[] = (permission: TabPermissions) => {
  const moneyTabKeys = [
    ...(permission.spend ? [WalletTabKeys.SPEND] : []),
    ...(permission.stash ? [WalletTabKeys.STASH] : []),
    ...(permission.income ? [WalletTabKeys.INCOME] : []),
    ...(permission.billManagement ? [WalletTabKeys.BILL_MANAGEMENT] : []),
    ...(permission.heroPoints ? [WalletTabKeys.HERO_POINTS] : []),
    ...(permission.card ? [WalletTabKeys.CARD] : []),
    ...(permission.super ? [WalletTabKeys.SUPER] : []),
    ...(permission.support ? [WalletTabKeys.SUPPORT] : []),
  ];
  return moneyTabKeys;
};
