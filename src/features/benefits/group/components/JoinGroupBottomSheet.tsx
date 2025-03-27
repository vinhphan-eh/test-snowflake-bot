import React from 'react';
import { Box, Typography } from '@hero-design/rn';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { CustomBottomSheetView } from '../../../../common/components/bottom-sheet/CustomBottomSheetView';
import useBrandName from '../../../../common/hooks/useBrandName';
import { useIntl } from '../../../../providers/LocalisationProvider';

type JoinGroupBottomSheetProps = {
  bsRef?: React.RefObject<BottomSheetRef>;
  isLoading: boolean;
  onConfirm: (value: boolean) => void;
};

export const JoinGroupBottomSheet = ({ bsRef, isLoading, onConfirm }: JoinGroupBottomSheetProps) => {
  const Intl = useIntl();
  const brandName = useBrandName();

  return (
    <CustomBottomSheetView
      actions={[
        {
          title: Intl.formatMessage({ id: 'common.noThanks' }),
          onPress: () => onConfirm(false),
          isDisabled: isLoading,
          testID: 'confirm-no-join-group-btn',
        },
        {
          title: Intl.formatMessage({ id: 'common.yes' }),
          onPress: () => onConfirm(true),
          isDisabled: isLoading,
          testID: 'confirm-yes-join-group-btn',
        },
      ]}
      icon="cancel"
      iconSize="xsmall"
      content={() => (
        <Box paddingHorizontal="large" paddingVertical="medium">
          <Typography.Body variant="regular">
            {Intl.formatMessage({ id: 'megadeal.join.group.bottom.sheet.content' }, { brandName })}
          </Typography.Body>
        </Box>
      )}
      title={Intl.formatMessage({ id: 'megadeal.join.group.bottom.sheet.title' })}
      bsRef={bsRef}
    />
  );
};
