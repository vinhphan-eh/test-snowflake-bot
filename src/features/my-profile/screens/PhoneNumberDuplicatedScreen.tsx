import React from 'react';
import { useTheme } from '@hero-design/rn';
import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { OutcomeTemplate } from '../../../common/components/outcome-template/OutcomeTemplate';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import type { MoneyProfileStackParamList } from '../navigation/navigationType';

export const PhoneNumberDuplicatedScreen = () => {
  const { params } = useRoute<RouteProp<MoneyProfileStackParamList, 'PhoneNumberDuplicated'>>();
  const { colors } = useTheme();

  return (
    <>
      <CustomStatusBar backgroundColor={colors.decorativePrimarySurface} />
      <OutcomeTemplate
        title="This phone number already exists in our system."
        content="We're unable to update your mobile number as it is linked to another account. Please try a different mobile number."
        imageName="ice-cream-profile"
        actions={[{ buttonTitle: 'Close', onNext: params.onBack }]}
      />
    </>
  );
};
