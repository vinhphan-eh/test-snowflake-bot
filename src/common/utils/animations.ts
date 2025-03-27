import { useEffect } from 'react';
import type { WithTimingConfig } from 'react-native-reanimated';
import { useSharedValue, useDerivedValue, withTiming } from 'react-native-reanimated';

export const bin = (value: boolean): 0 | 1 => {
  'worklet';

  return value ? 1 : 0;
};

export const useTiming = (state: boolean | number, config?: WithTimingConfig) => {
  const value = useSharedValue(typeof state === 'boolean' ? bin(state) : state);
  useEffect(() => {
    value.value = typeof state === 'boolean' ? bin(state) : state;
  }, [state, value]);
  const transition = useDerivedValue(() => {
    return withTiming(value.value, config);
  });
  return transition;
};
