import React from 'react';
import type { StatusBarStyle } from 'react-native';
import { StatusBar } from 'react-native';
import { Box, useTheme } from '@hero-design/rn';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type CustomStatusBarProps = {
  backgroundColor?: string;
  nativeBarStyle?: StatusBarStyle;
  barStyle?: 'default' | 'decorative';
};

// Remove SafeAreaView and use useSafeAreaInsets, due to 0.72 RN issue: https://github.com/th3rdwave/react-native-safe-area-context/issues/448
export const CustomStatusBar = ({
  backgroundColor,
  barStyle = 'default',
  nativeBarStyle = 'dark-content',
}: CustomStatusBarProps) => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const defaultBgColor = barStyle === 'default' ? colors.defaultSurface : colors.decorativePrimarySurface;
  const bgColor = backgroundColor ?? defaultBgColor;

  return (
    <Box
      style={{ backgroundColor: bgColor, paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right }}
      testID="custom-status-bar"
    >
      <StatusBar backgroundColor={bgColor} barStyle={nativeBarStyle} />
    </Box>
  );
};
