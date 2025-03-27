import React from 'react';
import { BenefitsTopTabs } from './BenefitsTopTabs';
import { useCheckAutoEnrollment } from '../features/benefits/cash-back/card-link-offers/hooks/useCheckAutoEnrollment';
import { ForceUpdateBts } from '../features/benefits/common/components/ForceUpdateBts';

export const BenefitsAppRootScreen = () => {
  useCheckAutoEnrollment({
    shouldDeregisterOldCard: false,
    runInBackground: true,
  });
  return (
    <>
      <BenefitsTopTabs />
      <ForceUpdateBts />
    </>
  );
};
