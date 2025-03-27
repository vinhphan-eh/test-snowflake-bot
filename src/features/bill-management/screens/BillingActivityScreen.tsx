import React, { useEffect, useState } from 'react';
import { Box, Button, Tag, Typography, useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CurrencyText } from '../../../common/components/currency-text/CurrencyText';
import { GeneralError } from '../../../common/components/error';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { useGetMinSnapPoint } from '../../../common/hooks/useGetMinSnapPoint';
import { useInAppBrowser } from '../../../common/shared-hooks/useInAppBrowser';
import { useSessionStore } from '../../../common/stores/useSessionStore';
import { formatUTCToLocalDateString } from '../../../common/utils/date';
import type { BillTransaction, Subscription, Transaction } from '../../../new-graphql/generated';
import {
  BillStatus,
  SubscriptionType,
  useGetSubscriptionDetailQuery,
  useInfiniteGetSubscriptionTransactionsQuery,
} from '../../../new-graphql/generated';
import { useRegionLocalisation } from '../../../providers/LocalisationProvider';
import { BillTransactionDrawer } from '../components/BillTransactionDrawer';
import { ContactSupport } from '../components/ContactSupport';
import { TotalSavedCard } from '../components/TotalSavedCard';
import { CONTACT_SE_LINK, EH_FAQ, PAYMENT_LINK, REBRAND_EH_FAQ } from '../constant';
import { useMoneyBillMgmtTracking } from '../hooks/useMoneyBillMgmtTracking';
import type { BillManagementMoneyNavigationProp, BillManagementMoneyRouteProp } from '../navigation/navigationTypes';
import { getTagIntentByStatus } from '../types';
import { splitTransactionsIntoSections } from '../utils/splitTransactionsIntoSections';

