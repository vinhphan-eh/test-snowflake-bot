import React, { useMemo, useRef } from 'react';
import { Box, Button, Divider, Typography, useTheme } from '@hero-design/rn';
import { AcceptNotify } from './AcceptNotify';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { DataCard, type DataCardItem } from '../../../../common/components/data-card';
import { Page } from '../../../../common/components/layout/page';
import type { LifecycleEvent } from '../../../../new-graphql/generated';
import type { OffboardingEventData } from '../types/event';

interface OffboardingDetailsProps {
  event: LifecycleEvent;
  onBack: () => void;
  onAcceptNotify: () => void;
}

const OffboardingDetails = ({ event, onAcceptNotify, onBack }: OffboardingDetailsProps) => {
  const { space } = useTheme();
  const bsRef = useRef<BottomSheetRef>(null);

  const eventData = useMemo(() => JSON.parse(event?.data) as OffboardingEventData, [event?.data]);

  const {
    fund_name: fundName,
    member_number: memberNumber,
    owner_name: ownerName,
    termination_date: terminationDate,
  } = eventData;

  const eventDataCard: DataCardItem[] = [
    {
      label: 'Event',
      content: 'Resignation / Termination',
    },
    {
      label: 'When',
      content: new Date(event.trigger_time).toLocaleString(),
    },
  ];

  const detailDataCard: DataCardItem[] = [
    {
      label: 'To',
      content: fundName,
    },
    {
      label: 'Member account number',
      content: memberNumber,
    },
    {
      label: 'Employer',
      content: ownerName,
    },
    {
      label: 'Termination date',
      content: terminationDate,
    },
  ];

  const onPressNotifyFund = () => {
    bsRef.current?.open();
  };

  return (
    <>
      <Typography.Body intent="subdued" style={{ marginTop: space.medium }}>
        This event was triggered by your employer and requires your approval to notify your fund.
      </Typography.Body>
      <Page.Body marginTop="large">
        <DataCard hideIcon data={eventDataCard} />
        <DataCard style={{ marginTop: space.medium }} hideIcon data={detailDataCard} />
        {/* temporary disabled in lifecycle V1 */}
        {/* <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginTop="medium"
          marginHorizontal="medium"
        >
          <Typography.Text style={{ maxWidth: '70%' }} fontSize="medium">
            Send resignation / termination updates automatically.
          </Typography.Text>
          <Switch testID="remember-me-switch" />
        </Box> */}
      </Page.Body>
      <Page.Footer marginTop="medium">
        <Divider />
        <Box style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Button testID="do-nothing-cta" variant="text" intent="danger" text="Do nothing" onPress={onBack} />
          <Button testID="notify-fund-cta" variant="text" text="Notify fund" onPress={onPressNotifyFund} />
        </Box>
      </Page.Footer>
      <AcceptNotify bsRef={bsRef} onAcceptNotify={onAcceptNotify} />
    </>
  );
};

export default OffboardingDetails;
