import React from 'react';
import { TouchableOpacity } from 'react-native';
import type { Theme } from '@hero-design/rn';
import { Box, useTheme } from '@hero-design/rn';
import type { BoxProps } from '@hero-design/rn/types/components/Box';
import debounce from 'lodash.debounce';
import type { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useEffectAfterMount } from '../../shared-hooks/useEffectAfterMount';

export type ToggleColor = {
  true: keyof Theme['colors'];
  false: keyof Theme['colors'];
};

type ToggleProps = {
  /**
   * value for controlling on/off
   */
  value?: boolean;
  /**
   * listener to toggle on/off
   */
  onChange?: (isOn: boolean) => void;
  /**
   * should disable toggle
   */
  disabled?: boolean;
  /**
   * thumb color
   */
  thumbColors?: ToggleColor;
  /**
   * track color
   */
  trackColors?: ToggleColor;
  /**
   * an unique string as id for testing
   */
  testID?: string;
} & BoxProps;

const defaultThumbColor: ToggleColor = {
  true: 'defaultGlobalSurface',
  false: 'defaultGlobalSurface',
};

export const defaultTrackColor: ToggleColor = {
  true: 'onInfoSurface',
  false: 'mutedArchived',
};

const trackWidth = 48;
const thumbSize = 16;
const pressedThumbSize = 20;
const thumbRadius = 8;
const pressedThumbRadius = 12;
const losingFocusPoint = 0.7;
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const Toggle = ({
  disabled = false,
  onChange = () => {},
  testID,
  thumbColors = defaultThumbColor,
  trackColors = defaultTrackColor,
  value = false,
  ...boxProps
}: ToggleProps) => {
  const isOn = useSharedValue(value);
  const progress = useDerivedValue(() => (isOn.value ? withTiming(1) : withTiming(0)));

  useEffectAfterMount(() => {
    if (value !== isOn.value) {
      // in case want to manage state from outside
      isOn.value = value;
    }
  }, [value]);

  const isPressIn = useSharedValue(false);

  const { colors, space } = useTheme();
  const horizontalSpacing = space.xsmall;
  const rangeMove = trackWidth - thumbSize - horizontalSpacing;

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const bgColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors[trackColors.false] as string, colors[trackColors.true] as string]
    );
    return {
      backgroundColor: bgColor,
    };
  });

  // FIXME: ts issue `Type { translateX: number; }[] is not assignable to type never[]`
  // Happen when upgrading RN from 0.69 to 0.71
  // This can related to current version of @types/react, which is still 17
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const bgColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors[thumbColors.false] as string, colors[thumbColors.true] as string]
    );
    const translateX = interpolate(progress.value, [0, 1], [horizontalSpacing, rangeMove]);
    const extraLeft = isPressIn.value && progress.value > losingFocusPoint ? -horizontalSpacing : 0;
    return {
      width: isPressIn.value ? pressedThumbSize : thumbSize,
      borderRadius: isPressIn.value ? pressedThumbRadius : thumbRadius,
      height: thumbSize,
      backgroundColor: bgColor,
      transform: [{ translateX }],
      // handle focus state: wrong spacing when toggle on
      marginLeft: extraLeft,
    };
  });

  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {
      beginState: boolean;
    }
  >({
    onStart: (_, ctx) => {
      ctx.beginState = isOn.value;
    },
    onActive: (event, ctx) => {
      const { translationX } = event;
      const maxRange = ctx.beginState ? 0 : rangeMove;
      const minRange = ctx.beginState ? -rangeMove : 0;
      const multiplier = ctx.beginState ? -1 : 1;
      const minActiveX = (maxRange - minRange) / 2;

      if (translationX > minRange && translationX < maxRange) {
        if (translationX * multiplier > minActiveX - 5 && isOn.value === ctx.beginState) {
          isOn.value = !ctx.beginState;
        }

        if (translationX * multiplier < minActiveX - 5 && isOn.value !== ctx.beginState) {
          isOn.value = ctx.beginState;
        }
      }
      if (!isPressIn.value) {
        isPressIn.value = true;
      }
    },
    onEnd: () => {
      isPressIn.value = false;
      // only call onChange after end, avoid changing state multiple times
      runOnJS(onChange)(isOn.value);
    },
  });

  // debounce incase user clicking constantly
  const onChangeDebounce = debounce(() => onChange(isOn.value), 500, {
    trailing: true,
    leading: false,
  });

  const onPress = () => {
    onChangeDebounce();
    isOn.value = !isOn.value;
  };

  return (
    <Box {...boxProps} accessibilityLabel="Toggle Container" style={disabled && { opacity: 0.38 }}>
      <AnimatedTouchable
        testID={testID}
        accessibilityLabel={boxProps.accessibilityLabel}
        disabled={disabled}
        activeOpacity={1}
        delayPressOut={100}
        onPressIn={() => {
          isPressIn.value = true;
        }}
        onPressOut={() => {
          isPressIn.value = false;
        }}
        onPress={onPress}
        style={[
          {
            width: trackWidth,
            height: 24,
            borderRadius: 16,
            justifyContent: 'center',
          },
          trackAnimatedStyle,
        ]}
      >
        <PanGestureHandler enabled={!disabled} onGestureEvent={onGestureEvent}>
          <Animated.View style={[thumbAnimatedStyle]} />
        </PanGestureHandler>
      </AnimatedTouchable>
    </Box>
  );
};

export { Toggle };