export const BillingActivityScreen = () => {
  const { colors, space } = useTheme();
  const navigation = useNavigation<BillManagementMoneyNavigationProp<'BillingActivity'>>();
  const route = useRoute<BillManagementMoneyRouteProp<'BillingActivity'>>();
  const { openUrl } = useInAppBrowser();
  const { minSnapPoint, onLayoutEndPosition, onLayoutScreenHeight } = useGetMinSnapPoint({ top: 'medium' });
  const { swagTextAndImageRebrandEnabled } = useSessionStore();

  const { formatMessage } = useRegionLocalisation();
  const { subscription: subscriptionParam } = route.params;
  const [subscription, setSubscription] = useState<Subscription>(subscriptionParam);
  const { id: subscriptionId, latestBill: latestBillResponse, provider, subscriptionType, totalSaved } = subscription;

  const {
    data: subscriptionDetail,
    isError,
    isLoading,
  } = useGetSubscriptionDetailQuery({ input: { id: subscriptionId } }, { enabled: !!subscriptionId });

  const {
    data: transactionsQueryData,
    fetchNextPage,
    hasNextPage,
    isError: isTransactionError,
    isFetchingNextPage,
    isLoading: isTransactionLoading,
  } = useInfiniteGetSubscriptionTransactionsQuery(
    {
      subcriptionInput: { id: subscriptionId },
      transactionsInput: { first: 10 },
    },
    {
      keepPreviousData: true,
      getNextPageParam: previousPage => {
        const { pageInfo } = previousPage.me?.billManagement?.subscription?.transactions || {
          pageInfo: {
            hasNextPage: false,
            endCursor: null,
          },
        };
        if (pageInfo.hasNextPage) {
          return {
            subcriptionInput: { id: subscriptionId },
            transactionsInput: { first: 10, after: pageInfo.endCursor },
          };
        }
        return undefined;
      },
    }
  );
  const { trackClickMakePayment, trackVisitBillingInfoPage } = useMoneyBillMgmtTracking();

  const subscriptionData = subscriptionDetail?.me?.billManagement?.subscription as Subscription;

  useEffect(() => {
    if (subscriptionData && !isLoading && !isError) {
      trackVisitBillingInfoPage({
        provider: subscriptionData?.provider?.name ?? '',
        planType: subscriptionData?.subscriptionType ?? '',
      });
      setSubscription(subscriptionData);
    }
  }, [isLoading, isError, subscriptionData]);

  if (isError) {
    return <GeneralError testID="bill_activity_error" themeName="eBens" />;
  }

  const transactions =
    transactionsQueryData?.pages?.flatMap(page => page.me?.billManagement?.subscription?.transactions?.edges) ?? [];

  const loadMoreTransactions = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const { sections: transactionsSections } = splitTransactionsIntoSections({
    transactions: (transactions?.map(e => e?.node) as Transaction[]) ?? [],
  });

  const latestBill = latestBillResponse as BillTransaction;
  const isHavingBill = latestBill?.status === BillStatus.Due || latestBill?.status === BillStatus.Overdue;

  const title = `${subscriptionType === SubscriptionType.Electricity ? 'Electricity' : 'Gas'} Bill`;
  const topBackground = isHavingBill ? colors.defaultGlobalSurface : colors.neutralGlobalSurface;

  const onMakePayment = () => {
    trackClickMakePayment({
      provider: subscriptionData?.provider?.name ?? '',
      planType: subscriptionData?.subscriptionType ?? '',
    });
    openUrl(PAYMENT_LINK);
  };

  const renderDueAmount = () => {
    const dueDateText = `${formatMessage({ id: 'benefits.bill.paymentDue' })} ${formatUTCToLocalDateString(
      latestBill?.dueDate ?? ''
    )}`;

    if (!isHavingBill) {
      return null;
    }

    return (
      <Box
        borderBottomLeftRadius="5xlarge"
        borderBottomRightRadius="5xlarge"
        padding="large"
        alignItems="center"
        backgroundColor="defaultGlobalSurface"
      >
        <CurrencyText amount={latestBill.amount.amount} />
        <Typography.Body style={{ marginTop: space.xsmall }} typeface="playful">
          {dueDateText}
        </Typography.Body>
        {latestBill.status === BillStatus.Overdue ? (
          <Tag testID="bill-card-status" intent={getTagIntentByStatus(latestBill.status)} content={latestBill.status} />
        ) : null}
      </Box>
    );
  };

  return (
    <Box flex={1} backgroundColor="neutralGlobalSurface">
      <CustomStatusBar backgroundColor={topBackground} />
      <Page.TopBar onBack={navigation.goBack} hideRight title={title} style={{ backgroundColor: topBackground }} />
      <Box flex={1} onLayout={onLayoutScreenHeight}>
        {renderDueAmount()}
        <Box alignItems="center" marginHorizontal="medium" marginTop="large">
          <Box style={{ width: '100%' }} flexDirection="row">
            <TotalSavedCard
              style={{ flex: 1 / 2, marginRight: space.medium }}
              amount={totalSaved?.amount ?? 0}
              text={`On ${subscriptionType === SubscriptionType.Electricity ? 'Electricity' : 'Gas'}`}
              onPress={() => {}}
            />
            <ContactSupport
              style={{ flex: 1 / 2 }}
              text={formatMessage({ id: 'benefits.bill.contactSE' })}
              onPress={() => openUrl(CONTACT_SE_LINK)}
            />
          </Box>
          <Typography.Body style={{ marginTop: space.large }} variant="small">
            {formatMessage({ id: 'benefits.bill.wantToKnowMore' })}{' '}
            <Typography.Body
              onPress={() => openUrl(swagTextAndImageRebrandEnabled ? REBRAND_EH_FAQ : EH_FAQ)}
              variant="small"
              intent="primary"
              style={{ textDecorationLine: 'underline' }}
            >
              {formatMessage({ id: 'benefits.bill.visitFAQ' })}
            </Typography.Body>
          </Typography.Body>
          <Button
            style={{ marginTop: space.large }}
            disabled={!isHavingBill}
            text={formatMessage({ id: 'benefits.bill.makePayment' })}
            onPress={onMakePayment}
          />
          <Typography.Caption style={{ marginTop: space.smallMedium, textAlign: 'center' }} intent="subdued">
            {formatMessage({ id: 'benefits.bill.dataNotRealTime' })}
          </Typography.Caption>
        </Box>
        <Box
          // fake last element
          style={{ width: 10, height: 1 }}
          onLayout={onLayoutEndPosition}
        />

        <BillTransactionDrawer
          isError={isTransactionError}
          snapPoints={[minSnapPoint, '100%']}
          sections={transactionsSections}
          isFetching={isTransactionLoading}
          isFetchingNextPage={isFetchingNextPage}
          onEndReached={loadMoreTransactions}
          providerName={provider?.name ?? ''}
        />
      </Box>
    </Box>
  );
};
