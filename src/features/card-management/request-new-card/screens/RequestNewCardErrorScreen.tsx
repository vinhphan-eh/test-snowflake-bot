import React from 'react';
import { OutcomeTemplate } from '../../../../common/components/outcome-template/OutcomeTemplate';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';

export const RequestNewCardErrorScreen = () => {
  const onClose = () => {
    navigateToTopTabs('card-tab');
  };

  return (
    <OutcomeTemplate
      title={`We're sorry, your PIN didn't reset.`}
      content={
        'Your old card has been cancelled and your new one should arrive soon.\n\nYou will need to reset your PIN in Card settings before you activate your new card.'
      }
      imageName="ice-cream-account"
      actions={[
        {
          buttonTitle: 'Done',
          onNext: onClose,
        },
      ]}
    />
  );
};
