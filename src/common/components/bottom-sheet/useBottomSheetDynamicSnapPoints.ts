import { useCallback, useMemo, useState } from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import { useBottomSheetDynamicSnapPoints as useBottomSheetDynamicSnapPointsFromLib } from '@gorhom/bottom-sheet';
import { runOnJS, useAnimatedReaction } from 'react-native-reanimated';
import { BOTTOM_SHEET_TOP_OFFSET, BOTTOM_SHEET_BOTTOM_OFFSET } from './BottomSheet';

const footerHeightByDesign = 48;
const footerMarginTop = 8;
// Margin bottom of action button. This is to fix issue margin bottom not working with the footer
const footerBottomMargin = 8;
export const totalFooterHeight = footerHeightByDesign + footerMarginTop + footerBottomMargin;

/**
 * Extends `useBottomSheetDynamicSnapPoints` from `@gorhom/bottom-sheet` to fix scrollable issue when using dynamic snapPoints
 * - **Why** ScrollView is not scrollable without a fixed height
 * - **How** Calculate content height of bottom sheet then add `maxHeight` to bottom sheet content container view
 * @param hasFooter whether BottomSheet has actions or not
 */
export const useBottomSheetDynamicSnapPoints = (hasFooter?: boolean) => {
  const initialSnapPoints = useMemo(() => [1, 'CONTENT_HEIGHT'], []);
  const {
    animatedContentHeight,
    animatedHandleHeight,
    animatedSnapPoints,
    handleContentLayout: originHandleContentLayout,
  } = useBottomSheetDynamicSnapPointsFromLib(initialSnapPoints);

  const [handleHeight, setHandleHeight] = useState(0);

  const { height: windowHeight } = useWindowDimensions();

  const bottomSheetFooterHeight = hasFooter ? totalFooterHeight : 0;

  /**
   * Watch for handle height calculation and save this value
   * Using `animatedHandleHeight.value` and `useAnimatedStyle` directly causes maxHeight not correct
   */
  useAnimatedReaction(
    () => {
      return animatedHandleHeight.value;
    },
    value => {
      runOnJS(setHandleHeight)(value);
    }
  );

  const contentContainerHeightStyle = useMemo(() => {
    const maxContentHeight =
      windowHeight -
      (StatusBar.currentHeight || 0) -
      (BOTTOM_SHEET_TOP_OFFSET + handleHeight + bottomSheetFooterHeight + BOTTOM_SHEET_BOTTOM_OFFSET);

    return {
      maxHeight: maxContentHeight,
    };
  }, [bottomSheetFooterHeight, handleHeight, windowHeight]);

  const handleContentLayout = useCallback(
    (event: { nativeEvent: { layout: { height: number } } }) => {
      originHandleContentLayout({
        nativeEvent: {
          // Measured content height must include footer height and bottom sheet inset
          layout: { height: event.nativeEvent.layout.height + bottomSheetFooterHeight + BOTTOM_SHEET_BOTTOM_OFFSET },
        },
      });
    },
    [bottomSheetFooterHeight, originHandleContentLayout]
  );

  return {
    animatedContentHeight,
    animatedHandleHeight,
    animatedSnapPoints: animatedSnapPoints as unknown as Array<number | string>,
    handleContentLayout,
    contentContainerHeightStyle,
  };
};
