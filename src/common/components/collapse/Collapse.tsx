import type { ReactElement } from 'react';
import React from 'react';
import { Box } from '@hero-design/rn';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useTiming } from '../../utils/animations';

type CollapseProps = {
  children?: ReactElement;
  open: boolean;
};

export const Collapse = ({ children, open }: CollapseProps) => {
  const progress = useTiming(open);
  const aHeight = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: progress.value * aHeight.value,
    };
  });

  return (
    <Animated.View testID="collapse_field" style={[{ overflow: 'hidden' }, animatedStyle]}>
      <Box
        // height should be a ridiculous number
        // so onLayout will work when it's hidden at mount
        style={{
          height: 1500,
        }}
      >
        <Box
          onLayout={({
            nativeEvent: {
              layout: { height: h },
            },
          }) => {
            aHeight.value = h;
          }}
        >
          {children}
        </Box>
      </Box>
    </Animated.View>
  );
};
