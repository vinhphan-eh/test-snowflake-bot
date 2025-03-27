import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { OutcomeTemplate } from '../../../common/components/outcome-template/OutcomeTemplate';
import { useCheckUKPermission } from '../../../common/hooks/useCheckUKPermission';
import { useIntl } from '../../../providers/LocalisationProvider';
import { MIN_AGE_FOR_AU, MIN_AGE_FOR_UK } from '../constants/common';
import type { OnboardingScreenNavigationProp } from '../navigation/navigationTypes';

export const AgeNotQualifiedScreen = () => {
  const navigation = useNavigation<OnboardingScreenNavigationProp<'AgeNotQualified'>>();
  const { formatMessage } = useIntl();
  const isUKcustomer = useCheckUKPermission();
  const age = isUKcustomer ? MIN_AGE_FOR_UK : MIN_AGE_FOR_AU;

  return (
    <OutcomeTemplate
      title={formatMessage({ id: 'spend-account.onboarding.ageNotQualifiedScreen.title' })}
      content={formatMessage({ id: 'spend-account.onboarding.ageNotQualifiedScreen.description' }, { age })}
      actions={[{ buttonTitle: formatMessage({ id: 'common.close' }), onNext: navigation.goBack }]}
      imageName="ice-cream-income"
    />
  );
};
