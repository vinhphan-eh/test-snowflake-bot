import React from 'react';
import { OutcomeTemplate } from '../../../common/components/outcome-template/OutcomeTemplate';
import { navigateToTopTabs } from '../../../navigation/rootNavigation';

export const DeclineScreen = () => {
  const exitStack = () => navigateToTopTabs('spend-tab');

  return (
    <OutcomeTemplate
      title="We're unable to process your application at this time."
      actions={[{ buttonTitle: 'Close', onNext: exitStack }]}
      content="Unfortunately you don't meet our requirements for opening an account."
      imageName="ice-cream-income"
    />
  );
};
