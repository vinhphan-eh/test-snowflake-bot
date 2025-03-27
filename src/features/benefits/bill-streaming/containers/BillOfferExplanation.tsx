import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Linking } from 'react-native';
import { Typography } from '@hero-design/rn';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetScrollView } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD } from '../../../../common/components/bottom-sheet/BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from '../../../../common/components/bottom-sheet/useBottomSheetDynamicSnapPoints';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useBillManagementStore } from '../stores/useBillManagementStore';

export type BillOfferExplanationHandler = {
  open: (nextAction: () => void) => void;
};

export type BillOfferExplainationProps = {
  content: string | undefined;
};

export const BillOfferExplanation = forwardRef<BillOfferExplanationHandler, BillOfferExplainationProps>(
  ({ content }, ref) => {
    const btsRef = useRef<BottomSheetRef>(null);

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

    const wrapContent = content ? content.replace(/[^\\]\\n/g, '.\n') : '';

    // Regular expression to match the phone number pattern
    const phoneNumberRegex = /please call us on (\d[\d\s]+)/;
    // Extract the phone number using the regular expression
    const phoneNumberMatch = wrapContent.match(phoneNumberRegex);
    const phoneNumber = phoneNumberMatch && phoneNumberMatch[1];

    const match = wrapContent.match(phoneNumber ?? '');

    return (
      <BottomSheetWithHD
        ref={btsRef}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        title={formatMessage({ id: 'benefits.bill.offerExplaination' })}
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
            {match && phoneNumber ? (
              <Typography.Body style={{ marginHorizontal: space.large }}>
                {wrapContent.substring(0, match.index)}
                <Typography.Body
                  intent="primary"
                  onPress={() => {
                    if (phoneNumber) {
                      const formattedPhoneNumber = phoneNumber.replace(/\s/g, '');
                      Linking.openURL(`tel:${formattedPhoneNumber}`);
                    }
                  }}
                  style={{ textDecorationLine: 'underline' }}
                >
                  {phoneNumber}
                </Typography.Body>
                {!!match.index && wrapContent.substring(match.index + match[0].length)}
              </Typography.Body>
            ) : (
              <Typography.Body style={{ marginHorizontal: space.medium }}>{wrapContent}</Typography.Body>
            )}
          </BottomSheetScrollView>
        )}
      </BottomSheetWithHD>
    );
  }
);
