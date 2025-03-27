import React, { useRef } from 'react';
import { Icon, List, Typography } from '@hero-design/rn';
import { HowItWorkBottomSheet } from './HowItWorkBottomSheet';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useInstapayTracking } from '../hooks/useInstapayTracking';

type HowItWorkMenuItemProps = {
  withdrawalMinLimit: number;
  withdrawalMaxLimit: number;
};

export const HowItWorkMenuItem = ({ withdrawalMaxLimit, withdrawalMinLimit }: HowItWorkMenuItemProps) => {
  const bsRef = useRef<BottomSheetRef>(null);
  const { trackPressHowItWorkMenuScreen } = useInstapayTracking();
  const { formatMessage } = useIntl();

  return (
    <>
      <List.Item
        variant="card"
        title={<Typography.Body variant="regular">{formatMessage({ id: 'common.howItWorks' })}</Typography.Body>}
        suffix={<Icon icon="arrow-up" intent="primary" />}
        onPress={() => {
          bsRef.current?.open();
          trackPressHowItWorkMenuScreen();
        }}
      />
      <HowItWorkBottomSheet
        ref={bsRef}
        withdrawalMinLimit={withdrawalMinLimit}
        withdrawalMaxLimit={withdrawalMaxLimit}
      />
    </>
  );
};
