import React, { useRef, useState } from 'react';
import { Platform, Pressable, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Alert, Box, Icon, List, RefreshControl, Spinner, Typography, useTheme } from '@hero-design/rn';
import { MppCardDataParameters } from '@meawallet/react-native-mpp';
import { useNavigation } from '@react-navigation/native';
import Base64 from 'crypto-js/enc-base64';
import Utf8 from 'crypto-js/enc-utf8';
import images from '../../../common/assets/images';
import { GeneralError } from '../../../common/components/error';
import type { SelfHideShowHandler } from '../../../common/hoc/SelfHideShowComp';
import { SelfHideShowComp } from '../../../common/hoc/SelfHideShowComp';
import { useCheckUkDeviceEnrollment } from '../../../common/hooks/useCheckUkDeviceEnrollment';
import { useGetMinSnapPoint } from '../../../common/hooks/useGetMinSnapPoint';
import { useIsAccountUK } from '../../../common/hooks/useIsAccountUK';
import { useRefreshOnFocus } from '../../../common/hooks/useRefreshOnFocus';
import { queryClient } from '../../../common/libs/queryClient';
import { usePasscodeStore } from '../../../common/screens/passcode';
import { useShowAppSwitcherOnFocus } from '../../../common/shared-hooks/useShowAppSwitcherOnFocus';
import { useToast } from '../../../common/shared-hooks/useToast';
import { useSessionStore } from '../../../common/stores/useSessionStore';
import { useTopTabStore } from '../../../common/stores/useTopTabStore';
import type { RootStackNavigationProp } from '../../../navigation/navigationTypes';
import { navigateToTopTabs } from '../../../navigation/rootNavigation';
import {
  WalletNotificationType,
  WalletSetupStatus,
  useClearPersistentNotificationMutation,
  useGetCurrentCardMetaQuery,
  useGetCurrentUserQuery,
  useGetEWalletAuAccountDetailsQuery,
  useGetEWalletUkAccountDetailsQuery,
  useGetIdvProfileV2Query,
  useGetOemProvisioningQuery,
  useGetPersistentNotificationsQuery,
  useGetUkAuthFactorsQuery,
  useGetWalletStatusQuery,
  useInfiniteGetWalletTransactionsV2Query,
  type CountryOfOrigin,
  type FinancialTransaction,
} from '../../../new-graphql/generated';
import { useRegionLocalisation } from '../../../providers/LocalisationProvider';
import { Region } from '../../../providers/LocalisationProvider/constants';
import { useDigitalWalletStore } from '../../card-management/digital-wallet/stores/useDigitalWalletStore';
import { AccountDetailsMenuItem } from '../components/AccountDetailsMenuItem';
import { AlertIssueBottomSheet } from '../components/AlertIssueBottomSheet';
import { PaymentFAB } from '../components/PaymentFAB';
import { SetupSpendAccountItem } from '../components/SetupSpendAccountItem';
import { StashEntryCard } from '../components/StashEntryCard';
import { TransactionsDrawer } from '../components/TransactionsDrawer';
import { useCheckCardByRegion } from '../hooks/useCheckCardByRegion';
import { useCheckShowStashEntryCard } from '../hooks/useCheckComponentVisibility';
import { useConditionalNavigateOnboardingFlow } from '../hooks/useConditionalNavigateOnboardingFlow';
import { useGetSpendAmount } from '../hooks/useGetSpendAmount';
import { useSplitTransactionsIntoSections } from '../hooks/useSplitTransactionsIntoSections';
import { useCheckIsOnboardingStore } from '../stores/useCheckIsOnboardingStore';
import { useShowCardInformationalAlertStore } from '../stores/useShowCardInformationalAlertStore';
import { isOnboardingDone } from '../utils/onboarding';
import { DEFAULT_TRANSACTION_PAGE_LIMIT } from '../utils/transaction';

const PAGE_LIMIT = DEFAULT_TRANSACTION_PAGE_LIMIT;

const DATE_TO_VALIDATE_VIEWING_TRANSACTION = 180;

