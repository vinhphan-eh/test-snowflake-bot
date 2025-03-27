import React, { useEffect } from 'react';
import { OutcomeTemplate } from '../../../../../common/components/outcome-template/OutcomeTemplate';
import { CustomStatusBar } from '../../../../../common/components/status-bar/CustomStatusBar';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import { navigateToBenefitsTopTabs } from '../../../../../navigation/rootNavigation';
import { cleanUpProductDetail } from '../store/useDiscountShopStore';

const MAKE_PURCHASE = 'makePurchase';
export const PaymentSuccessScreen = () => {
  const handleInternalRatingPrompt = useSessionStore(state => state.handleInternalRatingPrompt);

  useEffect(() => {
    cleanUpProductDetail();
  }, []);

  const onNext = () => {
    navigateToBenefitsTopTabs();
    handleInternalRatingPrompt?.(MAKE_PURCHASE);
  };

  return (
    <>
      <CustomStatusBar barStyle="decorative" />
      <OutcomeTemplate
        actions={[
          {
            buttonTitle: 'Done',
            onNext,
          },
        ]}
        title="Your order has been processed"
        content="Your gift card has been sent to your email address"
        imageName="jetpack-man-benefits"
      />
    </>
  );
};
