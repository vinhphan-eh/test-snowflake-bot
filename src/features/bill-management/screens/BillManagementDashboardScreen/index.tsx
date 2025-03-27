import React, { useEffect, useMemo } from 'react';
import { BillManagementDashboard } from './BillManagementDashboard';
import { BillManagementEmptyState } from './BillManagementEmptyState';
import { GeneralError } from '../../../../common/components/error';
import { OverlayLoadingScreen } from '../../../../common/components/spinner';
import { WalletTabKeys } from '../../../../common/constants/navigation';
import { useTopTabStore } from '../../../../common/stores/useTopTabStore';
import { SubscriptionStatus, useGetSubscriptionsQuery } from '../../../../new-graphql/generated';
import { useMoneyBillMgmtTracking } from '../../hooks/useMoneyBillMgmtTracking';

export const BillManagementDashboardScreen = () => {
  const selectedTab = useTopTabStore(state => state.selectedTab);
  const { trackVisitMoneyBillPage } = useMoneyBillMgmtTracking();

  const {
    data: getSubScriptionResponse,
    isError,
    isLoading,
  } = useGetSubscriptionsQuery({
    input: {
      first: 20,
    },
  });

  const listData = useMemo(
    () => getSubScriptionResponse?.me?.billManagement?.subscriptions?.edges ?? [],
    [getSubScriptionResponse?.me?.billManagement?.subscriptions?.edges]
  );
  const filteredData = useMemo(
    () =>
      listData.filter(
        e => e.node.status === SubscriptionStatus.Active || e.node.status === SubscriptionStatus.Cancelled
      ),
    [listData]
  );
  const subscriptions = useMemo(() => listData.map(e => e.node), [listData]);

  useEffect(() => {
    if (selectedTab === WalletTabKeys.BILL_MANAGEMENT) {
      trackVisitMoneyBillPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  if (isError) {
    return <GeneralError themeName="eBens" />;
  }

  return (
    <>
      {filteredData.length === 0 ? (
        <BillManagementEmptyState subscriptions={subscriptions} />
      ) : (
        <BillManagementDashboard filteredData={filteredData} />
      )}
      {isLoading && <OverlayLoadingScreen />}
    </>
  );
};
