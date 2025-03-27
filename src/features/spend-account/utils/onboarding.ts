import type { GetWalletStatusQuery, Wallet } from '../../../new-graphql/generated';
import { WalletSetupStatus } from '../../../new-graphql/generated';

export const isOnboardingDone = (userData: GetWalletStatusQuery | undefined, isCardNotFound: boolean) => {
  const eWalletSetupDone = userData?.me?.wallet?.details.setupStatus?.status === WalletSetupStatus.Completed;
  return eWalletSetupDone && !isCardNotFound;
};

export const isSsaActive = (walletData: Wallet | undefined) => {
  return ['ACTIVE', 'APPROVED'].includes(walletData?.details?.status || '');
};
