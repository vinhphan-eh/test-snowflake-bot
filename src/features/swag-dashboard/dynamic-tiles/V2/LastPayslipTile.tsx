import React from 'react';
import { type ViewStyle, type StyleProp, TouchableOpacity } from 'react-native';
import { Box, Button, Typography, useTheme } from '@hero-design/rn';
import { CurrencyText } from '../../../../common/components/currency-text/CurrencyText';
import type { SupportedCurrency } from '../../../../common/utils/numbers';
import ThemeSwitcher from '../../../../common/utils/ThemeSwitcher';
import { useIntl } from '../../../../providers/LocalisationProvider';

type LastPayslipTileProps = {
  style?: StyleProp<ViewStyle>;
  currencyCode: SupportedCurrency;
  lastPayDate: string;
  amount: number;
  onPress: () => void;
  onIconPress: () => void;
  showValue: boolean;
};

export const TileComponent = ({
  amount,
  currencyCode,
  lastPayDate,
  onIconPress,
  onPress,
  showValue,
  style,
}: LastPayslipTileProps) => {
  const { colors, radii, space } = useTheme();
  const { formatMessage } = useIntl();

  return (
    <TouchableOpacity
      testID="last-payslip-tile"
      onPress={onPress}
      style={[
        {
          backgroundColor: colors.neutralGlobalSurface,
          flexDirection: 'row',
          paddingHorizontal: space.medium,
          paddingVertical: space.small,
          borderRadius: radii.xlarge,
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        style,
      ]}
    >
      <Box>
        <Typography.Body
          accessibilityLabel={formatMessage({ id: 'dynamicTiles.lastPaySlip.title' })}
          style={{ marginBottom: space.xsmall }}
          typeface="playful"
          variant="regular-bold"
        >
          {formatMessage({ id: 'dynamicTiles.lastPaySlip.title' })}
        </Typography.Body>
        <Typography.Caption intent="subdued" accessibilityLabel="last pay date">
          {lastPayDate}
        </Typography.Caption>
      </Box>
      <Box style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Box
          style={{
            borderRadius: 20,
            backgroundColor: colors.decorativePrimarySurface,
            paddingTop: !showValue ? space.small : undefined, // trick to move the asterisk to middle
            padding: space.xsmall,
            paddingHorizontal: space.small,
            marginRight: space.small,
            width: !showValue ? 100 : undefined,
          }}
        >
          <CurrencyText
            currency={currencyCode}
            amount={amount}
            renderCurrency={currency => (
              <Typography.Body variant="regular-bold">{showValue ? currency : '******'}</Typography.Body>
            )}
            renderDecimal={decimal => <Typography.Body variant="regular-bold">{showValue && decimal}</Typography.Body>}
          />
        </Box>
        <Button.Icon
          testID="last-payslip-tile-button-icon"
          icon={showValue ? 'eye-invisible-outlined' : 'eye-outlined'}
          size="small"
          style={{ backgroundColor: '#f1f3f1', borderRadius: radii.rounded, padding: space.xsmall }}
          hitSlop={{ top: space.medium, bottom: space.medium, left: space.medium, right: space.medium }}
          onPress={onIconPress}
        />
      </Box>
    </TouchableOpacity>
  );
};

export const LastPayslipTile = (props: LastPayslipTileProps) => (
  <ThemeSwitcher name="work">
    <TileComponent {...props} />
  </ThemeSwitcher>
);
