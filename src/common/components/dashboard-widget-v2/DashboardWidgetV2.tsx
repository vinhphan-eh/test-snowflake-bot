import type { ReactNode } from 'react';
import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Pressable } from 'react-native';
import { Box, Icon, Tag, Typography, useTheme, type IconName } from '@hero-design/rn';
import type { BodyProps } from '@hero-design/rn/types/components/Typography/Body';

export interface DashboardWidgetV2Props {
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
  rightText?: ReactNode;
  rightIcon?: boolean;
  tagText?: string;
  style?: StyleProp<ViewStyle>;
  variant?: BodyProps['variant'];
  testID?: string;
}

export const DashboardWidgetV2 = ({
  accessibilityHint,
  accessibilityLabel,
  description,
  disabled,
  icon,
  onPress,
  rightIcon,
  rightText,
  style,
  tagText,
  testID,
  title,
  titleTypeFace = 'playful',
  variant,
}: DashboardWidgetV2Props) => {
  const { colors, radii, space } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        {
          borderRadius: radii.medium,
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
        <Box flexDirection="row" alignItems="center">
          {rightText}
          {rightIcon && <Icon icon="arrow-right" intent="primary" size="medium" style={{ marginLeft: space.small }} />}
        </Box>
      </Box>
      <Box flexDirection="row" alignItems="center" justifyContent={description ? 'space-between' : 'flex-end'}>
        {description ? <Typography.Caption intent="subdued">{description}</Typography.Caption> : null}
        {tagText && <Tag content={tagText} intent="success" />}
      </Box>
      {icon && <Icon icon={icon} size="xlarge" intent={disabled ? 'disabled-text' : undefined} />}
    </Pressable>
  );
};
