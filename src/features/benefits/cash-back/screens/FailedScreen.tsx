import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { GeneralError } from '../../../../common/components/error';
import type { CashbackNavigationProp } from '../navigation/navigationTypes';

export const FailedScreen = () => {
  const navigation = useNavigation<CashbackNavigationProp<'FailedScreen'>>();

  return <GeneralError themeName="eBens" onCtaPress={navigation.goBack} ctaText="Back" />;
};
