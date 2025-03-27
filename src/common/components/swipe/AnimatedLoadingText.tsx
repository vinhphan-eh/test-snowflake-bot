import type { ComponentProps } from 'react';
import React from 'react';
import type { ViewStyle } from 'react-native';
import { Platform } from 'react-native';
import { Typography, Box } from '@hero-design/rn';
import type { AnimateStyle } from 'react-native-reanimated';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';

type TypographyProp = ComponentProps<typeof Typography.Title>;

type AnimatedSingleTextProps = {
  startTime: number;
  style?: AnimateStyle<ViewStyle>;
  duration: number;
} & TypographyProp;

const AnimatedSingleText = ({
  children,
  duration,
  startTime = 0,
  style = {},
  ...textProps
}: AnimatedSingleTextProps) => {
  const translateY = useSharedValue(0);

  if (translateY.value === 0 && startTime > 0 && duration !== 0) {
    translateY.value = withDelay(
      startTime,
      withRepeat(
        withTiming(-8, {
          duration,
        }),
        0,
        true
      )
    );
  }

  // FIXME: ts issue `Type { translateX: number; }[] is not assignable to type never[]`
  // Happen when upgrading RN from 0.69 to 0.71
  // This can related to current version of @types/react, which is still 17
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View style={[animatedStyle, style]}>
      <Typography.Title level="h5" {...textProps}>
        {children}
      </Typography.Title>
    </Animated.View>
  );
};

type AnimatedLoadingTextProps = {
  text: string;
  speed?: number;
  loadingTextStyle?: Omit<TypographyProp, 'children' | 'style'>;
} & ComponentProps<typeof Box>;

const isEqual = (prevProps: AnimatedLoadingTextProps, nextProps: AnimatedLoadingTextProps) => {
  return prevProps.text === nextProps.text;
};

export const AnimatedLoadingText = React.memo(
  ({ loadingTextStyle = {}, speed = 100, text, ...boxProps }: AnimatedLoadingTextProps) => {
    const renderText = () => {
      if (text?.length > 0) {
        return text.split('').map((char, index) => {
          const position = index + 1;
          const duration = text.length * speed;
          return (
            <AnimatedSingleText
              duration={Platform.OS === 'android' ? 0 : duration}
              startTime={position * 80}
              key={`${char}${position}`}
              {...loadingTextStyle}
            >
              {char}
            </AnimatedSingleText>
          );
        });
      }
      return null;
    };
    return (
      <Box flexDirection="row" {...boxProps}>
        {renderText()}
      </Box>
    );
  },
  isEqual
);
