import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Typography } from '@hero-design/rn';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetScrollView } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD } from '../../../../common/components/bottom-sheet/BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from '../../../../common/components/bottom-sheet/useBottomSheetDynamicSnapPoints';
import { useGetPromotionQuery } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useBillManagementStore } from '../stores/useBillManagementStore';

export type PromotionTnCBtsHandler = {
  open: (nextAction: () => void) => void;
};

export const PromotionTnCBts = forwardRef<PromotionTnCBtsHandler, unknown>((_, ref) => {
  const btsRef = useRef<BottomSheetRef>(null);
  const { data: promotionContent } = useGetPromotionQuery();
  const { termsAndConditions } = promotionContent?.me?.billManagement?.promotion ?? {};
  const [callback, setCallback] = useState<() => void>(() => {});

  const { formatMessage } = useIntl();
  const { setDisclaimerVisibility } = useBillManagementStore();

  useImperativeHandle(ref, () => ({
    open: nextAction => {
      btsRef.current?.open();
      setCallback(() => nextAction);
    },
  }));

  const onAccept = () => {
    btsRef.current?.close();
    setDisclaimerVisibility(false);
    callback?.();
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
      title={formatMessage({ id: 'common.tnc' })}
      handleIconName="cancel"
      handleIconSize="xsmall"
      handleIconIntent="text"
      themeName="eBens"
      actions={[
        {
          testID: 'accept-btn',
          title: formatMessage({ id: 'benefits.bill.gotIt' }),
          onPress: onAccept,
        },
      ]}
    >
      {({ space }) => (
        <BottomSheetScrollView
          style={contentContainerHeightStyle}
          onLayout={handleContentLayout}
          testID="bottom-sheet-scroll-view"
        >
          <Typography.Body style={{ marginHorizontal: space.medium }}>{termsAndConditions}</Typography.Body>
        </BottomSheetScrollView>
      )}
    </BottomSheetWithHD>
  );
});
