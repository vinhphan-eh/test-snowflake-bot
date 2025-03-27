import React, { useEffect, useMemo, useState } from 'react';
import type { TabType } from '@hero-design/rn';
import { Box, Spinner, Tabs, useTheme } from '@hero-design/rn';
import { BillsTab } from './BillsTab';
import { CashbackTab } from './CashbackTab';
import { GiftcardsTab } from './GiftcardsTab';
import { useBenefitsOrderStore } from './stores/useBenefitsOrderStore';
import type { BenefitsOrderTabKeysType } from './types';
import { BenefitsOrderTabKeys } from './types';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { usePurchaseTabVisibility } from '../../hooks/usePurchaseTabVisibility';

export type BenefitsOrdersTabPermissions = {
  cashback?: boolean;
  bills?: boolean;
  giftCards?: boolean;
};

export const BenefitsOrdersScreen = () => {
  const { colors } = useTheme();
  const [selectedTabKey, setSelectedTabKey] = useState<BenefitsOrderTabKeysType>(BenefitsOrderTabKeys.NONE);
  const pendingChangeBenefitsOrdersTab = useBenefitsOrderStore(state => state.pendingChangeBenefitsOrdersTab);
  const setPendingChangeBenefitsOrdersTab = useBenefitsOrderStore(state => state.setPendingChangeBenefitsOrdersTab);

  const { billTabVisibility, cashbackTabVisibility, isFetched, storeTabVisibility } = usePurchaseTabVisibility();

  const { formatMessage } = useIntl();

  useEffect(() => {
    if (pendingChangeBenefitsOrdersTab && isFetched) {
      // hacky way for tabs to change correctly
      setTimeout(() => {
        setSelectedTabKey(pendingChangeBenefitsOrdersTab);
        setPendingChangeBenefitsOrdersTab(undefined);
      }, 500);
    }
  }, [pendingChangeBenefitsOrdersTab, isFetched]);

  const getBenefitsOrdersTab = (permissions: BenefitsOrdersTabPermissions): Array<TabType> => [
    ...(permissions.giftCards
      ? [
          {
            key: BenefitsOrderTabKeys.GIFTCARDS,
            testID: 'gift-cards-tab',
            activeItem: formatMessage({ id: 'benefits.giftcard.title' }),
            component: <GiftcardsTab />,
          } as TabType,
        ]
      : []),
    ...(permissions.cashback
      ? [
          {
            key: BenefitsOrderTabKeys.CASHBACK,
            testID: 'cashback-tab',
            activeItem: formatMessage({ id: 'benefits.cashback.title' }),
            component: <CashbackTab />,
          } as TabType,
        ]
      : []),
    ...(permissions.bills
      ? [
          {
            key: BenefitsOrderTabKeys.BILLS,
            testID: 'bills-tab',
            activeItem: formatMessage({ id: 'benefits.bill.bills' }),
            component: <BillsTab />,
          } as TabType,
        ]
      : []),
  ];

  const orderTab = useMemo(
    () =>
      getBenefitsOrdersTab({
        bills: billTabVisibility,
        cashback: cashbackTabVisibility,
        giftCards: storeTabVisibility,
      }),
    [billTabVisibility, cashbackTabVisibility, storeTabVisibility]
  );

  useEffect(() => {
    if (selectedTabKey === BenefitsOrderTabKeys.NONE && orderTab.length > 0 && isFetched) {
      setSelectedTabKey(orderTab[0].key as BenefitsOrderTabKeysType);
    }
  }, [isFetched, selectedTabKey, orderTab]);

  if (!selectedTabKey || !isFetched) {
    return (
      <Box style={{ flex: 1 }}>
        <Spinner testID="spinner" />
      </Box>
    );
  }

  const renderTabs = () => {
    if (orderTab.length === 1) {
      return orderTab[0].component;
    }
    return (
      <Tabs
        testID="benefits-purchases-tabs"
        onTabPress={newTabKey => setSelectedTabKey(newTabKey as BenefitsOrderTabKeysType)}
        selectedTabKey={selectedTabKey}
        tabs={orderTab}
        barStyle={{ borderBottomColor: colors.defaultGlobalSurface, backgroundColor: colors.neutralGlobalSurface }}
      />
    );
  };

  return <Box flex={1}>{renderTabs()}</Box>;
};
