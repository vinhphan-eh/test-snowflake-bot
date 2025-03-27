import { useIncomeVisibility } from '../../../../common/hooks/useIncomeVisibility';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import type {
  InstapayNowIncentive,
  InstapayNowIncentivePayload,
  InstapayNowIncentiveProcess,
  Maybe,
  MoneyV2,
} from '../../../../new-graphql/generated';
import { useGetAvailableIncentivesQuery } from '../../../../new-graphql/generated';
import { FREE_FIFTH_TRANSACTION_INCENTIVE_ID, FREE_FIFTH_TRANSACTION_INCENTIVE_V2_ID } from '../constants/values';

interface GetFreeTransactionProgress {
  showFreeProgress: boolean;
  progress: number;
  applyFreeFee: boolean;
  maxTransactionThreshold?: MoneyV2;
  remainingProgress: number;
}

const mapEarningProcessToProgress: Record<number, number> = {
  0: 0,
  25: 1,
  50: 2,
  75: 3,
  100: 4,
};

const mapRemainingProgress: Record<number, number> = {
  0: 0,
  25: 3,
  50: 2,
  75: 1,
  100: 0,
};

export const useGetFreeTransactionProgress = (): GetFreeTransactionProgress => {
  const currentOrgId = useSessionStore(state => state.currentOrgId ?? '');
  const { showInstapayNowUsageIncentiveV2 } = useIncomeVisibility({
    staleTime: 0, // This is used in critical flow. We don't want to use cached data.
  });
  const { data, isLoading } = useGetAvailableIncentivesQuery();
  const filteredDataByOrg = data?.me?.orgs.find(org => org.id.toString() === currentOrgId);
  const availableIncentivesByCurrentOrg = (
    filteredDataByOrg?.instapay?.availableIncentives as InstapayNowIncentivePayload
  )?.incentives;
  let incentiveItem: Maybe<InstapayNowIncentive> | undefined = availableIncentivesByCurrentOrg?.find(
    item => item?.id === FREE_FIFTH_TRANSACTION_INCENTIVE_ID
  );

  if (showInstapayNowUsageIncentiveV2) {
    incentiveItem = availableIncentivesByCurrentOrg?.find(item => item?.id === FREE_FIFTH_TRANSACTION_INCENTIVE_V2_ID);
  }

  const freeFithTransaction: InstapayNowIncentiveProcess | undefined = incentiveItem?.process;
  const maxTransactionThreshold = incentiveItem?.maxTransactionThreshold;

  if (!freeFithTransaction || isLoading) {
    return {
      showFreeProgress: false,
      progress: 0,
      applyFreeFee: false,
      maxTransactionThreshold: undefined,
      remainingProgress: 0,
    };
  }

  const { earningProcess, isRedeemed } = freeFithTransaction;
  let applyFreeFee = false;

  if (!isRedeemed) {
    if (earningProcess === 100) {
      applyFreeFee = true;
    }
    if (earningProcess === 0 && showInstapayNowUsageIncentiveV2) {
      applyFreeFee = true;
    }
  }

  return {
    showFreeProgress: !isRedeemed,
    progress: mapEarningProcessToProgress[earningProcess],
    applyFreeFee,
    maxTransactionThreshold,
    remainingProgress: mapRemainingProgress[earningProcess],
  };
};
