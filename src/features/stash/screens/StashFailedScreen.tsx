import React from 'react';
import { useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { OutcomeTemplate } from '../../../common/components/outcome-template/OutcomeTemplate';
import { navigateToTopTabs } from '../../../navigation/rootNavigation';
import type { StashNavigationProp } from '../navigation/navigationTypes';

export const StashFailedScreen = () => {
  const { space } = useTheme();
  const navigation = useNavigation<StashNavigationProp<'StashFailed'>>();

  const onClose = () => {
    navigateToTopTabs('stash-tab');
  };

  const onRetry = () => {
    navigation.navigate('StashSelection');
  };

  return (
    <OutcomeTemplate
      actions={[
        {
          buttonTitle: 'Close',
          variant: 'outlined',
          onNext: onClose,
          style: { marginBottom: space.medium },
        },
        {
          buttonTitle: 'Try again',
          onNext: onRetry,
        },
      ]}
      title="We're sorry, something went wrong"
      content="Please try again later"
      imageName="ice-cream-income"
    />
  );
};
