import React, { useCallback, useRef, useState } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import type { BodyProps } from '@hero-design/rn/types/components/Typography/Body';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetScrollView } from '../../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD } from '../../../../common/components/bottom-sheet/BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from '../../../../common/components/bottom-sheet/useBottomSheetDynamicSnapPoints';
import { InlineTextLink } from '../../../../common/components/inline-text-link';
import { queryClient } from '../../../../common/libs/queryClient';
import { useInAppBrowser } from '../../../../common/shared-hooks/useInAppBrowser';
import { useToast } from '../../../../common/shared-hooks/useToast';
import {
  useGetCashbackTermsAndConditionsAcceptanceQuery,
  useGetCashbackTermsAndConditionsQuery,
  useAcceptTncMutation,
} from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { termsAndConditionsContent } from '../card-link-offers/constants/termsAndConditionsContent';

type CashbackTermsAndConditionsBottomSheetProps = {
  /**
   * Ref to use handler from BottomSheetRef
   */
  btsRef: React.RefObject<BottomSheetRef>;
  onDismiss?: () => void;
  onSuccess?: () => void;
};

export const CashbackTermsAndConditionsBottomSheet = ({
  btsRef,
  onDismiss = () => {},
  onSuccess = () => {},
}: CashbackTermsAndConditionsBottomSheetProps) => {
  const Toast = useToast();
  const { data } = useGetCashbackTermsAndConditionsQuery();
  const { mutateAsync: updateCashbackAcceptTermsAndConditions } = useAcceptTncMutation();
  const contents = data?.me?.cashback?.termsAndConditions.items ?? termsAndConditionsContent;
  const { contentContainerHeightStyle, handleContentLayout } = useBottomSheetDynamicSnapPoints(true);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const { openUrl } = useInAppBrowser();
  const { space } = useTheme();
  const userAcceptedFlag = useRef(false);
  const Intl = useIntl();

  const onScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const isCloseToBottom = ({ contentOffset, contentSize, layoutMeasurement }: NativeScrollEvent) => {
      const paddingToBottom = 20;
      return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };

    if (isCloseToBottom(event.nativeEvent)) {
      setIsBtnDisabled(false);
    }
  }, []);

  const onAccept = async () => {
    setIsBtnDisabled(true);
    try {
      await updateCashbackAcceptTermsAndConditions({});
      userAcceptedFlag.current = true;
      // after CashbackTermsAndConditionsAcceptance invalidation, the CashbackTermsAndConditionsAcceptance query will be refetched
      // then auto enrollment will be triggered, there is a listener to TnC status
      queryClient.invalidateQueries(useGetCashbackTermsAndConditionsAcceptanceQuery.getKey());
      btsRef.current?.close();
      onSuccess();
    } catch (e) {
      setIsBtnDisabled(false);
      Toast.show({
        content: Intl.formatMessage({ id: 'common.something.wrong.went.wrong.try.again' }),
        intent: 'error',
      });
    }
  };

  const renderContent = () => {
    return (
      <>
        {contents.map((item, idx) => {
          const { showListItemSymbol, text, textVariant, type, url } = item;

          let style: Omit<BodyProps, 'children'> = {};
          if (textVariant === 'small') {
            style = { variant: 'small' };
          }
          if (textVariant === 'small-bold') {
            style = { variant: 'small-bold' };
          }

          switch (type) {
            case 'text':
              return (
                <Box marginBottom="small" alignItems="flex-start" flexDirection="row" key={text}>
                  {showListItemSymbol && (
                    <Typography.Body style={{ marginHorizontal: space.xsmall }} {...style}>
                      {'\u2022'}
                    </Typography.Body>
                  )}
                  <Typography.Body {...style}>{text}</Typography.Body>
                </Box>
              );
            case 'link':
              return (
                <InlineTextLink
                  key={text + idx.toString()}
                  variant="small"
                  onPress={() => openUrl(url || text)}
                  {...style}
                  style={{ marginBottom: space.small }}
                >
                  {text}
                </InlineTextLink>
              );
            default:
              return null;
          }
        })}
      </>
    );
  };

  return (
    <BottomSheetWithHD
      snapPoints={['1%', '100%']}
      title="Please read and accept our Cashback terms and conditions"
      ref={btsRef}
      handleIconName="cancel"
      handleIconSize="xsmall"
      handleIconIntent="text"
      actions={[
        {
          testID: 'accept-btn',
          title: 'Accept',
          onPress: onAccept,
          isDisabled: isBtnDisabled,
        },
      ]}
      themeName="eBens"
      onChange={index => {
        if (index === 1) {
          userAcceptedFlag.current = false;
        }
      }}
      onDismiss={() => {
        if (!userAcceptedFlag.current) {
          // because dismiss always triggred when bts close, this to prevent that when success
          onDismiss();
        }
      }}
    >
      <BottomSheetScrollView
        style={contentContainerHeightStyle}
        onLayout={handleContentLayout}
        onMomentumScrollEnd={onScrollEnd}
        testID="cashback-terms-and-conditions"
      >
        <Box testID="content" paddingHorizontal="large" paddingTop="small" paddingBottom="medium">
          {renderContent()}
        </Box>
      </BottomSheetScrollView>
    </BottomSheetWithHD>
  );
};
