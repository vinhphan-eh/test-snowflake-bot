import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { OutcomeTemplate } from '../../../../common/components/outcome-template/OutcomeTemplate';
import { CustomStatusBar } from '../../../../common/components/status-bar/CustomStatusBar';
import type { BillStreamWaitlistNavigationProp } from '../navigation/navigationTypes';

export const BillStreamWaitlistFailedScreen = () => {
  const navigation = useNavigation<BillStreamWaitlistNavigationProp<'BillStreamWaitlistFailedScreen'>>();

  const onNext = () => navigation.goBack();

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
        title="We’re sorry, something went wrong"
        content="Please try again later"
        imageName="ice-cream-benefits"
      />
    </>
  );
};
