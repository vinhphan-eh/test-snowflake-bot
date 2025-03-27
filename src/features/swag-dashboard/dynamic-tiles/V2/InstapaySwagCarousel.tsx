import type { PropsWithChildren } from 'react';
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import { InstaPayNowSwagTile } from './InstapayNowSwagTile';
import { InstapaySwagCarouselSkeleton } from './skeletons/InstapaySwagCarouselSkeleton';
import { useMoneyPillarPermission } from '../../../../common/hooks/useEbfPillarPermission';
import { useIncomeVisibility } from '../../../../common/hooks/useIncomeVisibility';
import { useIsAccountAU } from '../../../../common/hooks/useIsAccountAU';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useEstInstaPayNowBalances } from '../../../income/instapay/hooks/useEstInstaPayNowBalances';

// #region
const Title = ({ children }: PropsWithChildren<unknown>) => {
  const { space } = useTheme();
  return (
    <Typography.Title level="h5" typeface="playful" style={{ paddingLeft: space.medium, marginBottom: space.medium }}>
      {children}
    </Typography.Title>
  );
};

// #endregion

interface InstapaySwagCarouselProps {
  style?: StyleProp<ViewStyle>;
}

export const InstapaySwagCarousel = ({ style }: InstapaySwagCarouselProps) => {
  const { formatMessage } = useIntl();
  const { space } = useTheme();
  const { instapayNowUnderMaintenance, isError, isLoading, showInstapay } = useIncomeVisibility();
  // trigger the est balance here to reduce loading time for the InstapayNowSwagTile
  // this is to prevent the loading of est balance when the visibility checking is done
  useEstInstaPayNowBalances();
  const { permission: moneyPillarAccess } = useMoneyPillarPermission();
  const isAUAccount = useIsAccountAU();

  if (isError || !showInstapay || !moneyPillarAccess || !isAUAccount) {
    return null;
  }

  if (isLoading) {
    return <InstapaySwagCarouselSkeleton />;
  }

  return (
    <Box style={[{ paddingHorizontal: space.medium }, style]}>
      <Title>{formatMessage({ id: 'dynamicTiles.instapayCarousel.title' })}</Title>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: space.medium }}
      >
        {showInstapay && (
          <InstaPayNowSwagTile style={{ marginRight: space.medium }} underMaintenance={instapayNowUnderMaintenance} />
        )}
      </ScrollView>
    </Box>
  );
};