export const SpendAccountDashboardScreen = () => {
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const selectedTab = useTopTabStore(state => state.selectedTab);
  useShowAppSwitcherOnFocus(navigation);
  const { space } = useTheme();
  const fabVisibilityRef = useRef<SelfHideShowHandler>(null);
  const { maxScrollPercentage, minSnapPoint, onLayoutEndPosition, onLayoutScreenHeight } = useGetMinSnapPoint();
  const { isAllDone, isError, isLoading, nextScreenNavigateParams } = useConditionalNavigateOnboardingFlow()();
  const { data: walletData, isLoading: isWalletLoading, refetch: refetchWalletStatus } = useGetWalletStatusQuery();
  const { data: userData, isLoading: isUserLoading } = useGetCurrentUserQuery();
  const userID = useSessionStore(state => state.currentUser?.userID) ?? '';
  const walletStatus = walletData?.me?.wallet?.details.setupStatus?.status;
  const isEWalletSetup = walletStatus === WalletSetupStatus.Completed;
  const isWalletSetupInProgress = walletStatus === WalletSetupStatus.InProgress;
  const isAccountUK = useIsAccountUK();
  const { data: authFactorsData, isLoading: isAuhFactorsLoading } = useGetUkAuthFactorsQuery(
    {},
    {
      enabled: isAccountUK && isWalletSetupInProgress,
    }
  );

  const { setShowCardInformationalAlert, showCardInformationalAlert } = useShowCardInformationalAlertStore();
  const { currentRegion, isCardLoading, isCardNotFound, isFetching, isServerDown } = useCheckCardByRegion();
  const {
    data: idvProfileData,
    isLoading: isIdVerificationLoading,
    refetch: refetchIDVStatus,
  } = useGetIdvProfileV2Query({
    country: currentRegion as CountryOfOrigin,
  });

  const [refreshing, setRefreshing] = useState(false);
  const getDigitalWalletStatus = useDigitalWalletStore(state => state.getDigitalWalletStatus);
  const { isInOboardingFlow } = useCheckIsOnboardingStore();

  const isSetupWalletLoading =
    isUserLoading || isIdVerificationLoading || isCardLoading || isFetching || isAuhFactorsLoading || isWalletLoading;

  const onboardingDone = isOnboardingDone(walletData, isCardNotFound);
  const shouldShowFAB = onboardingDone;
  const shouldShowStashEntryCard = useCheckShowStashEntryCard(onboardingDone);
  const shouldLoadStashes = (shouldShowFAB && !isAccountUK) ?? false;
  const setRequirePasscode = usePasscodeStore(state => state.setRequirePasscode);
  const [allowToLoadNextTrans, setAllowToLoadNextTrans] = useState(true);
  const toast = useToast();
  const { formatMessage } = useRegionLocalisation();

  const { availableAmount, currency } = useGetSpendAmount({
    shouldLoadStashes,
  });

  useRefreshOnFocus(refetchIDVStatus);
  useRefreshOnFocus(refetchWalletStatus);

  useGetOemProvisioningQuery(undefined, {
    onSuccess: data => {
      const oemData = data.me?.wallet?.card?.oemProvisioning;
      if (oemData) {
        const base64HolderName = Base64.stringify(Utf8.parse(oemData.cardHolderName));
        const cardParamaters = MppCardDataParameters.withCardSecret(
          `${oemData.cardToken}#${oemData.expiryDate}#${base64HolderName}`,
          `001#${oemData.otp}`
        );
        getDigitalWalletStatus(cardParamaters);
      }
    },
    enabled: !isAccountUK,
  });

  useCheckUkDeviceEnrollment({
    enabled: isEWalletSetup && isAccountUK,
    onSuccess: state => {
      if (state === 'ENROLLED' || state === 'UNKNOWN') {
        return;
      }

      navigation.navigate('OnboardingStack', { screen: 'UkBiometricReEnrollment' });
    },
  });

  const { data: persistentNotifications } = useGetPersistentNotificationsQuery();

  const showApplePayReminder = persistentNotifications?.me?.wallet?.persistentNotifications?.find(
    notification => notification?.type === WalletNotificationType.ApplePayReminder_24Hrs
  );

  const showGooglePayReminder = persistentNotifications?.me?.wallet?.persistentNotifications?.find(
    notification => notification?.type === WalletNotificationType.GooglePay_24HrsPartialProvisioning
  );

  const clearApplePayPersistentNotification = useClearPersistentNotificationMutation();

  const hasTransactionOverXDays = (transactions: FinancialTransaction[] = []): boolean => {
    const currentDate = new Date();

    const xDaysAgo = new Date(currentDate.setDate(currentDate.getDate() - DATE_TO_VALIDATE_VIEWING_TRANSACTION));

    return transactions.some(x => new Date(x.dateTimeUTC) < new Date(xDaysAgo.toISOString()));
  };

  const {
    data: transactions,
    fetchNextPage,
    hasNextPage,
    isFetching: isTransactionsFetching,
    isFetchingNextPage,
  } = useInfiniteGetWalletTransactionsV2Query(
    { limit: PAGE_LIMIT, offset: 0, country: currentRegion as CountryOfOrigin },
    {
      enabled: isEWalletSetup,
      keepPreviousData: true,
      getNextPageParam: (lastPage, allPages) => {
        const totalLocal = (allPages.length ?? 0) * (PAGE_LIMIT ?? 1);
        const lastPageTransactions = lastPage.me?.wallet?.transactions?.length ?? 0;
        if (lastPageTransactions < PAGE_LIMIT) {
          return undefined;
        }
        return { limit: PAGE_LIMIT, offset: totalLocal };
      },
      onSuccess: data => {
        const lastPageTransactions = data.pages[data.pages.length - 1].me?.wallet?.transactions?.filter(
          x => x !== null
        );
        if (isAccountUK && hasTransactionOverXDays(lastPageTransactions as FinancialTransaction[])) {
          setRequirePasscode(
            true,
            () => setAllowToLoadNextTrans(true),
            () => {
              toast.show({
                intent: 'warning',
                content: formatMessage({ id: 'spend-account.transactions.warning.180days' }),
              });
              setAllowToLoadNextTrans(false);
            }
          );
        }
      },
    }
  );

  const getAvailableTransactions = () => {
    if (!isAccountUK || allowToLoadNextTrans) {
      return (transactions?.pages?.flatMap(page => page.me?.wallet?.transactions) as FinancialTransaction[]) || [];
    }

    const allPagesExceptLast = transactions?.pages.slice(0, -1);

    const transactionsExceptLast = allPagesExceptLast?.flatMap(
      page => page.me?.wallet?.transactions
    ) as FinancialTransaction[];

    return transactionsExceptLast ?? [];
  };

  const { sections } = useSplitTransactionsIntoSections({
    transactions: getAvailableTransactions(),
  });

  const loadMoreTransactions = () => {
    if (hasNextPage && allowToLoadNextTrans) {
      fetchNextPage();
    }
  };

  const onDrawerChange = (index: number) => {
    if (index === 1) {
      fabVisibilityRef.current?.hide();
    } else {
      fabVisibilityRef.current?.show();
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      queryClient.invalidateQueries([
        'GetWalletTransactionsV2.infinite',
        { limit: PAGE_LIMIT, offset: 0, country: currentRegion },
      ]),
      currentRegion === Region.au
        ? queryClient.invalidateQueries(useGetEWalletAuAccountDetailsQuery.getKey())
        : queryClient.invalidateQueries(useGetEWalletUkAccountDetailsQuery.getKey()),
      queryClient.invalidateQueries(useGetCurrentCardMetaQuery.getKey()),
      queryClient.invalidateQueries(useGetIdvProfileV2Query.getKey({ country: currentRegion as CountryOfOrigin })),
    ]).finally(() => setRefreshing(false));
  };

  const onContinueSettingUpWallet = () => {
    if (!nextScreenNavigateParams) {
      return;
    }
    navigation.navigate(...nextScreenNavigateParams);
  };

  const onClearDigitalWalletPersitentNotification = () => {
    clearApplePayPersistentNotification.mutate({
      type:
        Platform.OS === 'ios'
          ? WalletNotificationType.ApplePayReminder_24Hrs
          : WalletNotificationType.GooglePay_24HrsPartialProvisioning,
    });
  };

  const onFinishSettingUpDigitalWallet = () => {
    navigation.navigate('DigitalWalletStack', { screen: 'DigitalWalletSetup', params: { isOnboarding: true } });
  };

  const renderContinueSettingUpWallet = () => {
    if (!onboardingDone || isAllDone || isError || isAccountUK) {
      return null;
    }

    return (
      <Box marginTop="medium">
        <List.Item
          disabled={isLoading}
          testID="Continue setting up your Spend account"
          variant="card"
          title={<Typography.Body variant="regular">Continue setting up your Spend account</Typography.Body>}
          onPress={isLoading ? undefined : onContinueSettingUpWallet}
          suffix={<Icon icon="arrow-right" intent="primary" />}
        />
        {isLoading && (
          <Box borderRadius="medium" backgroundColor="defaultGlobalSurface" style={StyleSheet.absoluteFill}>
            <Spinner accessibilityLabel="spinner" size="small" />
          </Box>
        )}
      </Box>
    );
  };

  const renderDigitalWalletReminder = () => {
    if (showApplePayReminder || showGooglePayReminder) {
      const label = `Finish setting up ${Platform.OS === 'ios' ? 'Apple' : 'Google'} Pay.`;

      return (
        <Box marginTop="medium">
          <Alert
            intent="notification"
            content={
              <Pressable onPress={onFinishSettingUpDigitalWallet} accessibilityLabel={label}>
                <Box flexDirection="row" alignItems="center">
                  <Icon icon="add-credit-card-outlined" />
                  <Box marginLeft="smallMedium" flex={1}>
                    <Typography.Body variant="regular">{label}</Typography.Body>
                    <Typography.Caption style={{ marginTop: space.xsmall }}>
                      The easy and secure way to pay.
                    </Typography.Caption>
                  </Box>
                </Box>
              </Pressable>
            }
            onClose={onClearDigitalWalletPersitentNotification}
            testID="finish-setting-up-digital-wallet"
          />
        </Box>
      );
    }

    return null;
  };

  const renderPaymentFAB = () => {
    switch (currentRegion) {
      case Region.gb:
        return <PaymentFAB shouldLoadStashes={false} />;
      default:
        return <PaymentFAB shouldLoadStashes shouldLoadScheduledPayment />;
    }
  };

  const shouldTransactionsDrawerVisible = onboardingDone;

  if (isServerDown) {
    return <GeneralError themeName="wallet" image={images.iceCream} />;
  }

  return (
    <>
      <Box flex={1} onLayout={onLayoutScreenHeight}>
        <ScrollView
          style={{ maxHeight: shouldTransactionsDrawerVisible ? `${maxScrollPercentage}%` : '100%' }}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          accessibilityLabel="Pull to refresh"
          testID="refreshControl"
        >
          <SetupSpendAccountItem
            eWalletSetupStatus={walletStatus}
            ukAuthFactors={authFactorsData?.me?.wallet?.ukAuthFactors}
            availableBalance={availableAmount}
            idvProfileData={idvProfileData?.me?.wallet?.IDVProfile}
            isLoading={isSetupWalletLoading}
            isCardFound={!isCardNotFound}
            currency={currency ?? 'AUD'}
          />
          <Box paddingHorizontal="medium">
            {renderDigitalWalletReminder()}
            {showCardInformationalAlert[userID] && (
              <Alert
                content={
                  <TouchableOpacity
                    onPress={() => {
                      navigateToTopTabs('card-tab');
                      setShowCardInformationalAlert(userID, false);
                    }}
                  >
                    <Typography.Body variant="small">You can access your card settings in the Card tab</Typography.Body>
                  </TouchableOpacity>
                }
                variant="rounded"
                onClose={() => setShowCardInformationalAlert(userID, false)}
                style={{ marginTop: space.large, marginBottom: space.small }}
              />
            )}
            {renderContinueSettingUpWallet()}
            {onboardingDone && (
              <Box marginTop="medium">
                <AccountDetailsMenuItem userDetails={userData} />
              </Box>
            )}
            {shouldShowStashEntryCard && (
              <StashEntryCard
                onContinue={() => {
                  navigateToTopTabs('stash-tab');
                  navigation.navigate('StashStack', { screen: 'StashIntroduction' });
                }}
              />
            )}
          </Box>
          <Box
            // fake last element
            style={{ width: 10, height: 10 }}
            onLayout={onLayoutEndPosition}
          />
        </ScrollView>

        {shouldTransactionsDrawerVisible && (
          <TransactionsDrawer
            snapPoints={[minSnapPoint, '100%']}
            sections={sections}
            isFetching={isTransactionsFetching}
            isFetchingNextPage={isFetchingNextPage}
            onEndReached={loadMoreTransactions}
            onChange={onDrawerChange}
          />
        )}
      </Box>
      {shouldShowFAB && <SelfHideShowComp ref={fabVisibilityRef}>{renderPaymentFAB()}</SelfHideShowComp>}
      {onboardingDone && selectedTab === 'spend-tab' && !isInOboardingFlow && <AlertIssueBottomSheet />}
    </>
  );
};
