import { getDefaultCurrency, getFloatAmountFromMoneyV2 } from '../../../common/utils/currency';
import type { SupportedCurrency } from '../../../common/utils/numbers';
import { useGetEWalletAuAccountDetailsQuery, useGetEWalletUkAccountDetailsQuery } from '../../../new-graphql/generated';
import { useRegionLocalisation } from '../../../providers/LocalisationProvider';
import { Region, type SupportedRegionCode } from '../../../providers/LocalisationProvider/constants';

interface SSADetails {
  accountName: string;
  accountNumber: string;
  availableBalance?: number;
  totalBalance: number;
  currency: SupportedCurrency;
  bsb?: string;
  sortCode?: string;
}

interface GetSSADetails {
  data: SSADetails | null;
  isLoading: boolean;
  currentRegion: SupportedRegionCode | undefined;
  isError: boolean;
}

export const useGetSSADetails = (): GetSSADetails => {
  const { currentRegion } = useRegionLocalisation();
  const {
    data: AUWalletDetails,
    isError: AUWalletError,
    isLoading: AUWalletLoading,
  } = useGetEWalletAuAccountDetailsQuery(undefined, {
    enabled: currentRegion === Region.au,
  });
  const {
    data: UKWalletDetails,
    isError: UKWalletError,
    isLoading: UKWalletLoading,
  } = useGetEWalletUkAccountDetailsQuery(undefined, {
    enabled: currentRegion === Region.gb,
  });

  const defaultReturnDetails = {
    accountName: '',
    accountNumber: '',
    availableBalance: undefined,
    totalBalance: 0,
    bsb: '',
    currency: getDefaultCurrency(currentRegion ?? Region.au),
  };

  if (AUWalletLoading || UKWalletLoading) {
    return {
      data: defaultReturnDetails as SSADetails,
      isLoading: true,
      currentRegion,
      isError: false,
    };
  }

  const isError = AUWalletError || UKWalletError;

  switch (currentRegion) {
    case Region.au:
      return {
        data: {
          bsb: AUWalletDetails?.me?.wallet?.details?.bsb,
          currency: 'AUD', // Hard-coded for now
          accountName: AUWalletDetails?.me?.wallet?.details?.name,
          accountNumber: AUWalletDetails?.me?.wallet?.details?.accountNumber,
          availableBalance: AUWalletDetails?.me?.wallet?.details?.availableBalance
            ? getFloatAmountFromMoneyV2(AUWalletDetails.me.wallet.details.availableBalance)
            : undefined,
        } as SSADetails,
        isLoading: false,
        currentRegion,
        isError,
      };

    case Region.gb:
      return {
        data: UKWalletDetails?.me?.wallet?.UKWalletDetails as SSADetails,
        isLoading: false,
        currentRegion,
        isError,
      };

    default:
      return {
        data: defaultReturnDetails as SSADetails,
        isLoading: false,
        currentRegion,
        isError,
      };
  }
};
