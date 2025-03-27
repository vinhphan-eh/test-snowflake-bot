import React, { useMemo } from 'react';
import { Box, Spinner, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { Alert } from './components/Alert';
import { Confirm, ConfirmDisabled } from './components/Confirm';
import { LifeTimeCashback } from './components/LifeTimeCashback';
import { OpenWallet } from './components/OpenWallet';
import { Pending } from './components/Pending';
import { TransactionsDrawer } from './components/TransactionsDrawer';
import { Page } from '../../../../../../common/components/layout/page';
import { CustomStatusBar } from '../../../../../../common/components/status-bar/CustomStatusBar';
import { useGetMinSnapPoint } from '../../../../../../common/hooks/useGetMinSnapPoint';
import { useMixpanel } from '../../../../../../common/hooks/useMixpanel';
import { useInAppBrowser } from '../../../../../../common/shared-hooks/useInAppBrowser';
import { EventTrackingCategory } from '../../../../../../common/stores/useSessionStore';
import {
  useCashbackTransactionsV2Query,
  useGetWalletStatusQuery,
  WalletSetupStatus,
} from '../../../../../../new-graphql/generated';
import { BENEFITS_CASHBACK_FAQ_LINK } from '../../../../../support/constants/supportLinks';
import { CASHBACK_MODULE, CLICK_VISIT_OUT_FAQS, SWIPE_CASHBACK_HISTORY_TAB_UP } from '../../constants/mixpanel';
import { useSplitTransactionsIntoSections } from '../../hooks/useSplitTransactionsIntoSections';
import type { CardLinkOffersNavigationProp } from '../../navigation/navigationType';

export const CashbackOverviewScreen = () => {
  const navigation = useNavigation<CardLinkOffersNavigationProp<'ManageCashbackDashboard'>>();
  const { colors, space } = useTheme();
  const {
    data: transactionsRes,
    isError: isErrorCashbackTransactions,
    isLoading: isLoadingCashbackTransactions,
  } = useCashbackTransactionsV2Query();
  const { minSnapPoint, onLayoutEndPosition, onLayoutScreenHeight } = useGetMinSnapPoint({ top: 'medium' });
  const { data: userData, isLoading: isLoadingUserData } = useGetWalletStatusQuery();
  const eWalletStatus = userData?.me?.wallet?.details.setupStatus?.status;
  const isOnboardingWallet = (eWalletStatus && eWalletStatus !== WalletSetupStatus.None) ?? false;
  const transactions = useMemo(
    () => transactionsRes?.me?.cashback?.transactionsV2?.edges.map(edge => edge.node),
    [transactionsRes]
  );
  const { sections } = useSplitTransactionsIntoSections({
    transactions,
  });
  const { openUrl } = useInAppBrowser();
  const { eventTracking } = useMixpanel();

  const renderConfirm = () => {
    if (eWalletStatus === WalletSetupStatus.InProgress || eWalletStatus === WalletSetupStatus.Failed) {
      return <ConfirmDisabled />;
    }
    return <Confirm amount={transactionsRes?.me?.cashback?.transactionsV2?.confirmed || 0} />;
  };

  const onTouchMove = () => {
    eventTracking({
      event: SWIPE_CASHBACK_HISTORY_TAB_UP,
      categoryName: EventTrackingCategory.USER_ACTION,
      metaData: {
        module: CASHBACK_MODULE,
      },
    });
  };

  return (
    <>
      <CustomStatusBar backgroundColor={colors.defaultGlobalSurface} />
      <Page.TopBar
        onBack={navigation.goBack}
        title="Cashback activity"
        backgroundColor="defaultGlobalSurface"
        hideRight
      />

      <Box backgroundColor="neutralGlobalSurface" flex={1} onLayout={onLayoutScreenHeight}>
        <LifeTimeCashback
          isLoading={isLoadingCashbackTransactions}
          amount={transactionsRes?.me?.cashback?.transactionsV2.total || 0}
        />
        <Box flexDirection="row" marginTop="large" marginHorizontal="medium">
          <Pending amount={transactionsRes?.me?.cashback?.transactionsV2.pending || 0} />
          {isOnboardingWallet ? renderConfirm() : <OpenWallet />}
          {isLoadingUserData && (
            <Box
              backgroundColor="highlightedSurface"
              borderRadius="xlarge"
              style={{
                position: 'absolute',
                right: 0,
                left: 0,
                top: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Spinner size="small" />
            </Box>
          )}
        </Box>
        <Alert walletStatus={eWalletStatus} />
        <Typography.Body variant="small" style={{ marginHorizontal: space.medium, marginTop: space.medium }}>
          How does Cashback work?&nbsp;
          <Typography.Body
            variant="small"
            onPress={() => {
              eventTracking({
                event: CLICK_VISIT_OUT_FAQS,
                categoryName: EventTrackingCategory.USER_ACTION,
                metaData: {
                  module: CASHBACK_MODULE,
                },
              });
              openUrl(BENEFITS_CASHBACK_FAQ_LINK);
            }}
            intent="primary"
            style={{ textDecorationLine: 'underline' }}
          >
            Visit our FAQs
          </Typography.Body>
        </Typography.Body>

        <Box
          // fake last element
          style={{ width: 10, height: 1 }}
          onLayout={onLayoutEndPosition}
        />

        <TransactionsDrawer
          isError={isErrorCashbackTransactions}
          snapPoints={[minSnapPoint, '100%']}
          sections={sections}
          isFetching={isLoadingCashbackTransactions}
          onTouchMove={onTouchMove}
        />
      </Box>
    </>
  );
};
