import React from 'react';
import { Box, Typography } from '@hero-design/rn';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { CustomBottomSheetView } from '../../../../common/components/bottom-sheet/CustomBottomSheetView';
import { useIntl } from '../../../../providers/LocalisationProvider';

type HomeOwnerInfoBtsProps = {
  btsRef: React.RefObject<BottomSheetRef>;
};

export const HomeOwnerInfoBts = ({ btsRef }: HomeOwnerInfoBtsProps) => {
  const Intl = useIntl();
  return (
    <CustomBottomSheetView
      bsRef={btsRef}
      icon="cancel"
      iconSize="xsmall"
      content={() => (
        <Box paddingHorizontal="large" paddingBottom="medium">
          <Typography.Body variant="regular">
            {Intl.formatMessage({ id: 'instapay.introduction.homeOwnerBts.content' })}
          </Typography.Body>
        </Box>
      )}
      actions={[
        {
          title: Intl.formatMessage({ id: 'common.gotIt' }),
          onPress: () => btsRef.current?.close(),
          testID: 'got-it-btn',
        },
      ]}
      title={Intl.formatMessage({ id: 'instapay.introduction.homeOwnerBts.title' })}
    />
  );
};
