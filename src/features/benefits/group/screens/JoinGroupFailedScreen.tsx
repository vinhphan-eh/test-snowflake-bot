import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { GeneralError } from '../../../../common/components/error';
import type { GroupNavigationProp, GroupRouteProp } from '../navigation/navigationType';

export const JoinGroupFailedScreen = () => {
  const route = useRoute<GroupRouteProp<'JoinGroupFailedScreen'>>();
  const navigation = useNavigation<GroupNavigationProp<'JoinGroupFailedScreen'>>();
  const { errorMessage } = route.params;

  const goToSuper = () => navigation.goBack();

  return <GeneralError themeName="eBens" onCtaPress={goToSuper} ctaText="Close" title={errorMessage} />;
};
