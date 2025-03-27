import React from 'react';
import { Typography, useTheme } from '@hero-design/rn';
import { openSettings } from 'react-native-permissions';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { CustomBottomSheetView } from '../../../../common/components/bottom-sheet/CustomBottomSheetView';

type NoLocationServiceBottomSheetProps = {
  bsRef?: React.RefObject<BottomSheetRef>;
};

export const NoLocationServiceBottomSheet = ({ bsRef }: NoLocationServiceBottomSheetProps) => {
  const { space } = useTheme();
  return (
    <CustomBottomSheetView
      actions={[
        {
          title: 'Cancel',
          onPress: () => bsRef?.current?.close(),
          testID: 'cancel_btn',
        },
        {
          title: 'Go to settings',
          onPress: () => {
            bsRef?.current?.close();
            openSettings();
          },
          testID: 'go_to_setting_btn',
        },
      ]}
      icon="cancel"
      iconSize="xsmall"
      theme="eBens"
      content={() => (
        <Typography.Body variant="regular" style={{ marginBottom: space.medium, marginHorizontal: space.large }}>
          To search using your live location, please enable location services in your device settings.
        </Typography.Body>
      )}
      title="Location services are disabled"
      bsRef={bsRef}
    />
  );
};
