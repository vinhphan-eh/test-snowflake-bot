import React, { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { Box, Typography } from '@hero-design/rn';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { CustomBottomSheetView } from '../../../../common/components/bottom-sheet/CustomBottomSheetView';
import useAppName from '../../../../common/hooks/useAppName';
import { useCheckVersionToForceUpdate } from '../../../../common/hooks/useCheckVersionToForceUpdate';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { openAppStore, openGooglePlay } from '../../../../common/utils/redirect';
import { useIntl } from '../../../../providers/LocalisationProvider';

export const ForceUpdateBts = () => {
  const bsRef = useRef<BottomSheetRef>(null);
  const { shouldUpdate } = useCheckVersionToForceUpdate();
  const setPillar = useSessionStore(state => state.setPillar);
  const allowForceUpdate = usePermissionStore(state => state.permissions?.benefitsForceUpdate?.view);
  const appName = useAppName();
  const { formatMessage } = useIntl();

  useEffect(() => {
    // make sure ref is ready
    if (shouldUpdate && allowForceUpdate) {
      bsRef.current?.open();
    }
  }, [shouldUpdate, allowForceUpdate]);

  const launchStore = () => {
    if (Platform.OS === 'ios') {
      openAppStore();
    } else {
      openGooglePlay();
    }
  };

  const onCancel = () => {
    bsRef.current?.close();
  };

  const renderUpdateContent = () => (
    <Box marginHorizontal="large" marginBottom="large">
      <Typography.Body variant="regular">
        {formatMessage(
          {
            id: 'benefits.forceUpdate.caption',
          },
          { appName }
        )}
      </Typography.Body>
    </Box>
  );
  return (
    <CustomBottomSheetView
      actions={[
        {
          title: formatMessage({ id: 'benefits.forceUpdate.btnDoLater' }),
          onPress: onCancel,
          testID: 'cancel_btn',
        },
        {
          title: formatMessage({ id: 'benefits.forceUpdate.btnUpdateNow' }),
          onPress: launchStore,
          testID: 'update_btn',
        },
      ]}
      icon="cancel"
      iconSize="xsmall"
      theme="eBens"
      content={renderUpdateContent}
      title={formatMessage({ id: 'benefits.forceUpdate.title' })}
      bsRef={bsRef}
      onDismiss={() => {
        setPillar?.('SwagApp');
      }}
    />
  );
};
