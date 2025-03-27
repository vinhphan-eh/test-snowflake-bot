import { useIsAccountAU } from './useIsAccountAU';
import { useIsCandidateV2 } from './useIsCandidate';
import { useIsOnlyContractor } from './useIsOnlyContractor';
import { useIsWalletSetupComplete } from './useIsWalletSetupComplete';
import { useIsWorkzone } from './useIsWorkzone';

export const useShowPaySplit = () => {
  const isAccountAu = useIsAccountAU();
  const isCandidate = useIsCandidateV2();
  const { isWalletSetupComplete } = useIsWalletSetupComplete();
  const isWorkZone = useIsWorkzone();
  const { isOnlyContractor } = useIsOnlyContractor();

  return isAccountAu && !isCandidate && isWalletSetupComplete && !isWorkZone && !isOnlyContractor;
};
