import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Dashboard } from '@ehrocks/rn-swag-ui';
import { Box, scale, Spinner, Typography, useTheme } from '@hero-design/rn';
import { CurrencyText } from '../../../../common/components/currency-text/CurrencyText';
import { getDefaultCurrency } from '../../../../common/utils/currency';
import ThemeSwitcher from '../../../../common/utils/ThemeSwitcher';
import { useInstaPayDrawdownStore } from '../../../income/instapay/stores/useInstaPayDrawdownStore';

interface TileProps {
  testID?: string;
  permission?: boolean;
  loading?: boolean;
  title?: string;
  value?: number;
  subtitle?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  renderIcon?: () => React.ReactNode;
}

const Tile = ({ loading, onPress, permission, renderIcon, style, subtitle, testID, title, value }: TileProps) => {
  const theme = useTheme();
  const memberWorkCountry = useInstaPayDrawdownStore(state => state.workCountry);
  const currency = getDefaultCurrency(memberWorkCountry);

  if (!permission) {
    return null;
  }

  return (
    <ThemeSwitcher name="wallet">
      <Dashboard.WidgetCard
        testID={testID}
        style={[
          {
            height: scale(160),
            width: scale(134),
            padding: theme.space.smallMedium,
            marginLeft: theme.space.smallMedium,
            backgroundColor: theme.colors.neutralGlobalSurface,
          },
          style,
        ]}
        onPress={onPress}
        variant="half-width"
      >
        {renderIcon && (
          <Box
            style={{
              alignItems: 'flex-end',
              height: theme.sizes.xxxlarge,
            }}
          >
            {renderIcon()}
          </Box>
        )}

        {loading ? (
          <Box style={{ height: theme.space.medium, alignSelf: 'center' }}>
            <Spinner testID="spinner" size="small" intent="primary" />
          </Box>
        ) : (
          <Box flexGrow={1} justifyContent="flex-end">
            {value ? (
              <>
                {!!title && (
                  <Box>
                    <Typography.Caption intent="primary">{title}</Typography.Caption>
                  </Box>
                )}

                <Box
                  style={{
                    marginVertical: theme.space.small,
                  }}
                >
                  <CurrencyText
                    amount={value}
                    currency={currency}
                    renderCurrency={amount => (
                      <Typography.Title intent="primary" level="h3" typeface="playful">
                        {amount}
                      </Typography.Title>
                    )}
                    renderDecimal={amount => (
                      <Typography.Body intent="primary" variant="regular-bold" typeface="playful">
                        {amount}
                      </Typography.Body>
                    )}
                  />
                </Box>
              </>
            ) : (
              !!title && (
                <Box>
                  <Typography.Title
                    intent="primary"
                    level="h5"
                    typeface="playful"
                    style={{ marginBottom: theme.space.small }}
                  >
                    {title}
                  </Typography.Title>
                </Box>
              )
            )}

            {!!subtitle && <Typography.Caption intent="primary">{subtitle}</Typography.Caption>}
          </Box>
        )}
      </Dashboard.WidgetCard>
    </ThemeSwitcher>
  );
};

export default Tile;
