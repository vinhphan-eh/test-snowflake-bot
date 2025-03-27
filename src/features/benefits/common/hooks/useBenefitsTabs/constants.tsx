import React from 'react';
import type { TabType } from '@hero-design/rn';
import type { IconProps } from '@hero-design/rn/types/components/Icon';
import { TopTabItem } from '../../../../../common/components/top-tab/TopTabItem';
import { BenefitsTabKeys, PillarIds } from '../../../../../common/constants/navigation';
import { switchPillar } from '../../../../../common/stores/useMiniAppSwitcherStore';
import { withErrorBoundary } from '../../../../../navigation/ErrorBoundary';
import { InstoreScreen } from '../../../cash-back/instore-offer/screens/InstoreScreen';
import { BenefitsSettingsDashboardScreen } from '../../../settings/screens/BenefitsSettingsDashboardScreen';
import { BenefitsHomeScreenV2 } from '../../screens/BenefitsHomeScreenV2';
import { OnlineOffersTab } from '../../screens/OnlineOffersTab';
import { BenefitsOrdersScreen } from '../../screens/orders/BenefitsOrdersScreen';

type TabKeysIndexes = keyof typeof BenefitsTabKeys;

export type BenefitsTabKeysType = (typeof BenefitsTabKeys)[TabKeysIndexes];
export type BenefitsTabPermission = {
  home?: boolean;
  store?: boolean;
  cashback?: boolean;
  bills?: boolean;
  purchase?: boolean;
  online?: boolean;
  instore?: boolean;
};

export type BenefitsTabType = TabType & {
  menuName: string;
  menuIcon: IconProps['icon'] | undefined;
  menuVisibility: boolean;
  menuAction: (params?: { onFinish?: () => void }) => void;
};

export const getTabsV2 = (permissions: BenefitsTabPermission): Array<BenefitsTabType> => [
  ...(permissions.home
    ? [
        {
          key: BenefitsTabKeys.HOME,
          activeItem: () => <TopTabItem icon="home-outlined" isActive testID={BenefitsTabKeys.HOME} title="Home" />,
          inactiveItem: 'home-outlined',
          component: withErrorBoundary(BenefitsHomeScreenV2, 'eBens'),
          menuName: 'Home',
          menuIcon: undefined,
          menuVisibility: false,
          menuAction: ({ onFinish }: { onFinish?: () => void }) => {
            switchPillar({
              to: {
                pillarId: PillarIds.BenefitsApp,
                tab: BenefitsTabKeys.HOME,
                onFinish,
              },
            });
          },
        } as BenefitsTabType,
      ]
    : []),
  ...(permissions.online
    ? [
        {
          key: BenefitsTabKeys.ONLINE,
          activeItem: () => <TopTabItem isActive testID={BenefitsTabKeys.ONLINE} title="Online" />,
          inactiveItem: () => <TopTabItem testID={BenefitsTabKeys.ONLINE} title="Online" />,
          component: withErrorBoundary(OnlineOffersTab, 'eBens'),
          menuName: 'Online',
          menuIcon: 'local_mall_outlined',
          menuVisibility: true,
          menuAction: ({ onFinish }: { onFinish?: () => void }) => {
            switchPillar({
              to: {
                pillarId: PillarIds.BenefitsApp,
                tab: BenefitsTabKeys.ONLINE,
                onFinish,
              },
            });
          },
        } as BenefitsTabType,
      ]
    : []),

  ...(permissions.instore
    ? [
        {
          key: BenefitsTabKeys.INSTORE,
          activeItem: () => <TopTabItem isActive testID={BenefitsTabKeys.INSTORE} title="In-store" />,
          inactiveItem: () => <TopTabItem testID={BenefitsTabKeys.INSTORE} title="In-store" />,
          component: withErrorBoundary(InstoreScreen, 'eBens'),
          menuName: 'In-store',
          menuIcon: 'explore_nearby',
          menuVisibility: true,
          menuAction: ({ onFinish }: { onFinish?: () => void }) => {
            switchPillar({
              to: {
                pillarId: PillarIds.BenefitsApp,
                tab: BenefitsTabKeys.INSTORE,
                onFinish,
              },
            });
          },
        } as BenefitsTabType,
      ]
    : []),

  ...(permissions.purchase
    ? [
        {
          key: BenefitsTabKeys.PURCHASES,
          activeItem: () => <TopTabItem isActive testID={BenefitsTabKeys.PURCHASES} title="Purchases" />,
          inactiveItem: () => <TopTabItem testID={BenefitsTabKeys.PURCHASES} title="Purchases" />,
          component: withErrorBoundary(BenefitsOrdersScreen, 'eBens'),
          menuName: 'Purchases',
          menuIcon: 'shopping_basket_outlined',
          menuVisibility: true,
          menuAction: ({ onFinish }: { onFinish?: () => void }) => {
            switchPillar({
              to: {
                pillarId: PillarIds.BenefitsApp,
                tab: BenefitsTabKeys.PURCHASES,
                onFinish,
              },
            });
          },
        } as BenefitsTabType,
      ]
    : []),
  {
    key: BenefitsTabKeys.SETTINGS,
    activeItem: () => <TopTabItem isActive testID={BenefitsTabKeys.SETTINGS} title="Settings" />,
    inactiveItem: () => <TopTabItem testID={BenefitsTabKeys.SETTINGS} title="Settings" />,
    component: withErrorBoundary(BenefitsSettingsDashboardScreen, 'eBens'),
    menuName: 'Settings',
    menuIcon: 'cog-outlined',
    menuVisibility: true,
    menuAction: ({ onFinish }: { onFinish?: () => void }) => {
      switchPillar({
        to: {
          pillarId: PillarIds.BenefitsApp,
          tab: BenefitsTabKeys.SETTINGS,
          onFinish,
        },
      });
    },
  } as BenefitsTabType,
];
