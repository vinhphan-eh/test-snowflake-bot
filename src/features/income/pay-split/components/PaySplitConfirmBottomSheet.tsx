import React, { useImperativeHandle, useRef } from 'react';
import { Typography } from '@hero-design/rn';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetView } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD } from '../../../../common/components/bottom-sheet/BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from '../../../../common/components/bottom-sheet/useBottomSheetDynamicSnapPoints';

interface Props {
  onConfirm: () => void;
  onDismiss?: () => void;
}

export interface PaySplitConfirmBottomSheetRef {
  open: () => void;
  close: () => void;
}

/**
 * Confirmation modal for PaySplit allocation
 */
export const PaySplitConfirmBottomSheet = React.forwardRef<PaySplitConfirmBottomSheetRef, Props>(
  ({ onConfirm, onDismiss }, ref) => {
    const bs = useRef<BottomSheetRef>(null);
    const { animatedContentHeight, animatedHandleHeight, animatedSnapPoints, handleContentLayout } =
      useBottomSheetDynamicSnapPoints(true);

    useImperativeHandle(ref, () => ({
      open: () => {
        bs.current?.open();
      },
      close: () => {
        bs.current?.close();
      },
    }));

    return (
      <BottomSheetWithHD
        ref={bs}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        title="Before you proceed"
        handleIconName="cancel"
        handleIconSize="xsmall"
        onDismiss={onDismiss}
        actions={[{ testID: 'gotIt', onPress: onConfirm, title: 'Got it!' }]}
      >
        {({ space }) => (
          <BottomSheetView onLayout={handleContentLayout}>
            <Typography.Body
              variant="regular"
              testID="ref_p1"
              style={{ marginHorizontal: space.large, marginTop: space.small, marginBottom: space.medium }}
            >
              We will automatically update your account details in payroll to reflect your Pay Split.
            </Typography.Body>
            <Typography.Body
              variant="regular"
              testID="ref_p2"
              style={{ marginHorizontal: space.large, marginTop: space.small, marginBottom: space.medium }}
            >
              Please make sure you update any associated direct debits or recurring payments. You can view and update
              these details in your Employment Hero HR Login.
            </Typography.Body>
          </BottomSheetView>
        )}
      </BottomSheetWithHD>
    );
  }
);
