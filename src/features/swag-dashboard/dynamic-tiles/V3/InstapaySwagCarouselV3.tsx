// #region
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { useTheme, Box } from '@hero-design/rn';
import { InstaPayNowSwagTileV3 } from './InstapayNowSwagTileV3';
import { InstapayRecurringSwagTile } from './InstapayRecurringSwagTile';
import { InstapaySwagCarouselSkeletonV3 } from './skeletons/InstapaySwagCarouselSkeletonV3';
import { useMoneyPillarPermission } from '../../../../common/hooks/useEbfPillarPermission';
import { useIncomeVisibility } from '../../../../common/hooks/useIncomeVisibility';
import { InstapayTestimonialCard } from '../../../income/instapay/components/InstapayTestimonialCard';
import { useEstInstaPayNowBalances } from '../../../income/instapay/hooks/useEstInstaPayNowBalances';
import { useInstapayABTestDashboard } from '../../../income/instapay/hooks/useInstapayABTestDashboard';

// #endregion

interface InstapaySwagCarouselV3Props {
  style?: StyleProp<ViewStyle>;
}

export const InstapaySwagCarouselV3 = ({ style }: InstapaySwagCarouselV3Props) => {
  const { space } = useTheme();
  const { showTestimonialCard } = useInstapayABTestDashboard();
  const { instapayNowUnderMaintenance, instaPayScheduling, isError, isLoading, showInstapay } = useIncomeVisibility();
  // trigger the est balance here to reduce loading time for the InstapayNowSwagTile
  // this is to prevent the loading of est balance when the visibility checking is done
  useEstInstaPayNowBalances();
  const { permission: moneyPillarAccess } = useMoneyPillarPermission();

  if (isError || !showInstapay || !moneyPillarAccess) {
    return null;
  }

  if (isLoading) {
    return (
      <InstapaySwagCarouselSkeletonV3 testID="instapay-swag-carousel-skeleton" style={{ marginTop: space.small }} />
    );
  }

  return (
    <Box testID="instapay-swag-container" flexDirection="row" justifyContent="space-between" style={style}>
      {showTestimonialCard ? (
        <InstapayTestimonialCard />
      ) : (
        <InstaPayNowSwagTileV3 underMaintenance={instapayNowUnderMaintenance} style={{ marginRight: space.small }} />
      )}
      {instaPayScheduling?.isEligible && <InstapayRecurringSwagTile />}
    </Box>
  );
};
