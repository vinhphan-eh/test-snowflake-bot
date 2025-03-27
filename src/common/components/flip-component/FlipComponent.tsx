import React from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import type { AnimateStyle } from 'react-native-reanimated';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { useTiming } from '../../utils/animations';

export enum FlipSide {
  FRONT = 0,
  BACK = 1,
}

export enum RotateAxis {
  Y = 'Y',
  X = 'X',
}

const styles = StyleSheet.create({
  side: {
    position: 'absolute',
  },
});

type Props = {
  perspective?: number;
  side: FlipSide;
  rotate?: RotateAxis;
  style?: AnimateStyle<ViewStyle>;
  front: React.ReactElement;
  back: React.ReactElement;
};

const duration = 1000;

export const FlipComponent = ({ back, front, perspective = 1200, rotate = RotateAxis.Y, side, style }: Props) => {
  // opacity: 1 1 0 0
  const frontInput = side === FlipSide.FRONT ? [0, 0.4, 0.39, 1] : [0, 0.6, 0.61, 1];
  // opacity: 0 0 1 1
  const backInput = side === FlipSide.FRONT ? [0, 0.4, 0.41, 1] : [0, 0.61, 0.62, 1];

  const progress = useTiming(side, {
    duration,
  });
  const rotateValue = useDerivedValue(() => {
    const rotatePosition = interpolate(side, [0, 1], [0, 180], Extrapolate.CLAMP);
    return withTiming(rotatePosition, {
      duration,
      easing: Easing.bezier(0.54, -0.77, 0.46, 1.28),
    });
  });

  const rotationFlip = useDerivedValue(() => {
    if (rotate === RotateAxis.Y) {
      return {
        rotateY: `${rotateValue.value}deg`,
      };
    }

    return {
      rotateX: `${rotateValue.value}deg`,
    };
  }, [rotate, rotateValue]);

  const rotationFlipBack = useDerivedValue(() => {
    if (rotate === RotateAxis.Y) {
      return {
        rotateY: '180deg',
      };
    }

    return {
      rotateX: '180deg',
    };
  }, [rotate]);

  // FIXME: ts issue `Type { translateX: number; }[] is not assignable to type never[]`
  // Happen when upgrading RN from 0.69 to 0.71
  // This can related to current version of @types/react, which is still 17
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const animatedStyleFront = useAnimatedStyle(() => {
    const opacityFront = interpolate(progress.value, frontInput, [1, 1, 0, 0]);

    return {
      opacity: opacityFront,
      transform: [{ perspective }, rotationFlip.value],
    };
  }, [frontInput]);

  // FIXME: ts issue `Type { translateX: number; }[] is not assignable to type never[]`
  // Happen when upgrading RN from 0.69 to 0.71
  // This can related to current version of @types/react, which is still 17
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const animatedStyleBack = useAnimatedStyle(() => {
    const opacityBack = interpolate(progress.value, backInput, [0, 0, 1, 1]);
    return {
      opacity: opacityBack,
      transform: [{ perspective }, rotationFlipBack.value, rotationFlip.value],
    };
  }, [backInput]);

  // FIXME: ts issue `Type { translateX: number; }[] is not assignable to type never[]`
  // Happen when upgrading RN from 0.69 to 0.71
  // This can related to current version of @types/react, which is still 17
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const animatedConStyle = useAnimatedStyle(() => {
    const rotateZ = interpolate(progress.value, [0, 0.25, 0.75, 1], [0, 10, -10, 0]);
    return {
      transform: [{ rotate: `${rotateZ}deg` }],
    };
  });

  return (
    <Animated.View style={[style, animatedConStyle, { alignItems: 'center', justifyContent: 'center' }]}>
      <Animated.View style={[styles.side, animatedStyleFront]}>{front}</Animated.View>
      <Animated.View style={[styles.side, animatedStyleBack]}>{back}</Animated.View>
    </Animated.View>
  );
};
