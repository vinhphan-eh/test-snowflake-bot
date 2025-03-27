import React from 'react';
import { useTheme } from '@hero-design/rn';
import type { RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { OutcomeTemplate } from '../../../common/components/outcome-template/OutcomeTemplate';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import type { MoneyProfileStackParamList } from '../navigation/navigationType';

export const SomethingWentWrongScreen = () => {
  const { params } = useRoute<RouteProp<MoneyProfileStackParamList, 'SomethingWentWrong'>>();
  const { colors } = useTheme();

  return (
    <>
      <CustomStatusBar backgroundColor={colors.decorativePrimarySurface} />
      <OutcomeTemplate
        title="We're sorry, something went wrong."
        content="Please try again later."
        imageName="ice-cream-profile"
        actions={[{ buttonTitle: 'Close', onNext: params.onBack }]}
      />
    </>
  );
};
