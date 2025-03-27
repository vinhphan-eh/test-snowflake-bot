import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { Box, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { AmountCard } from './components/AmountCard';
import { BillSignup } from './components/BillSignup';
import { GeneralError } from '../../../../../common/components/error';
import { OverlayLoadingScreen } from '../../../../../common/components/spinner';
import type { RootStackNavigationProp } from '../../../../../navigation/navigationTypes';
import { navigateToTopTabs } from '../../../../../navigation/rootNavigation';
import { useGetSubscriptionsQuery } from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { BillStatusesTile } from '../../../bill-streaming/components/bill-statuses-tile';
import { GoToBillMoney } from '../../../bill-streaming/containers/GoToBillMoney';
import { useBenefitsBillMgmtTracking } from '../../../bill-streaming/hooks/useBenefitsBillMgmtTracking';

export const BillsTab = () => {
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const { formatMessage } = useIntl();

  const { colors, space } = useTheme();

  const { trackClickGoBackToBill } = useBenefitsBillMgmtTracking();

  const onClickENGIESignUp = () => {
    navigation.navigate('BenefitsStack', {
      screen: 'BillStreamStack',
      params: {
        screen: 'BillOfferDetailScreen',
        params: {
          offerId: '1',
          onBackToBill: () => {
            navigateToTopTabs('bill-management');
          },
        },
      },
    });
  };

  const onRenew = (signUpLink: string, providerName: string) => {
    navigation.navigate('BenefitsStack', {
      screen: 'BillStreamStack',
      params: {
        screen: 'BillSignUpWebView',
        params: {
          url: signUpLink,
          onBackToBill: () => {
            trackClickGoBackToBill(providerName ?? '');
            navigateToTopTabs('bill-management');
          },
        },
      },
    });
  };

  const {
    data: getSubScriptionResponse,
    isError: isSubscriptionQueryError,
    isLoading: isSubscriptionQueryLoading,
  } = useGetSubscriptionsQuery({
    input: {
      first: 20,
    },
  });

  const listData = useMemo(
    () => getSubScriptionResponse?.me?.billManagement?.subscriptions?.edges ?? [],
    [getSubScriptionResponse?.me?.billManagement?.subscriptions?.edges]
  );

  const subscriptions = useMemo(() => listData.map(e => e.node), [listData]);
  const totalSavedAllBills: number = useMemo(
    () => subscriptions.reduce((acc, subscription) => acc + subscription.totalSaved.amount, 0),
    [subscriptions]
  );

  if (isSubscriptionQueryError) {
    return <GeneralError testID="bill_streaming_dashboard_error" themeName="eBens" />;
  }

  const renderWidgets = () => {
    const isHavingActiveSubscription = listData.some(e => e.node.status === 'ACTIVE');

    if (isHavingActiveSubscription) {
      return (
        <>
          <AmountCard
            amount={totalSavedAllBills}
            title={formatMessage({ id: 'benefits.bill.totalSaved' })}
            subtitle={formatMessage({ id: 'benefits.bill.onAllBills' })}
            titleIntent="success"
            style={{ flex: 1 }}
          />
          <Box style={{ flex: 1 }} />
        </>
      );
    }

    return (
      <>
        <BillSignup onPress={onClickENGIESignUp} />
        <AmountCard
          amount={totalSavedAllBills}
          title={formatMessage({ id: 'benefits.bill.totalSaved' })}
          subtitle={formatMessage({ id: 'benefits.bill.onAllBills' })}
          titleIntent="success"
          style={{ flex: 1, marginLeft: space.medium }}
        />
      </>
    );
  };

  return (
    <ScrollView testID="bills-tab-scrollview" style={{ backgroundColor: colors.neutralGlobalSurface }}>
      <Box
        backgroundColor="neutralGlobalSurface"
        flex={1}
        paddingBottom="xxxlarge"
        paddingHorizontal="medium"
        paddingTop="large"
      >
        <Box flexDirection="row">{renderWidgets()}</Box>
        <GoToBillMoney />
        <BillStatusesTile
          subscriptions={subscriptions}
          onClickRenew={onRenew}
          style={{
            marginTop: space.large,
          }}
        />
        {isSubscriptionQueryLoading && <OverlayLoadingScreen />}
      </Box>
    </ScrollView>
  );
};
