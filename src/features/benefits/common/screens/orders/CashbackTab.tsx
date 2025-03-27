import React, { useCallback, useRef } from 'react';
import { FlatList } from 'react-native';
import { Box, Spinner, Tag, Typography, useTheme } from '@hero-design/rn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AmountCard } from './components/AmountCard';
import { TransactionListItem } from './components/TransactionListItem';
import { useMixpanel } from '../../../../../common/hooks/useMixpanel';
import { EventTrackingCategory } from '../../../../../common/stores/useSessionStore';
import { formatCurrency } from '../../../../../common/utils/numbers';
import { useCashbackTransactionsV2Query, type CashbackTransaction } from '../../../../../new-graphql/generated';
import { useGetWalletStatusQuery, WalletSetupStatus } from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { SWIPE_CASHBACK_HISTORY_TAB_UP } from '../../../cash-back/card-link-offers/constants/mixpanel';
import { Alert } from '../../../cash-back/card-link-offers/screens/CashbackOverviewScreen/components/Alert';
import { OpenWallet } from '../../../cash-back/card-link-offers/screens/CashbackOverviewScreen/components/OpenWallet';
import { CASHBACK_MODULE } from '../../../cash-back/constants';
import { useOnTabFocusedEffect } from '../../hooks/useOnTabFocusedEffect';

export const CashbackTab = () => {
  const { space } = useTheme();
  const { formatMessage } = useIntl();
  const { bottom: bottomInset } = useSafeAreaInsets();
  const flatlistRef = useRef<FlatList<CashbackTransaction>>(null);

  const {
    data: transactionsRes,
    isError: isErrorCashbackTransactions,
    isLoading: isLoadingCashbackTransactions,
  } = useCashbackTransactionsV2Query();

  const {
    data: userData,
    isError,
    isLoading: isLoadingUserData,
  } = useGetWalletStatusQuery(
    {},
    {
      retryOnMount: false,
    }
  );
  const eWalletStatus = userData?.me?.wallet?.details.setupStatus?.status;
  const isOnboardingWallet = (eWalletStatus && eWalletStatus !== WalletSetupStatus.None) ?? false;
  const { eventTracking } = useMixpanel();

  useOnTabFocusedEffect('benefits-purchases', () => {
    flatlistRef.current?.scrollToOffset({ animated: false, offset: 0 });
  });

  const renderConfirm = () => {
    const confirmedAmount = transactionsRes?.me?.cashback?.transactionsV2.confirmed || 0;
    const confirmedIntent = confirmedAmount === 0 ? 'archived' : 'success';
    if (eWalletStatus === WalletSetupStatus.InProgress || eWalletStatus === WalletSetupStatus.Failed) {
      return (
        <AmountCard
          amount={0}
          disabled
          title={formatMessage({ id: 'common.settled' })}
          subtitle={formatMessage({ id: 'benefits.cashback.paidToYourAccount' })}
          titleIntent="archived"
          style={{ flex: 1, marginLeft: space.medium }}
        />
      );
    }
    return (
      <AmountCard
        amount={confirmedAmount}
        disabled={confirmedAmount === 0}
        title={formatMessage({ id: 'common.settled' })}
        subtitle={formatMessage({ id: 'benefits.cashback.paidToYourAccount' })}
        titleIntent={confirmedIntent}
        style={{ flex: 1, marginLeft: space.medium }}
      />
    );
  };

  const renderEmptyComp = () => {
    return (
      <Box backgroundColor="neutralGlobalSurface" paddingTop="medium" alignItems="center" paddingBottom="large">
        {isLoadingCashbackTransactions ? (
          <Spinner size="small" />
        ) : (
          <Typography.Body variant="small">{formatMessage({ id: 'benefits.cashback.noTransaction' })}</Typography.Body>
        )}
      </Box>
    );
  };

  const renderHeaderComp = useCallback(() => {
    return (
      <Box>
        <Box flexDirection="row" alignItems="center" marginBottom="medium">
          <Typography.Body variant="regular-bold">
            {formatMessage({ id: 'benefits.cashback.lifetimeCashback' })}
          </Typography.Body>
          <Tag
            testID="price-tag"
            style={{
              marginLeft: space.small,
            }}
            content={
              <Typography.Caption fontWeight="semi-bold">
                {formatCurrency(transactionsRes?.me?.cashback?.transactionsV2.total || 0)}
              </Typography.Caption>
            }
          />
        </Box>
        <Box flexDirection="row">
          <AmountCard
            amount={transactionsRes?.me?.cashback?.transactionsV2.pending || 0}
            title={formatMessage({ id: 'common.pending' })}
            subtitle={formatMessage({ id: 'benefits.cashback.comingYourWay' })}
            titleIntent="warning"
            style={{ flex: 1 }}
          />
          {isOnboardingWallet && !isError ? renderConfirm() : <OpenWallet />}
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

        <Box
          borderTopLeftRadius="large"
          borderTopRightRadius="large"
          paddingTop="medium"
          bgColor="defaultGlobalSurface"
          marginTop="large"
          flex={1}
        >
          <Typography.Body style={{ marginLeft: space.medium, marginBottom: space.medium }} variant="regular-bold">
            {formatMessage({ id: 'benefits.cashback.cashbackHistory' })}
          </Typography.Body>
        </Box>
      </Box>
    );
  }, [eWalletStatus, isLoadingUserData, transactionsRes, isOnboardingWallet, isError]);

  const onTouchMove = () => {
    eventTracking({
      event: SWIPE_CASHBACK_HISTORY_TAB_UP,
      categoryName: EventTrackingCategory.USER_ACTION,
      metaData: {
        module: CASHBACK_MODULE,
      },
    });
  };

  const transactions = transactionsRes?.me?.cashback?.transactionsV2?.edges.map(edge => edge.node) || [];
  return (
    <Box backgroundColor="neutralGlobalSurface" flex={1} paddingHorizontal="medium">
      {isErrorCashbackTransactions ? (
        <Box style={{ flex: 1 }}>
          <Box paddingTop="smallMedium" marginHorizontal="small" justifyContent="center" alignItems="center">
            <Typography.Title level="h6" style={{ textAlign: 'center' }} accessibilityLabel="get transactions error">
              {formatMessage({ id: 'benefits.cashback.transactionsError' })}
            </Typography.Title>
          </Box>
        </Box>
      ) : (
        <FlatList
          ref={flatlistRef}
          data={transactions}
          keyExtractor={(item, index) => `${item.id.toString()}${index}}`}
          renderItem={({ item }) => <TransactionListItem transaction={item} />}
          showsHorizontalScrollIndicator={false}
          onTouchMove={onTouchMove}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: bottomInset || space.medium,
            paddingTop: space.large,
          }}
          ListEmptyComponent={renderEmptyComp}
          ListHeaderComponent={renderHeaderComp}
        />
      )}
    </Box>
  );
};
