import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OutcomeTemplate } from '../../../../common/components/outcome-template/OutcomeTemplate';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import { useIntl } from '../../../../providers/LocalisationProvider';
import type { BillStreamWaitlistNavigationProp, BillStreamWaitlistRouteProp } from '../navigation/navigationTypes';

export const BillStreamWaitlistSuccessScreen = () => {
  const navigation = useNavigation<BillStreamWaitlistNavigationProp<'BillStreamWaitlistSuccessScreen'>>();
  const route = useRoute<BillStreamWaitlistRouteProp<'BillStreamWaitlistSuccessScreen'>>();
  const { formatMessage } = useIntl();
  const onNext = () => navigation.goBack();

  const description = route?.params?.description
    ? route.params.description
    : formatMessage({ id: 'benefits.bill.defaultJoinWaitlistSuccess' });

  return (
    <>
      <CustomStatusBar barStyle="decorative" />
      <OutcomeTemplate
        actions={[
          {
            buttonTitle: 'Done',
            onNext,
          },
        ]}
        title={formatMessage({ id: 'benefits.bill.youAreIn' })}
        content={description}
        imageName="jetpack-man-benefits"
      />
    </>
  );
};
