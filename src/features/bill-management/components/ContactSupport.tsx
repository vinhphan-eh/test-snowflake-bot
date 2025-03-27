import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Pressable } from 'react-native';
import { Icon, Typography, useTheme } from '@hero-design/rn';

type ContactSupportProps = {
  text: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
};

export const ContactSupport = ({ onPress, style, text }: ContactSupportProps) => {
  const { colors, radii, space } = useTheme();
  return (
    <Pressable
      style={({ pressed }) => [
        {
          borderRadius: radii.xlarge,
          backgroundColor: pressed ? colors.decorativePrimarySurface : colors.defaultGlobalSurface,
          padding: space.medium,
          justifyContent: 'space-between',
        },
        style,
      ]}
      onPress={onPress}
    >
      <Typography.Title level="h5" typeface="playful">
        {text}
      </Typography.Title>
      <Icon style={{ marginTop: space.small }} icon="mail-outlined" />
    </Pressable>
  );
};
