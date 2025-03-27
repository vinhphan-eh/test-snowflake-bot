import React, { useEffect } from 'react';
import { GeneralError } from '../../../../../common/components/error';
import { CustomStatusBar } from '../../../../../common/components/status-bar/CustomStatusBar';
import { navigateToBenefitsTopTabs } from '../../../../../navigation/rootNavigation';
import { cleanUpProductDetail } from '../store/useDiscountShopStore';

export const PaymentFailedScreen = () => {
  const onNext = () => {
    navigateToBenefitsTopTabs();
  };

  useEffect(() => {
    cleanUpProductDetail();
  }, []);

  return (
    <>
      <CustomStatusBar barStyle="decorative" />
      <GeneralError themeName="eBens" onCtaPress={onNext} ctaText="Close" />
    </>
  );
};
