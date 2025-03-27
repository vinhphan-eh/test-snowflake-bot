import React from 'react';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';
import type { IconButtonProps } from '@hero-design/rn/types/components/Button/IconButton';
import type { IconProps } from '@hero-design/rn/types/components/Icon';
import type { FontSizes } from '@hero-design/rn/types/theme/global/typography';
import { createCurrencyFormatter } from '../../../../common/utils/numbers';

type HeroPointsPriceProps = {
  price: number;
  fontSize?: keyof FontSizes;
  iconIntent?: IconButtonProps['intent'];
  iconSize?: IconProps['size'];
  hideStarIcon?: boolean;
};

export const HeroPointsPrice = ({
  fontSize = 'small',
  hideStarIcon,
  iconIntent = 'secondary',
  iconSize = 'small',
  price,
}: HeroPointsPriceProps) => {
  const { fontSizes, lineHeights, space } = useTheme();
  const formatCurrency = createCurrencyFormatter();

  return (
    <Box style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      {!hideStarIcon && (
        <Icon icon="star-circle-outlined" accessibilityLabel="hero points icon" intent={iconIntent} size={iconSize} />
      )}
      <Typography.Body
        intent="primary"
        variant="regular-bold"
        style={{
          marginLeft: space.xsmall,
          fontSize: fontSizes[fontSize],
          lineHeight: lineHeights[fontSize],
        }}
      >
        {formatCurrency(price, { currency: 'POINTS' })}
      </Typography.Body>
    </Box>
  );
};
