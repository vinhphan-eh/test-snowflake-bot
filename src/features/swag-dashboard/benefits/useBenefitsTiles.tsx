import React from 'react';
import { View } from 'react-native';
import { CashbackTile } from './CashbackTile';
import type { BenefitsItemType } from './constants';
import {
  candidateBenefitsTiles,
  ehBenefitsTiles,
  wzBenefitsTiles,
  candidateBenefitsTilesXmas23,
  wzBenefitsTilesXmas23,
  ehBenefitsTilesXmas23,
} from './constants';
import { useEbfPillarPermission } from '../../../common/hooks/useEbfPillarPermission';
import { useIsCandidateV2 } from '../../../common/hooks/useIsCandidate';
import { usePermissionStore } from '../../../common/stores/usePermissionStore';
import { useSessionStore } from '../../../common/stores/useSessionStore';
import { useCashbackPermission } from '../../benefits/common/hooks/useCashbackPermission';
import type { SWAGDashboardTile } from '../types';

export const useBenefitsTiles = () => {
  const { benefitsPillarPermission, isFetchedBenefits } = useEbfPillarPermission();
  const { isFetched: isFetchedCashbackPermission, permission: cashbackPermission } = useCashbackPermission();
  const isCandidate = useIsCandidateV2();
  const benefitsXmas23CashbackPermission =
    usePermissionStore(state => state.permissions?.benefitsXmas23Cashback?.view) ?? false;

  const loginProvider = useSessionStore(state => state.currentUser?.loginProvider);

  let data: BenefitsItemType[] = [];

  if (benefitsPillarPermission && isFetchedBenefits && isFetchedCashbackPermission) {
    if (isCandidate) {
      data = benefitsXmas23CashbackPermission ? candidateBenefitsTilesXmas23 : candidateBenefitsTiles;
    } else if (loginProvider === 'eh' || loginProvider === 'omop') {
      data = benefitsXmas23CashbackPermission ? ehBenefitsTilesXmas23 : ehBenefitsTiles;
    } else if (loginProvider === 'kp') {
      data = benefitsXmas23CashbackPermission ? wzBenefitsTilesXmas23 : wzBenefitsTiles;
    }
    if (!cashbackPermission) {
      // filter out cashback element if user does not have cashback permission
      data = data.filter(element => element.type !== 'cashback');
    }
  }

  const result: SWAGDashboardTile[] = data.map((element, index) => ({
    id: `benefits-${index + 1}`,
    component: () => (element.type === 'cashback' ? <CashbackTile {...element} /> : <View />),
    priority: 5,
  }));

  return result;
};
