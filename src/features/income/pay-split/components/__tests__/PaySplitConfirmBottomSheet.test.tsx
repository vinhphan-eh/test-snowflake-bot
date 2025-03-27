import React, { useRef } from 'react';
import { act, fireEvent } from '@testing-library/react-native';
import { render, renderHook } from '../../../../../common/utils/testing';
import type { PaySplitConfirmBottomSheetRef } from '../PaySplitConfirmBottomSheet';
import { PaySplitConfirmBottomSheet } from '../PaySplitConfirmBottomSheet';

describe('PaySplitConfirmBottomSheet', () => {
  beforeEach(() => {});

  it('should call onConfirm when user press confirm', () => {
    const onConfirm = jest.fn();
    const {
      result: { current: bottomSheetRef },
    } = renderHook(() => useRef<PaySplitConfirmBottomSheetRef>(null));
    const { getByText } = render(<PaySplitConfirmBottomSheet onConfirm={onConfirm} ref={bottomSheetRef} />);

    act(() => {
      bottomSheetRef.current?.open();
    });

    const gotItBtn = getByText('Got it!');
    fireEvent.press(gotItBtn);

    expect(onConfirm).toBeCalledTimes(1);
  });
});
