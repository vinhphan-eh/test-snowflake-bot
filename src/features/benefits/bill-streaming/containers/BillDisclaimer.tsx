import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Typography } from '@hero-design/rn';
import { runOnJS, useAnimatedReaction } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetScrollView } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD } from '../../../../common/components/bottom-sheet/BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from '../../../../common/components/bottom-sheet/useBottomSheetDynamicSnapPoints';
import useBrandName from '../../../../common/hooks/useBrandName';
import { useInAppBrowser } from '../../../../common/shared-hooks/useInAppBrowser';
import { Pid } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { EH_POLICY_LINK, MEDIBANK_POCILY_LINK } from '../../common/constants/benefits';
import { useShowBillDisclaimer } from '../hooks/useShowBillDisclaimer';

export type BillDisclaimerHandler = {
  open: (nextAction: () => void, providerId: Pid) => void;
};

const { height: windowHeight } = Dimensions.get('window');
const safeGapToTap = 20;

export const BillDisclaimer = forwardRef<BillDisclaimerHandler, unknown>((_, ref) => {
  const btsRef = useRef<BottomSheetRef>(null);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const { top: topInset } = useSafeAreaInsets();
  const [calculateActive, setCalculateActive] = useState(0);

  const [callback, setCallback] = useState<() => void>(() => {});
  const [providerId, setProviderId] = useState<Pid | undefined>(undefined);
  const { formatMessage } = useIntl();
  const { setShowDisclaimer } = useShowBillDisclaimer();
  const { openUrl } = useInAppBrowser();
  const brandName = useBrandName();

  const openEHPolicy = () => {
    openUrl(EH_POLICY_LINK);
  };

  const openMedibankPolicy = () => {
    openUrl(MEDIBANK_POCILY_LINK);
  };

  useImperativeHandle(ref, () => ({
    open: (nextAction, pId) => {
      btsRef.current?.open();
      setProviderId(pId);
      setCallback(() => nextAction);
      // to trigger re-calculate the button state every time it opens
      // because button state is not calculated when it opens the same bts again
      setCalculateActive(Math.random());
    },
  }));

  const onAccept = () => {
    btsRef.current?.close();
    if (providerId) {
      setShowDisclaimer(providerId, false);
    }
    callback?.();
  };

  const onScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const isCloseToBottom = ({ contentOffset, contentSize, layoutMeasurement }: NativeScrollEvent) => {
      const paddingToBottom = 20;
      return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };

    if (isCloseToBottom(event.nativeEvent)) {
      setIsBtnDisabled(false);
    }
  }, []);

  const {
    animatedContentHeight,
    animatedHandleHeight,
    animatedSnapPoints,
    contentContainerHeightStyle,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(true);

  useAnimatedReaction(
    () => {
      return animatedContentHeight.value;
    },
    contentValue => {
      // if content is not enough to fill the screen, enable the button
      const defaultContent = contentValue + animatedHandleHeight.value + safeGapToTap;
      if (defaultContent > 0 && defaultContent < windowHeight - topInset) {
        runOnJS(setIsBtnDisabled)(false);
      } else {
        runOnJS(setIsBtnDisabled)(true);
      }
    },
    [calculateActive, animatedContentHeight.value]
  );
  return (
    <BottomSheetWithHD
      ref={btsRef}
      // set button back to disabled when dismiss
      // because this bts may be shared between different bill offers
      // so if user alr read disclaimer of bill 1 -> active button -> jump to bill 2 -> the active state isn't cleared
      // by right, it should be disabled because user hasn't read the second disclaimer
      onDismiss={() => setIsBtnDisabled(true)}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      title={formatMessage({ id: 'benefits.bill.disclaimer' })}
      handleIconName="cancel"
      handleIconSize="xsmall"
      handleIconIntent="text"
      themeName="eBens"
      actions={[
        {
          testID: 'accept-btn',
          title: 'Accept',
          onPress: onAccept,
          isDisabled: isBtnDisabled,
        },
      ]}
    >
      {({ space }) => (
        <BottomSheetScrollView
          style={contentContainerHeightStyle}
          onLayout={handleContentLayout}
          onMomentumScrollEnd={onScrollEnd}
          testID="bottom-sheet-scroll-view"
        >
          {providerId === Pid.Medibank ? (
            <Typography.Body style={{ marginHorizontal: space.medium }}>
              {formatMessage(
                { id: 'benefits.bill.disclaimer.medibankContent' },
                {
                  ehPrivacy: (
                    <TouchableWithoutFeedback onPress={openEHPolicy}>
                      <Typography.Body intent="primary" style={{ textDecorationLine: 'underline' }}>
                        {formatMessage({ id: 'benefits.bill.disclaimer.ehPrivacy' })}
                      </Typography.Body>
                    </TouchableWithoutFeedback>
                  ),
                  medibankPrivacy: (
                    <TouchableWithoutFeedback onPress={openMedibankPolicy}>
                      <Typography.Body intent="primary" style={{ textDecorationLine: 'underline' }}>
                        {formatMessage({ id: 'benefits.bill.disclaimer.medibankPrivacy' })}
                      </Typography.Body>
                    </TouchableWithoutFeedback>
                  ),
                  brandName,
                }
              )}
            </Typography.Body>
          ) : (
            <Typography.Body style={{ marginHorizontal: space.medium }}>
              {formatMessage({ id: 'benefits.bill.disclaimer.content' }, { brandName })}
            </Typography.Body>
          )}
        </BottomSheetScrollView>
      )}
    </BottomSheetWithHD>
  );
});
