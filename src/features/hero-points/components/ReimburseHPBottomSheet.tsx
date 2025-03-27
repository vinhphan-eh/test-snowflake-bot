import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { Box, Image, Typography } from '@hero-design/rn';
import images from '../../../common/assets/images';
import type { BottomSheetRef } from '../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetScrollView } from '../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD } from '../../../common/components/bottom-sheet/BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from '../../../common/components/bottom-sheet/useBottomSheetDynamicSnapPoints';
import { scale } from '../../../common/utils/layout';
import { useIntl } from '../../../providers/LocalisationProvider';

export type ReimburseHPBottomSheetHandler = {
  open: () => void;
};

export const ReimburseHPBottomSheet = forwardRef<ReimburseHPBottomSheetHandler, unknown>((_, ref) => {
  const btsRef = useRef<BottomSheetRef>(null);

  const { formatMessage } = useIntl();

  useImperativeHandle(ref, () => ({
    open: () => {
      btsRef.current?.open();
    },
  }));

  const onDone = () => {
    btsRef.current?.close();
  };

  const {
    animatedContentHeight,
    animatedHandleHeight,
    animatedSnapPoints,
    contentContainerHeightStyle,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(true);

  return (
    <BottomSheetWithHD
      ref={btsRef}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      title={formatMessage({ id: 'points.reimburseWithHeroPoints' })}
      handleIconName="cancel"
      handleIconSize="xsmall"
      handleIconIntent="text"
      themeName="wallet"
      actions={[
        {
          title: formatMessage({ id: 'common.done' }),
          onPress: onDone,
        },
      ]}
    >
      {({ space }) => (
        <BottomSheetScrollView
          style={[contentContainerHeightStyle]}
          onLayout={handleContentLayout}
          testID="bottom-sheet-scroll-view"
          contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <Image
            style={{ width: scale(358, 'width'), height: scale(326, 'height') }}
            source={images.reimburseHeroPoints}
          />
          <Box paddingHorizontal="large">
            <Typography.Body style={{ marginTop: space.small }}>
              {formatMessage({ id: 'common.example' })}:
            </Typography.Body>
            <Box paddingHorizontal="small">
              <Box flexDirection="row" marginTop="small">
                <Typography.Body style={{ marginRight: space.small, width: 20, textAlign: 'right' }}>
                  1.
                </Typography.Body>
                <Typography.Body style={{ marginRight: space.medium }}>
                  {formatMessage({ id: 'points.reimburseExplain1' })}
                </Typography.Body>
              </Box>
              <Box flexDirection="row" marginTop="small">
                <Typography.Body style={{ marginRight: space.small, width: 20, textAlign: 'right' }}>
                  2.
                </Typography.Body>
                <Typography.Body style={{ marginRight: space.medium }}>
                  {formatMessage({ id: 'points.reimburseExplain2' })}
                </Typography.Body>
              </Box>
              <Box flexDirection="row" marginTop="small">
                <Typography.Body style={{ marginRight: space.small, width: 20, textAlign: 'right' }}>
                  3.
                </Typography.Body>
                <Typography.Body style={{ marginRight: space.medium }}>
                  {formatMessage({ id: 'points.reimburseExplain3' })}
                </Typography.Body>
              </Box>
            </Box>
          </Box>
        </BottomSheetScrollView>
      )}
    </BottomSheetWithHD>
  );
});
