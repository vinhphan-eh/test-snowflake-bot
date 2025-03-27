import React, { useEffect, useRef } from 'react';
import { Box, Typography, useTheme } from '@hero-design/rn';
import type { BottomSheetRef, ButtonAction } from '../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetScrollView } from '../../../common/components/bottom-sheet/BottomSheet';
import { BottomSheetWithHD } from '../../../common/components/bottom-sheet/BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from '../../../common/components/bottom-sheet/useBottomSheetDynamicSnapPoints';
import TouchOutsideDismissKeyboard from '../../../common/components/touch-dismiss-keyboard';
import { topTabUtils } from '../../../navigation/utils';
import type { CountryOfOrigin } from '../../../new-graphql/generated';
import { useGetWalletNotificationQuery } from '../../../new-graphql/generated';
import { useIntl, useRegionLocalisation } from '../../../providers/LocalisationProvider';
import { useAlertAtmIssueStore } from '../stores/useAlertAtmIssueStore';

const AlertIssueBottomSheet = () => {
  const { space } = useTheme();
  const { currentRegion } = useRegionLocalisation();
  const { data } = useGetWalletNotificationQuery(
    { country: currentRegion as CountryOfOrigin },
    { enabled: !!currentRegion }
  );
  const Intl = useIntl();
  const btsRef = useRef<BottomSheetRef>(null);
  const { hasShownTimestamp, setHasShownTimestamp } = useAlertAtmIssueStore();
  const {
    animatedContentHeight,
    animatedHandleHeight,
    animatedSnapPoints,
    contentContainerHeightStyle,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(true);

  const hasNewContent = !!(
    hasShownTimestamp && new Date(data?.me?.wallet?.notification?.updatedAt ?? '').valueOf() > hasShownTimestamp
  );

  useEffect(() => {
    if (data?.me?.wallet?.notification?.content && (hasNewContent || !hasShownTimestamp)) {
      // Show the bottom sheet if there is new content or the user has not seen the content before
      btsRef.current?.open();
    }
  }, [data?.me?.wallet?.notification?.content, hasNewContent, hasShownTimestamp]);

  const onClose = () => {
    btsRef.current?.close();
    setHasShownTimestamp();
  };

  const actions: ButtonAction[] = [
    {
      title: data?.me?.wallet?.notification?.ctaCaptions.disagree ?? '',
      intent: 'secondary',
      onPress: () => {
        onClose();
        topTabUtils?.setSelectedTab?.('support-tab');
      },
    },
    {
      title: data?.me?.wallet?.notification?.ctaCaptions.agree ?? '',
      onPress: onClose,
    },
  ];

  return (
    <BottomSheetWithHD
      title={Intl.formatMessage({ id: 'spend-account.alert.CBA-issue' })}
      ref={btsRef}
      handleIconName="cancel"
      handleIconIntent="text"
      handleIconSize="xsmall"
      actions={actions}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      onDismiss={onClose}
    >
      <TouchOutsideDismissKeyboard>
        <BottomSheetScrollView
          style={contentContainerHeightStyle}
          onLayout={handleContentLayout}
          testID="alert-issue-bts"
        >
          <Box testID="content" paddingHorizontal="large" paddingTop="small" paddingBottom="medium">
            <Typography.Body>{data?.me?.wallet?.notification?.content}</Typography.Body>
            {!!data?.me?.wallet?.notification?.note && (
              <Typography.Body
                style={{
                  marginTop: space.large,
                }}
              >
                {data?.me?.wallet?.notification?.note}
              </Typography.Body>
            )}
          </Box>
        </BottomSheetScrollView>
      </TouchOutsideDismissKeyboard>
    </BottomSheetWithHD>
  );
};

export { AlertIssueBottomSheet };
