import React from 'react';
import { Box, Typography, Divider, useTheme } from '@hero-design/rn';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { CustomBottomSheetView } from '../../../../common/components/bottom-sheet/CustomBottomSheetView';

type HECSAndHelpDebtBottomSheetProps = {
  bsRef?: React.RefObject<BottomSheetRef>;
  data: { timestamp: string; amount: string }[];
};

export const RecentPayHistoryBottomSheet = ({ bsRef, data }: HECSAndHelpDebtBottomSheetProps) => {
  const { space } = useTheme();
  return (
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
          <Typography.Body variant="regular" style={{ marginBottom: space.large }}>
            Refer to your recent payslips to decide on how much of your pay you want to preserve.
          </Typography.Body>

          <Box>
            {data.map(item => (
              <React.Fragment key={item.timestamp}>
                <Box testID="history-item-id" flex={1} flexDirection="row" justifyContent="space-between">
                  <Typography.Body variant="small">{item.timestamp}</Typography.Body>
                  <Typography.Body variant="small-bold">{item.amount}</Typography.Body>
                </Box>
                <Divider style={{ marginVertical: space.medium }} />
              </React.Fragment>
            ))}
          </Box>
        </Box>
      )}
      title="Your recent pay history"
      bsRef={bsRef}
    />
  );
};
