import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';
import type { IconProps } from '@hero-design/rn/types/components/Icon';

type RoundedCategoryProps = {
  icon: IconProps['icon'] | undefined;
  label: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  testID?: string;
  accessibilityLabel?: string;
  badgeIcon?: IconProps['icon'] | undefined;
};

export const RoundedCategory = ({
  accessibilityLabel,
  badgeIcon,
  icon,
  label,
  onPress,
  style,
  testID,
}: RoundedCategoryProps) => {
  const { shadows } = useTheme();

  if (!icon) {
    return null;
  }

  return (
    <TouchableOpacity
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={[{ alignItems: 'center' }, style]}
    >
      <Box
        marginBottom="smallMedium"
        backgroundColor="defaultGlobalSurface"
        borderRadius="rounded"
        style={[
          {
            width: 56,
            height: 56,
            alignItems: 'center',
            justifyContent: 'center',
          },
          shadows.default,
        ]}
      >
        {badgeIcon && (
          <Icon
            icon={badgeIcon}
            accessibilityLabel={`${accessibilityLabel} icon`}
            intent="secondary"
            size="xsmall"
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
            }}
            testID={badgeIcon}
          />
        )}
        <Icon testID={icon} icon={icon} />
      </Box>
      <Typography.Caption numberOfLines={2} style={{ maxWidth: 80, textAlign: 'center' }}>
        {label}
      </Typography.Caption>
    </TouchableOpacity>
  );
};
