import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Dimensions } from 'react-native';
import { Icon, Box, useTheme, Typography } from '@hero-design/rn';
import type { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { AnimatedLoadingText } from './AnimatedLoadingText';
import { getEnvConfig } from '../../utils/env';

const { width: windowWidth } = Dimensions.get('window');
const defaultBtnWidth = (96 * windowWidth) / 390;
const INSET_TO_END = 3;

type SwipeToActionProps = {
  text: string;
  loadingText: string;
  loadingSpeed: number;
  isLoading: boolean;
  onAction: () => void;
  style?: StyleProp<ViewStyle>;
};

export const SwipeToAction = ({ isLoading, loadingSpeed, loadingText, onAction, style, text }: SwipeToActionProps) => {
  const { colors, radii } = useTheme();
  const haveTriggeredAction = useSharedValue(false);
  const actionRange = useSharedValue(0);
  const translateX = useSharedValue(0);

  // FIXME: ts issue `Type { translateX: number; }[] is not assignable to type never[]`
  // Happen when upgrading RN from 0.69 to 0.71
  // This can related to current version of @types/react, which is still 17
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      width: actionRange.value + defaultBtnWidth,
      transform: [{ translateX: translateX.value - actionRange.value - defaultBtnWidth / 2 }],
    };
  });

  // FIXME: ts issue `Type { translateX: number; }[] is not assignable to type never[]`
  // Happen when upgrading RN from 0.69 to 0.71
  // This can related to current version of @types/react, which is still 17
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const animatedForwardIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>(
    {
      onActive: event => {
        const { translationX } = event;
        if (translationX > 0 && translationX < actionRange.value && !haveTriggeredAction.value) {
          translateX.value = translationX + INSET_TO_END;
        }
      },
      onEnd: () => {
        if (translateX.value >= actionRange.value - defaultBtnWidth) {
          translateX.value = actionRange.value;
          runOnJS(onAction)();
        } else {
          translateX.value = withSpring(0, {
            overshootClamping: true,
            mass: 0.2,
          });
        }
      },
    },
    [onAction]
  );

  return (
    <Box
      onLayout={({
        nativeEvent: {
          layout: { width },
        },
      }) => {
        actionRange.value = width - defaultBtnWidth;
      }}
      accessibilityLabel={text}
      backgroundColor="decorativePrimarySurface"
      borderWidth="medium"
      borderColor="primary"
      style={[
        {
          borderRadius: radii['5xlarge'],
          height: 60,
          overflow: 'hidden',
          justifyContent: 'center',
        },
        style,
      ]}
    >
      <Typography.Title level="h6" style={{ textAlign: 'center', marginLeft: defaultBtnWidth }}>
        {text}
      </Typography.Title>

      <Animated.View
        style={[{ position: 'absolute', height: '100%', backgroundColor: colors.primary }, animatedBackgroundStyle]}
      />
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          testID="swipe-btn"
          style={[
            {
              borderRadius: radii['5xlarge'],
              width: defaultBtnWidth,
              backgroundColor: colors.primary,
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
            },
            animatedForwardIconStyle,
          ]}
        >
          {!isLoading && <Icon size="xsmall" intent="text-inverted" icon="double-right-arrows" />}
        </Animated.View>
      </PanGestureHandler>
      {isLoading && getEnvConfig().IS_E2E !== 'true' && (
        <AnimatedLoadingText
          testID="loading_text"
          speed={loadingSpeed}
          loadingTextStyle={{ intent: 'inverted' }}
          style={{ position: 'absolute', alignSelf: 'center' }}
          text={loadingText}
        />
      )}
    </Box>
  );
};
