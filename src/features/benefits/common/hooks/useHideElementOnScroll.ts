import { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

export const useHideElementOnScroll = () => {
  const visibleSharedValue = useSharedValue(1);

  const onScroll = useAnimatedScrollHandler({
    onBeginDrag: () => {
      if (visibleSharedValue.value === 1) {
        visibleSharedValue.value = 0;
      }
    },
    onEndDrag: () => {
      visibleSharedValue.value = 1;
    },
  });

  return { visibleSharedValue, onScroll };
};
