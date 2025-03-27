import React from 'react';
import { Pressable } from 'react-native';
import { Typography, useTheme } from '@hero-design/rn';

interface SignUpButtonProps {
  onPress: () => void;
  text: string;
  testID?: string;
}

export const SignUpButton = ({ onPress, testID, text }: SignUpButtonProps) => {
  const { colors, space } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: pressed ? colors.highlightedSurface : colors.defaultGlobalSurface,
        flexDirection: 'row',
        alignItems: 'center',
      })}
      testID={`${testID}`}
    >
      <Typography.Body variant="regular-bold" intent="primary" style={{ marginRight: space.small }}>
        {text}
      </Typography.Body>
    </Pressable>
  );
};
