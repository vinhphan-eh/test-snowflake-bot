import type { ReactNode } from 'react';
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Pressable } from 'react-native';
import type { IconName } from '@hero-design/rn';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';
import type { BodyProps } from '@hero-design/rn/types/components/Typography/Body';

export interface DashboardWidgetProps {
  title: string;
  onPress: () => void;
  description?: string | ReactNode;
  icon?: IconName;
  /**
   * Helps users understand what will happen when they perform an action on the accessibility element when that result is not clear from the accessibility label.
   */
  accessibilityHint?: string;
  /**
   * A succinct label in a localized string that identifies the accessibility element
   */
  accessibilityLabel?: string;
  disabled?: boolean;
  titleTypeFace?: BodyProps['typeface'];
  rightIcon?: boolean;
  style?: StyleProp<ViewStyle>;
  variant?: BodyProps['variant'];
  testID?: string;
}

export const DashboardWidget = ({
  accessibilityHint,
  accessibilityLabel,
  description,
  disabled,
  icon,
  onPress,
  rightIcon,
  style,
  testID,
  title,
  titleTypeFace = 'playful',
  variant,
}: DashboardWidgetProps) => {
  const { colors, radii, space } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        {
          borderRadius: radii.xlarge,
          backgroundColor: pressed ? colors.decorativePrimarySurface : colors.defaultGlobalSurface,
          height: 144,
          padding: space.medium,
          justifyContent: 'space-between',
        },
        style,
      ]}
      onPress={onPress}
      accessibilityHint={accessibilityHint}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between">
        <Typography.Body variant={variant} typeface={titleTypeFace}>
          {title}
        </Typography.Body>
        {rightIcon && <Icon icon="arrow-right" intent="primary" size="small" />}
      </Box>
      {description ? (
        <Typography.Body variant="small" intent="subdued">
          {description}
        </Typography.Body>
      ) : null}
      {icon && <Icon icon={icon} size="xlarge" intent={disabled ? 'disabled-text' : undefined} />}
    </Pressable>
  );
};
