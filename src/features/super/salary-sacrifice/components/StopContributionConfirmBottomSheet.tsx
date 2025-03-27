import React from 'react';
import { Box, Typography } from '@hero-design/rn';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { CustomBottomSheetView } from '../../../../common/components/bottom-sheet/CustomBottomSheetView';

type StopContributionConfirmBottomSheetProps = {
  bsRef?: React.RefObject<BottomSheetRef>;
  onStopContribution: () => void;
  isStoppingContribution: boolean;
};

export const StopContributionConfirmBottomSheet = ({
  bsRef,
  isStoppingContribution,
  onStopContribution,
}: StopContributionConfirmBottomSheetProps) => (
  <CustomBottomSheetView
    actions={[
      {
        title: 'Cancel',
        onPress: () => bsRef?.current?.close(),
        testID: 'cancel_btn',
      },
      {
        title: 'Confirm',
        onPress: () => onStopContribution(),
        isDisabled: isStoppingContribution,
        testID: 'confirm-stop-contribution-btn',
      },
    ]}
    icon="cancel"
    iconSize="xsmall"
    content={() => (
      <Box paddingHorizontal="large" paddingVertical="small">
        <Typography.Body variant="regular">
          By confirming, we will request for your employer to stop your contributions. This could take up to 7 days to
          process. If this is urgent, please contact your employer directly.
        </Typography.Body>
      </Box>
    )}
    title="Stop your contribution"
    bsRef={bsRef}
  />
);
