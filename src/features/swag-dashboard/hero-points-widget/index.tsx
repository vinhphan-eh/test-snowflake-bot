import React from 'react';
import { Pressable } from 'react-native';
import { Box, Spinner, Typography, useTheme } from '@hero-design/rn';

import { useGetSuperAppToken } from '../../../common/auth/store/useSuperAppTokenStore';
import { CurrencyText } from '../../../common/components/currency-text/CurrencyText';
import { useHeroPointsVisibility } from '../../../common/hooks/useHeroPointsVisibility';
import { useSessionStore } from '../../../common/stores/useSessionStore';
import { isEnabledForEh } from '../../../common/types/react-query';
import { navigateFromRoot, navigateToBenefitsTopTabs, workaroundNavigate } from '../../../navigation/rootNavigation';
import { useGetHeroPointsBalanceQuery } from '../../../new-graphql/generated';
import useTrackingDashboard from '../utils/useTrackingDashboard';

const HeroPoints = () => {
  const theme = useTheme();
  const orgId = useSessionStore(state => state.currentOrgId) ?? '';
  const { loginProvider, token } = useGetSuperAppToken('HeroPoints');
  const { data, isLoading } = useGetHeroPointsBalanceQuery(
    {
      orgId,
    },
    { enabled: !!orgId && isEnabledForEh(token, loginProvider), cacheTime: 0 }
  );
  const { trackingClickOnDashboardWidget } = useTrackingDashboard();

  const balance = data?.me?.heroPoints?.balance || 0;

  const onPress = () => {
    trackingClickOnDashboardWidget('HeroPoints');

    navigateToBenefitsTopTabs();

    workaroundNavigate(() => {
      navigateFromRoot('BenefitsStack', {
        screen: 'GeneralSearchScreen',
        params: {
          defaultCategory: {
            code: 'giftcard',
            name: 'Gift cards',
          },
        },
      });
    });
  };

  return (
    <Pressable testID="hero-points-widget" onPress={onPress}>
      <Box
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
        paddingHorizontal="medium"
        paddingVertical="xsmall"
        backgroundColor="primary"
        borderRadius="rounded"
        marginRight="small"
      >
        {isLoading ? (
          <Box style={{ height: theme.space.medium }}>
            <Spinner testID="spinner" size="small" intent="inverted" />
          </Box>
        ) : (
          <CurrencyText
            amount={balance}
            renderCurrency={amount => (
              <Typography.Caption intent="inverted" fontWeight="semi-bold">
                {amount}
              </Typography.Caption>
            )}
            renderDecimal={amount => (
              <Typography.Caption intent="inverted" fontWeight="semi-bold">
                {` ${amount}`}
              </Typography.Caption>
            )}
            currency="POINTS"
          />
        )}
      </Box>
    </Pressable>
  );
};

export const HeroPointsWidget = () => {
  const heroPointsPermission = useHeroPointsVisibility();

  if (!heroPointsPermission) {
    return null;
  }
  return <HeroPoints />;
};
