import React from 'react';
import { Box, Icon, Slider, Typography, useTheme } from '@hero-design/rn';
import { createCurrencyFormatter } from '../../../../../common/utils/numbers';
import { useIntl } from '../../../../../providers/LocalisationProvider';

type HeroPointsSliderProps = {
  maxPoints: number;
  onSelectedPointChange: (points: number) => void;
  selectedPoints: number;
};

export const HeroPointsSlider = ({ maxPoints, onSelectedPointChange, selectedPoints }: HeroPointsSliderProps) => {
  const { space } = useTheme();
  const { formatMessage } = useIntl();
  const formatCurrency = createCurrencyFormatter();

  return (
    <Box
      bgColor="defaultGlobalSurface"
      borderRadius="large"
      marginTop="medium"
      padding="medium"
      testID="hero-points-slider"
    >
      <Box flexDirection="row">
        <Typography.Body variant="regular-bold" typeface="playful" style={{ flex: 1 }}>
          {formatMessage({ id: 'benefits.swagStore.payment.heroPointsTitle' })}
        </Typography.Body>
        <Icon icon="star-circle-outlined" intent="primary" />
      </Box>
      <Box flexDirection="row" alignItems="center" marginTop="small">
        <Box flex={1}>
          <Slider
            testID="hero-point-slider"
            step={1}
            value={selectedPoints}
            maximumValue={maxPoints}
            onSlidingComplete={onSelectedPointChange}
          />
        </Box>
        <Typography.Body
          variant="regular-bold"
          style={{
            marginLeft: space.xsmall,
          }}
        >
          {formatCurrency(selectedPoints, { currency: 'POINTS' })}
        </Typography.Body>
      </Box>
    </Box>
  );
};
