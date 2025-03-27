import { useRef, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { useTheme } from '@hero-design/rn';
import type { Space } from '@hero-design/rn/types/theme/global/space';

// 18% - min point should snap to
const STANDARD_MIN_SNAP = 0.18;

type HookParams = {
  top: keyof Space;
};

export const useGetMinSnapPoint = (params?: HookParams) => {
  const [minSnapPoint, setMinSnapPoint] = useState(1);
  const { space } = useTheme();
  // useRef to minimize the number of triggering updates while calculate onLayout
  const endPosition = useRef(0);
  const screenHeight = useRef(0);

  const gap = space[params?.top || 'medium'];

  const calculateMinSnap = () => {
    const totalHeight = screenHeight.current;
    const endPoint = endPosition.current;
    // ensure it should run once when ready
    if (totalHeight !== 0 && endPoint !== 0) {
      // min snap to ensure the minimum height for drawer to look fine
      const minSnap = totalHeight - endPoint - gap;
      const standardMinSnap = totalHeight * STANDARD_MIN_SNAP;
      setMinSnapPoint(Math.max(minSnap, standardMinSnap));
    }
  };

  const onLayoutScreenHeight = (event: LayoutChangeEvent) => {
    const {
      nativeEvent: {
        layout: { height },
      },
    } = event;
    // must call calculate here becasue the order of onLayout on Android & IOS is different
    if (screenHeight.current !== height) {
      screenHeight.current = height;
      calculateMinSnap();
    }
  };

  const onLayoutEndPosition = (event: LayoutChangeEvent) => {
    const {
      nativeEvent: {
        layout: { y },
      },
    } = event;
    // must call calculate here becasue the order of onLayout on Android & IOS is different
    if (endPosition.current !== y) {
      endPosition.current = y;
      calculateMinSnap();
    }
  };

  return {
    minSnapPoint,
    onLayoutScreenHeight,
    onLayoutEndPosition,
    /**
     * @description
     * use for scroll view if content could be longer than standard min snap
     */
    maxScrollPercentage: (1 - STANDARD_MIN_SNAP) * 100,
  };
};
