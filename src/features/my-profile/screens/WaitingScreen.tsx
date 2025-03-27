import React from 'react';
import { useTheme } from '@hero-design/rn';
import type { RouteProp } from '@react-navigation/native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OutcomeTemplate } from '../../../common/components/outcome-template/OutcomeTemplate';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import type { MoneyProfileNavigationProp, MoneyProfileStackParamList } from '../navigation/navigationType';

const BIRTHDAY_REFERRED_TEXT = `Feel free come back later to check the status of your Birthday update. You may be contacted via email if we require more information. You'll still see your old details until your update has been confirmed.`;
const NAME_REFERRED_TEXT = `You will be contacted via email by the Swag Spend support team. We require documentation as proof of your name change. You'll still see your old details until your update has been confirmed.`;

export const WaitingScreen = () => {
  const navigation = useNavigation<MoneyProfileNavigationProp<'Waiting'>>();
  const {
    params: { isNameChanged, onBack },
  } = useRoute<RouteProp<MoneyProfileStackParamList, 'Waiting'>>();

  const { colors } = useTheme();

  return (
    <>
      <CustomStatusBar backgroundColor={colors.decorativePrimarySurface} />
      <OutcomeTemplate
        title="Checking your details"
        content={isNameChanged ? NAME_REFERRED_TEXT : BIRTHDAY_REFERRED_TEXT}
        actions={[{ buttonTitle: 'Close this screen', onNext: () => onBack(navigation) }]}
        imageName="waiting-white"
      />
    </>
  );
};
