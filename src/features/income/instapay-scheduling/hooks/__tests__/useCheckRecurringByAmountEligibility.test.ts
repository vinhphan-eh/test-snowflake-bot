import { renderHook, waitFor } from '../../../../../common/utils/testing';
import { InstapayErrorCode } from '../../../../../new-graphql/generated';
import { useInstaPaySchedulingStore } from '../../stores/useInstaPaySchedulingStore';
import { useCheckRecurringByAmountEligibility } from '../useCheckRecurringByAmountEligibility';

describe('useCheckRecurringByAmountEligibility', () => {
  it('should return proper response if the eligibility details have yet to be successfully loaded', async () => {
    const result = renderHook(() => useCheckRecurringByAmountEligibility());

    await waitFor(() => {
      expect(result.result.current.isLoaded).toBeFalsy();
      expect(result.result.current.getOrgRecurringByAmountEligibility('randomOrgId')).toBeUndefined();
    });
  });

  it('should return proper response if the eligibility details were failed to be loaded', async () => {
    const { result: schedulingStore } = renderHook(() => useInstaPaySchedulingStore());
    schedulingStore.current.setEligibilityDetails([]);
    const result = renderHook(() => useCheckRecurringByAmountEligibility());

    await waitFor(() => {
      expect(result.result.current.isLoaded).toBeTruthy();
      expect(result.result.current.getOrgRecurringByAmountEligibility('randomOrgId')).toBeUndefined();
    });
  });

  it('shold return proper response if the eligibility details have been successfully loaded', async () => {
    const validEligibilityDetails1 = {
      orgId: 'sampleOrgId1',
      isEligible: true,
    };
    const validEligibilityDetails2 = {
      orgId: 'sampleOrgId2',
      isEligible: false,
      errorCode: InstapayErrorCode.RecurringByAmountFeatureNotPermitted,
    };

    const { result: schedulingStore } = renderHook(() => useInstaPaySchedulingStore());
    schedulingStore.current.setEligibilityDetails([validEligibilityDetails1, validEligibilityDetails2]);
    const result = renderHook(() => useCheckRecurringByAmountEligibility());

    await waitFor(() => {
      expect(result.result.current.isLoaded).toBeTruthy();
      const getOrgEligibilityFunction = result.result.current.getOrgRecurringByAmountEligibility;

      // Valid orgs
      expect(getOrgEligibilityFunction(validEligibilityDetails1.orgId)?.isEligible).toBeTruthy();
      const org2Eligibility = getOrgEligibilityFunction(validEligibilityDetails2.orgId);
      expect(org2Eligibility?.isEligible).toBeFalsy();
      expect(org2Eligibility?.errorCode).toBe(InstapayErrorCode.RecurringByAmountFeatureNotPermitted);

      // Invalid org
      expect(getOrgEligibilityFunction('dummyOrgId')).toBeUndefined();

      // Invalid request
      expect(getOrgEligibilityFunction()).toBeUndefined();
    });
  });
});
