import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Pressable } from 'react-native';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';
import type { IconProps } from '@hero-design/rn/types/components/Icon';

export type BalanceCardProps = {
  balanceText: string;
  icon?: IconProps['icon'];
  testID?: string;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  onPress: () => void;
};

export const BalanceCard = ({ accessibilityLabel, balanceText, icon, onPress, style, testID }: BalanceCardProps) => {
  const { colors, radii, space } = useTheme();

  return (
    <Pressable testID={testID} onPress={onPress} accessibilityLabel={accessibilityLabel}>
      <Box
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: space.small,
            paddingVertical: space.xsmall,
            backgroundColor: colors.defaultGlobalSurface,
            borderRadius: radii.rounded,
            marginRight: space.small,
          },
          style,
        ]}
      >
        {icon && (
          <Icon
            icon={icon}
            accessibilityLabel={`${accessibilityLabel} icon`}
            intent="secondary"
            size="xsmall"
            style={{
              marginRight: space.xsmall,
            }}
            testID={icon}
          />
        )}
        <Typography.Caption fontWeight="semi-bold">{balanceText}</Typography.Caption>
      </Box>
    </Pressable>
  );
};
