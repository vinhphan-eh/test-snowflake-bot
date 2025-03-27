import { usePermissionStore } from '../../../../common/stores/usePermissionStore';

export enum PaySplitTestingGroup {
  A = 'A',
  B = 'B',
  // Carousel flow
  C = 'C',
}

const getUserExperimentGroup = (isGroupA: boolean, isGroupB: boolean, isGroupC: boolean): PaySplitTestingGroup => {
  if (isGroupA) {
    return PaySplitTestingGroup.A;
  }
  if (isGroupB) {
    return PaySplitTestingGroup.B;
  }
  if (isGroupC) {
    return PaySplitTestingGroup.C;
  }
  return PaySplitTestingGroup.A;
};

export const usePaySplitABTesting = () => {
  const paySplitGroupA = !!usePermissionStore(state => state.permissions?.ebenPaySplitExpGroupA?.view);
  const paySplitGroupB = !!usePermissionStore(state => state.permissions?.ebenPaySplitExpGroupB?.view);
  const paySplitGroupC = !!usePermissionStore(state => state.permissions?.ebenPaySplitExpGroupC?.view);

  const testingGroup = getUserExperimentGroup(paySplitGroupA, paySplitGroupB, paySplitGroupC);

  return {
    testingGroup,
  };
};
