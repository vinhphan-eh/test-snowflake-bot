import React, { useRef } from 'react';
import type { ImageSourcePropType } from 'react-native';
import { Dimensions, Image, StyleSheet } from 'react-native';
import Animated, {
  FadeOut,
  withDelay,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import images from '../../assets/images';

const NUM_CONFETTI = 60;
const CONFETTI_SIZE = 30;

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  confettiContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  confetti: {
    width: CONFETTI_SIZE,
    height: CONFETTI_SIZE - 10,
  },
});
// 80 to ensure it will go off screen
const Y_RANGE = screenHeight + 80;

const sources = [
  images.confetti1,
  images.confetti2,
  images.confetti3,
  images.confetti4,
  images.confetti5,
  images.confetti6,
];

type ConfettiItemProps = {
  x: number;
  y: number;
  xVel: number;
  yVel: number;
  angle: number;
  delay: number;
  angleVel: number;
  elasticity: number;
  onFinish: () => void;
  source: ImageSourcePropType;
};

const ConfettiItem = ({
  angle,
  angleVel,
  delay,
  elasticity,
  onFinish,
  source,
  x,
  xVel,
  y,
  yVel,
}: ConfettiItemProps) => {
  function getDuration() {
    return (Y_RANGE / yVel) * 1000;
  }
  const progress = useSharedValue(0);
  const duration = useSharedValue(getDuration());
  const localX = useSharedValue(0);
  const baseX = useSharedValue(x);
  const localY = useSharedValue(0);
  const localXVel = useSharedValue(xVel);
  const localAngle = useSharedValue(angle);
  const timeDiff = useSharedValue(0);
  const dt = useSharedValue(0);
  const dy = useSharedValue(0);
  const dx = useSharedValue(0);
  const dAngle = useSharedValue(0);

  if (progress.value === 0) {
    progress.value = withDelay(delay * 1000, withTiming(1, { duration: duration.value }));
  }

  useAnimatedReaction(
    () => {
      return progress.value;
    },
    value => {
      if (value === 1) {
        runOnJS(onFinish)();
      }
    }
  );

  // FIXME: ts issue `Type { translateX: number; }[] is not assignable to type never[]`
  // Happen when upgrading RN from 0.69 to 0.71
  // This can related to current version of @types/react, which is still 17
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const animatedStyle = useAnimatedStyle(() => {
    timeDiff.value = progress.value * duration.value;
    dt.value = timeDiff.value / 1000;
    dy.value = dt.value * yVel;
    dx.value = dt.value * localXVel.value;
    dAngle.value = dt.value * angleVel;
    localY.value = +y + dy.value;
    localX.value = baseX.value + dx.value;
    localAngle.value += dAngle.value;

    // hit right corner
    if (localX.value + CONFETTI_SIZE >= screenWidth) {
      baseX.value = screenWidth - CONFETTI_SIZE;
      localXVel.value = localXVel.value * -1 * elasticity;
      return {};
    }
    // hit left corner
    if (localX.value < 0) {
      baseX.value = 0;
      localXVel.value = localXVel.value * -1 * elasticity;
      return {};
    }

    return {
      transform: [
        { translateX: localX.value },
        { translateY: localY.value },
        { rotate: `${localAngle.value}deg` },
        { rotateX: `${localAngle.value}deg` },
        { rotateY: `${localAngle.value}deg` },
        { rotateZ: `${localAngle.value}deg` },
      ],
    };
  });

  return (
    <Animated.View style={[styles.confettiContainer, animatedStyle]}>
      <Image source={source} style={[styles.confetti]} />
    </Animated.View>
  );
};

export const Confetti = React.memo(
  ({ onFinish, run }: { run: boolean; onFinish: () => void }) => {
    const countFinishedItems = useRef(0);
    const confetti = [...new Array(NUM_CONFETTI)].map((_, index) => {
      return {
        // x: going from 1/4 top left and 1/4 top right of screen
        x: screenWidth * (index % 2 ? 0.25 : 0.75) - CONFETTI_SIZE / 2,
        // y off screen at beginning
        y: -60,
        angle: 0,
        // moving x speed
        xVel: Math.random() * 400 - 200,
        // moving y speed
        yVel: Math.random() * 200 + 200,
        // moving angle
        angleVel: (Math.random() * 3 - 1.5) * Math.PI,
        // 10 elements drop per wage, delay 0.3 between each wage
        delay: Math.floor(index / 10) * 0.3,
        // reduce x speed
        elasticity: Math.random() * 0.1 + 0.1,
        source: sources[index % sources.length],
      } as Omit<ConfettiItemProps, 'onFinish'>;
    });
    return run ? (
      <Animated.View style={StyleSheet.absoluteFill} exiting={FadeOut.duration(500)}>
        {confetti.map((e, index) => {
          return (
            <ConfettiItem
              onFinish={() => {
                countFinishedItems.current += 1;
                if (countFinishedItems.current === NUM_CONFETTI) {
                  onFinish();
                }
              }}
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              {...e}
            />
          );
        })}
      </Animated.View>
    ) : null;
  },
  (prevProps, nextProps) => prevProps.run === nextProps.run
);
