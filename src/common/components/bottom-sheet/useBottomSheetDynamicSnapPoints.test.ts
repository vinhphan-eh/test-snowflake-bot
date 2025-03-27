import { act, renderHook } from '@testing-library/react-hooks';
import { totalFooterHeight, useBottomSheetDynamicSnapPoints } from './useBottomSheetDynamicSnapPoints';

describe('useBottomSheetDynamicSnapPoints', () => {
  it('with & without footer should has difference of footer height', () => {
    const { result: resultWithoutFooter } = renderHook(() => useBottomSheetDynamicSnapPoints());
    act(() => {
      resultWithoutFooter.current.handleContentLayout({ nativeEvent: { layout: { height: 200 } } });
      resultWithoutFooter.current.animatedHandleHeight.value = 64;
    });
    const maxHeightWithoutFooter = resultWithoutFooter.current.contentContainerHeightStyle.maxHeight;

    const { result: resultWithFooter } = renderHook(() => useBottomSheetDynamicSnapPoints(true));
    act(() => {
      resultWithFooter.current.handleContentLayout({ nativeEvent: { layout: { height: 200 } } });
      resultWithFooter.current.animatedHandleHeight.value = 64;
    });
    const maxHeightWithFooter = resultWithFooter.current.contentContainerHeightStyle.maxHeight;

    expect(maxHeightWithoutFooter - maxHeightWithFooter).toEqual(totalFooterHeight);
  });
});
