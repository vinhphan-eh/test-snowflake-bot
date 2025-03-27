import React from 'react';
import { Typography, useTheme } from '@hero-design/rn';
import { OutcomeTemplate } from '../../../../common/components/outcome-template/OutcomeTemplate';
import { useInAppBrowser } from '../../../../common/shared-hooks/useInAppBrowser';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import { useCheckAutoEnrollment } from '../../../benefits/cash-back/card-link-offers/hooks/useCheckAutoEnrollment';
import { BENEFITS_CASHBACK_FAQ_LINK } from '../../../support/constants/supportLinks';
import useBrandName from '../../../../common/hooks/useBrandName';

export const RequestNewCardSuccessScreen = () => {
  const { openUrl } = useInAppBrowser();
  const cashbackPermission = usePermissionStore(state => state.permissions?.superAppCashback?.view);
  const { space } = useTheme();
  const brandName = useBrandName();

  useCheckAutoEnrollment({
    shouldDeregisterOldCard: true,
    runInBackground: true,
  });

  const onDone = () => {
    navigateToTopTabs('card-tab');
  };

  return (
    <OutcomeTemplate
      title="Your card is on the way!"
      content={
        <>
          <Typography.Body
            typeface="playful"
            variant="regular"
            intent="subdued"
            style={{ textAlign: 'center', marginBottom: space.medium }}
          >
            Your old card has been cancelled and your new one should arrive within 7-10 business days.
          </Typography.Body>
          <Typography.Body
            typeface="playful"
            variant="regular"
            intent="subdued"
            style={{ textAlign: 'center', marginBottom: space.medium }}
          >
            You can use your digital card in your Wallet straight away.
          </Typography.Body>
          {cashbackPermission && (
            <Typography.Body typeface="playful" variant="regular" intent="subdued" style={{ textAlign: 'center' }}>
              Please note that your card will be auto enrolled into the {brandName} benefits cashback program. More
              information&nbsp;
              <Typography.Body
                onPress={() => {
                  openUrl(BENEFITS_CASHBACK_FAQ_LINK);
                }}
                typeface="playful"
                variant="regular"
                intent="primary"
                style={{ textDecorationLine: 'underline' }}
              >
                here
              </Typography.Body>
            </Typography.Body>
          )}
        </>
      }
      actions={[
        {
          buttonTitle: 'Done',
          onNext: onDone,
        },
      ]}
      imageName="flying-card"
      imageWidth={165}
      imageHeight={156}
    />
  );
};
