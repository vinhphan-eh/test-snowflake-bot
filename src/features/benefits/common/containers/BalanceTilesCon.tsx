import React from 'react';
import { Box, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import type { RootStackNavigationProp } from '../../../../navigation/navigationTypes';
import { navigateToBenefitsTopTabs } from '../../../../navigation/rootNavigation';
import { LifeTimeCashbackBalanceCard } from '../../cash-back/containers/LifeTimeCashbackBalanceCard';
import { HeroPointsBalanceCard } from '../components/HeroPointsBalanceCard';
import { useBenefitsTracking } from '../hooks/useBenefitsTracking';
import { useBenefitsOrderStore } from '../screens/orders/stores/useBenefitsOrderStore';

export const BalanceTilesCon = () => {
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const { space } = useTheme();
  const setPendingChangeBenefitsOrdersTab = useBenefitsOrderStore(state => state.setPendingChangeBenefitsOrdersTab);
  const { trackClickOnHPTileHomePage, trackClickOnLifeTimeCashbackHomePage } = useBenefitsTracking();

  return (
    <Box testID="balance-tiles" flexDirection="row" marginHorizontal="medium">
      <LifeTimeCashbackBalanceCard
        testID="lifetime-cashback-balance"
        accessibilityLabel="Lifetime cashback balance"
        style={{ marginTop: space.small }}
        onPress={() => {
          navigateToBenefitsTopTabs('benefits-purchases');
          setPendingChangeBenefitsOrdersTab('cashback');
          trackClickOnLifeTimeCashbackHomePage();
        }}
      />
      <HeroPointsBalanceCard
        testID="hero-points-balance"
        accessibilityLabel="Hero points balance"
        style={{ marginTop: space.small }}
        onPress={() => {
          trackClickOnHPTileHomePage();
          navigation.navigate('BenefitsStack', {
            screen: 'GeneralSearchScreen',
            params: {
              defaultCategory: {
                code: 'giftcard',
                name: 'Gift cards',
              },
            },
          });
        }}
      />
    </Box>
  );
};
