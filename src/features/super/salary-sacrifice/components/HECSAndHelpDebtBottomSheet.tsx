import React from 'react';
import { Box, Typography } from '@hero-design/rn';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { CustomBottomSheetView } from '../../../../common/components/bottom-sheet/CustomBottomSheetView';

type HECSAndHelpDebtBottomSheetProps = {
  bsRef?: React.RefObject<BottomSheetRef>;
};

export const HECSAndHelpDebtBottomSheet = ({ bsRef }: HECSAndHelpDebtBottomSheetProps) => (
  <CustomBottomSheetView
    actions={[
      {
        title: 'Close',
        onPress: () => bsRef?.current?.close(),
        testID: 'close_btn',
      },
    ]}
    icon="cancel"
    iconSize="xsmall"
    content={() => (
      <Box paddingHorizontal="large" paddingVertical="small">
        <Typography.Body variant="regular">
          Consider seeking financial advice before proceeding with salary sacrifice, as it may increase the value of
          your pre-tax salary and require an increase in regular HECS or HELP repayments to avoid a tax bill.
        </Typography.Body>
      </Box>
    )}
    title="Do you have HECS or HELP debt?"
    bsRef={bsRef}
  />
);
