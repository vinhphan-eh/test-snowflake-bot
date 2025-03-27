import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Pressable } from 'react-native';
import { Icon, Typography, useTheme } from '@hero-design/rn';
import type { IconProps } from '@hero-design/rn/types/components/Icon';

type PillCompProps = {
  icon: IconProps['icon'];
  label: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  testID?: string;
  accessibilityLabel?: string;
  isSelected?: boolean;
};

export const PillComp = ({
  accessibilityLabel,
  icon,
  isSelected = false,
  label,
  onPress,
  style,
  testID,
}: PillCompProps) => {
  const { colors, radii, shadows, space } = useTheme();
  const testIdWithSelection = isSelected ? `${testID}-selected` : testID;

  return (
    <Pressable
      testID={testIdWithSelection}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [
        {
          paddingHorizontal: space.smallMedium,
          paddingVertical: space.small,
          backgroundColor: pressed || isSelected ? colors.decorativePrimarySurface : colors.defaultGlobalSurface,
          flexDirection: 'row',
          borderRadius: radii['5xlarge'],
        },
        shadows.default,
        style,
      ]}
    >
      <Icon testID={icon} style={{ marginRight: space.xsmall }} size="small" icon={icon} />
      <Typography.Body variant="small">{label}</Typography.Body>
    </Pressable>
  );
};
