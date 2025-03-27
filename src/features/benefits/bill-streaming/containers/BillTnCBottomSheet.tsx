import React, { useCallback, useState } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Box, Typography } from '@hero-design/rn';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetScrollView } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD } from '../../../../common/components/bottom-sheet/BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from '../../../../common/components/bottom-sheet/useBottomSheetDynamicSnapPoints';

type BillTnCBottomSheetProps = {
  onAccepted: () => void;
  /**
   * Ref to use handler from BottomSheetRef
   */
  btsRef?: React.RefObject<BottomSheetRef>;
};

export const BillTnCBottomSheet = ({ btsRef, onAccepted }: BillTnCBottomSheetProps) => {
  const { contentContainerHeightStyle, handleContentLayout } = useBottomSheetDynamicSnapPoints(true);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);

  const onScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const isCloseToBottom = ({ contentOffset, contentSize, layoutMeasurement }: NativeScrollEvent) => {
      const paddingToBottom = 20;
      return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };

    if (isCloseToBottom(event.nativeEvent)) {
      setIsBtnDisabled(false);
    }
  }, []);

  return (
    <BottomSheetWithHD
      snapPoints={['1%', '100%']}
      title="Please read and accept our terms and conditions"
      ref={btsRef}
      handleIconName="cancel"
      handleIconSize="xsmall"
      handleIconIntent="primary"
      actions={[
        {
          testID: 'accept-btn',
          title: 'Accept',
          onPress: onAccepted,
          isDisabled: isBtnDisabled,
        },
      ]}
      themeName="eBens"
    >
      <BottomSheetScrollView
        style={contentContainerHeightStyle}
        onLayout={handleContentLayout}
        onMomentumScrollEnd={onScrollEnd}
        testID="cashback-terms-and-conditions"
      >
        <Box testID="content" paddingHorizontal="large" paddingTop="small" paddingBottom="medium">
          <Typography.Caption>
            This is a body of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum This is a body of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum This is a body of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
            in voluptate velit esse cillum This is a body of text. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation This is a body of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
            in voluptate velit esse cillum This is a body of text. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum This is a body of text. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum This is a body of text. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum This is a body of text. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          </Typography.Caption>
        </Box>
      </BottomSheetScrollView>
    </BottomSheetWithHD>
  );
};
