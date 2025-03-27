import React from 'react';
import { Typography, useTheme } from '@hero-design/rn';
import { useRoute } from '@react-navigation/native';
import { OutcomeTemplate } from '../../../../common/components/outcome-template/OutcomeTemplate';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import type { ConsolidationScreenRouteProp } from '../navigation/navigationTypes';

export const CreateSuperConsolidationSupportRequestSuccessScreen = () => {
  const { space } = useTheme();
  const route = useRoute<ConsolidationScreenRouteProp<'CreateSuperConsolidationSupportRequestSuccessScreen'>>();

  const { fundName } = route?.params || {};

  const onNext = () => {
    navigateToTopTabs('super-tab');
  };
  return (
    <OutcomeTemplate
      testID="successful-wallet-next-btn"
      title=""
      content={
        <>
          <Typography.Title
            level="h4"
            typeface="playful"
            style={{
              marginBottom: space.medium,
              textAlign: 'center',
            }}
          >
            We’ve received your feature request!
          </Typography.Title>
          <Typography.Body
            variant="regular"
            intent="subdued"
            style={{ marginBottom: space.medium, textAlign: 'center' }}
          >
            {`Next time we talk to ${fundName}, we’ll inform them that you want this feature.`}
          </Typography.Body>
          <Typography.Body variant="regular" intent="subdued" style={{ textAlign: 'center' }}>
            In the meantime, you can check out your fund’s online portal or the ATO’s website for help finding lost
            super.
          </Typography.Body>
        </>
      }
      actions={[
        {
          testId: 'success-screen-next',
          buttonTitle: 'Done',
          onNext,
        },
      ]}
      imageName="jetpack-man-money"
    />
  );
};
