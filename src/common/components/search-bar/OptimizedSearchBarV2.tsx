import React from 'react';
import { Box, Typography, useTheme } from '@hero-design/rn';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import type { SearchBarProps } from './OptimizedSearchBar';
import OptimizedSearchBar from './OptimizedSearchBar';
import { getEnvConfig } from '../../utils/env';

export const OptimizedSearchBarV2 = (props: SearchBarProps) => {
  const { space } = useTheme();
  const isPlaceHolderVisible = useSharedValue(props.defaultValue ? 0 : 1);

  // self made placeholder because TextInput placeholder behaves differently on Android and iOS
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: isPlaceHolderVisible.value ? 1 : 0,
      position: 'absolute',
      left: space.medium,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
    };
  });

  return (
    <Box flexGrow={1} pointerEvents="box-none">
      <OptimizedSearchBar
        {...props}
        placeholder=""
        onChange={text => {
          const newVisibleValue = text.length === 0 ? 1 : 0;
          if (newVisibleValue !== isPlaceHolderVisible.value) {
            isPlaceHolderVisible.value = newVisibleValue;
          }
          props.onChange?.(text);
        }}
      />

      {getEnvConfig().IS_E2E !== 'true' && (
        <Animated.View pointerEvents="none" style={animatedStyle}>
          <Typography.Body intent="subdued">{props.placeholder}</Typography.Body>
        </Animated.View>
      )}
    </Box>
  );
};
