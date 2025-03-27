import React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '@hero-design/rn';
import { BalanceCard } from './BalanceCard';
import { BalanceCardSkeleton } from './skeletons/BalanceCardSkeleton';
import { useHeroPointsVisibility } from '../../../../common/hooks/useHeroPointsVisibility';
import { createCurrencyFormatter } from '../../../../common/utils/numbers';
import { useGetHeroPointsBalanceQuery } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useBenefitsTracking } from '../hooks/useBenefitsTracking';

type HeroPointsBalanceCardProps = {
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  testID?: string;
  accessibilityLabel?: string;
};

export const HeroPointsBalanceCard = ({ accessibilityLabel, onPress, style, testID }: HeroPointsBalanceCardProps) => {
  const Intl = useIntl();
  const { colors } = useTheme();
  const heroPointsPermission = useHeroPointsVisibility();
  const { trackClickOnHPTile } = useBenefitsTracking();
  const {
    data: transactionsRes,
    isError,
    isLoading,
  } = useGetHeroPointsBalanceQuery({}, { enabled: heroPointsPermission });
  const formatCurrency = createCurrencyFormatter();
  const balance = transactionsRes?.me?.heroPoints?.balance || 0;

  if (isLoading) {
    return <BalanceCardSkeleton testID={testID} />;
  }

  if (!heroPointsPermission || isError) {
    return null;
  }

  return (
    <BalanceCard
      balanceText={`${Intl.formatMessage({ id: 'benefits.heroPoints.balancePrefix' })} ${formatCurrency(balance, {
        currency: 'POINTS',
      })}`}
      icon="star-circle-outlined"
      onPress={
        onPress
          ? () => {
              trackClickOnHPTile();
              onPress();
            }
          : () => {}
      }
      style={[
        {
          backgroundColor: colors.decorativePrimarySurface,
        },
        style,
      ]}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    />
  );
};
